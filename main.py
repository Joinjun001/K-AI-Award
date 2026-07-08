import os
import json
import base64
import logging
import urllib.request
import urllib.parse
import psycopg2
import requests
from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("daon-backend")

app = FastAPI(title="Daon Backend API")

# Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load .env file manually if it exists to support running without Docker Compose
def load_env():
    env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '.env')
    if os.path.exists(env_path):
        with open(env_path, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, val = line.split('=', 1)
                    os.environ[key.strip()] = val.strip()

load_env()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    logger.warning("GEMINI_API_KEY environment variable is not set. Gemini API features will fail.")

DB_HOST = os.getenv("DB_HOST", "host.docker.internal")
DB_PORT = int(os.getenv("DB_PORT", "5432"))
DB_USER = os.getenv("DB_USER", "daon_user")
DB_PASSWORD = os.getenv("DB_PASSWORD", "your_strong_password")
DB_NAME = os.getenv("DB_NAME", "daondb")

def get_db_connection():
    try:
        # Fallback to localhost if host.docker.internal is not reachable
        hosts = [DB_HOST, "127.0.0.1", "172.17.0.1"]
        for host in hosts:
            try:
                conn = psycopg2.connect(
                    host=host,
                    port=DB_PORT,
                    user=DB_USER,
                    password=DB_PASSWORD,
                    dbname=DB_NAME,
                    connect_timeout=2
                )
                logger.info(f"Successfully connected to PostgreSQL at {host}")
                return conn
            except Exception:
                continue
        raise Exception("Could not connect to any of the database hosts.")
    except Exception as e:
        logger.error(f"PostgreSQL connection error: {e}")
        raise HTTPException(status_code=500, detail="Database connection failed.")

# Startup event to run migrations (ensure user_account has Google OAuth columns)
@app.on_event("startup")
def startup_db_migration():
    logger.info("Running database migration checks...")
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        try:
            # Check if user_account table exists
            cur.execute("""
                CREATE TABLE IF NOT EXISTS user_account (
                    username VARCHAR(50) PRIMARY KEY,
                    password_hash VARCHAR(255),
                    role VARCHAR(20) DEFAULT 'user',
                    email VARCHAR(100) UNIQUE,
                    full_name VARCHAR(100),
                    profile_pic VARCHAR(255),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            """)
            
            # Apply schema migrations
            cur.execute("ALTER TABLE user_account ADD COLUMN IF NOT EXISTS email VARCHAR(100) UNIQUE;")
            cur.execute("ALTER TABLE user_account ADD COLUMN IF NOT EXISTS full_name VARCHAR(100);")
            cur.execute("ALTER TABLE user_account ADD COLUMN IF NOT EXISTS profile_pic VARCHAR(255);")
            cur.execute("ALTER TABLE user_account ALTER COLUMN password_hash DROP NOT NULL;")
            conn.commit()
            logger.info("Database migration checks complete.")
        except Exception as migration_error:
            logger.error(f"Migration run error: {migration_error}")
            conn.rollback()
        finally:
            cur.close()
            conn.close()
    except Exception as connection_error:
        logger.error(f"Database connection failed during startup migration: {connection_error}")

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/api/welfare")
def get_welfare_benefits():
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute("""
            SELECT id, title, category, region, source_url,
                   desc_ko, desc_vi, desc_zh, desc_en,
                   desc_outline, eligibility_dtl, selection_crit, welfare_content,
                   trgter_indvdl, life_array, onap_psblt_yn,
                   download_forms, apply_method, related_websites, inquiry_contacts
            FROM welfare_benefits
            ORDER BY id ASC;
        """)
        rows = cur.fetchall()
        benefits = []
        for r in rows:
            # Reconstruct eligibility summary
            elig_raw = r[10] if r[10] else ""
            elig_summary = elig_raw[:120] + ("..." if len(elig_raw) > 120 else "")
            
            benefits.append({
                "id": r[0],
                "title": r[1],
                "category": r[2],
                "minAge": 0,       # For backward compatibility
                "maxAge": 18,      # For backward compatibility
                "maxIncome": 150,  # For backward compatibility
                "region": r[3] if r[3] else "전국",
                "sourceUrl": r[4],
                "desc": {
                    "ko": r[5] if r[5] else "",
                    "vi": r[6] if r[6] else "",
                    "zh": r[7] if r[7] else "",
                    "en": r[8] if r[8] else ""
                },
                "eligibility": elig_summary,
                
                # Detailed raw fields
                "descOutline": r[9],
                "eligibilityDtl": r[10],
                "selectionCrit": r[11],
                "welfareContent": r[12],
                "trgterIndvdl": r[13],
                "lifeArray": r[14],
                "onapPsbltYn": r[15],
                "downloadForms": r[16],
                "applyMethod": r[17],
                "relatedWebsites": r[18],
                "inquiryContacts": r[19]
            })
        return benefits
    except Exception as e:
        logger.error(f"Error fetching welfare benefits: {e}")
        raise HTTPException(status_code=500, detail="Error fetching welfare benefits.")
    finally:
        cur.close()
        conn.close()

def call_gemini_api(payload, model_name="gemini-3.5-flash"):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={GEMINI_API_KEY}"
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as response:
            res_data = json.loads(response.read().decode("utf-8"))
            return res_data
    except Exception as e:
        logger.error(f"Gemini API model {model_name} error: {e}")
        # Try fallback model
        if model_name != "gemini-2.5-flash":
            logger.info("Falling back to gemini-2.5-flash...")
            return call_gemini_api(payload, model_name="gemini-2.5-flash")
        raise e

@app.post("/api/ocr")
async def ocr_document(file: UploadFile = File(...)):
    prompt = "Extract all readable Korean text from this document image. Do not translate, do not add explanation, just return the plain text."
    file_bytes = await file.read()
    base64_data = base64.b64encode(file_bytes).decode("utf-8")
    mime_type = file.content_type or "image/jpeg"
    
    payload = {
        "contents": [{
            "parts": [
                {"text": prompt},
                {
                    "inlineData": {
                        "mimeType": mime_type,
                        "data": base64_data
                    }
                }
            ]
        }]
    }
    
    try:
        res = call_gemini_api(payload)
        candidate = res["candidates"][0]
        text_response = candidate["content"]["parts"][0]["text"]
        return {"text": text_response.strip()}
    except Exception as e:
        logger.error(f"Failed to perform OCR: {e}")
        raise HTTPException(status_code=500, detail="OCR processing failed.")

@app.post("/api/analyze")
async def analyze_document(
    file: UploadFile = File(None),
    text: str = Form(None),
    lang: str = Form("ko")
):
    if not file and not text:
        raise HTTPException(status_code=400, detail="Either file or text must be provided.")
    
    # Map lang to human readable
    lang_map = {
        "ko": "Korean",
        "vi": "Vietnamese (Tiếng Việt)",
        "zh": "Chinese (中文)",
        "en": "English"
    }
    target_lang_name = lang_map.get(lang, "Korean")
    
    prompt = f"""
    You are a kind and professional elementary school teacher and translator helping multicultural families.
    Analyze the provided primary notice/document.
    
    Tasks:
    1. Extract the original Korean text from the document.
    2. Translate the content and summarize the core information that parents MUST know into three categories:
       - 📅 [핵심 일정 및 일시] (Key dates/times)
       - 🎒 [챙겨야 할 준비물] (Materials to prepare)
       - ✍️ [부모가 제출하거나 서명해야 할 것] (Documents to submit/sign)
       Write these summaries in BOTH Korean and the target language ({target_lang_name}). Format them as nice HTML tags (e.g. <h4>, <ul>, <li>, <p>).
    3. Generate the full translation of the text in the target language ({target_lang_name}).
    4. If there are any unique Korean school culture terms (e.g. 실내화, 주간학습안내, 늘봄교실, etc.) in the document, explain them in detail in the target language ({target_lang_name}) inside a div with class "culture-note".
    
    You MUST respond with a JSON object conforming exactly to this JSON schema:
    {{
      "extracted_text": "Detailed original Korean text extracted from the document",
      "schedule": "HTML content for Key Schedule Summary in both languages",
      "materials": "HTML content for Student Preparation List in both languages",
      "submissions": "HTML content for Submissions/Signatures required in both languages",
      "full_translation": "Full translation in the target language",
      "cultural_notes": "HTML content explaining unique culture terms in target language"
    }}
    """
    
    parts = [{"text": prompt}]
    
    if file:
        file_bytes = await file.read()
        base64_data = base64.b64encode(file_bytes).decode("utf-8")
        mime_type = file.content_type or "image/jpeg"
        parts.append({
            "inlineData": {
                "mimeType": mime_type,
                "data": base64_data
            }
        })
    elif text:
        parts.append({"text": f"Here is the text to analyze:\n{text}"})
        
    payload = {
        "contents": [{"parts": parts}],
        "generationConfig": {
            "responseMimeType": "application/json"
        }
    }
    
    try:
        res = call_gemini_api(payload)
        candidate = res["candidates"][0]
        text_response = candidate["content"]["parts"][0]["text"]
        result = json.loads(text_response)
        return result
    except Exception as e:
        logger.error(f"Failed to generate translation from Gemini: {e}")
        # Localized fallback structure
        fallback_msg = {
            "ko": {
                "extracted": text or "이미지 텍스트 추출 실패",
                "schedule": "<h4>📅 일정 요약</h4><p>API 연동 에러가 발생하여 간이 안내 처리합니다.</p>",
                "materials": "<h4>🎒 준비물</h4><p>안내문을 개별 확인해 주시기 바랍니다.</p>",
                "submissions": "<h4>✍️ 제출 서류</h4><p>기한 내에 제출 서류가 있는지 확인 바랍니다.</p>",
                "translation": "Gemini API 호출에 실패하였습니다. 설정 및 네트워크 상태를 확인하세요.",
                "culture": "<h4>💡 참고 사항</h4><p>한국 학교 문화 설명을 불러올 수 없습니다.</p>"
            },
            "vi": {
                "extracted": text or "Không thể trích xuất văn bản từ ảnh",
                "schedule": "<h4>📅 Lịch trình chính</h4><p>Đã xảy ra lỗi kết nối API. Vui lòng kiểm tra lại tài liệu gốc.</p>",
                "materials": "<h4>🎒 Đồ dùng chuẩn bị</h4><p>Vui lòng trực tiếp đối chiếu lại tài liệu hướng dẫn.</p>",
                "submissions": "<h4>✍️ Hồ sơ cần nộp</h4><p>Vui lòng xác nhận xem có hồ sơ nào cần nộp đúng hạn không.</p>",
                "translation": "Không thể kết nối đến Gemini API. Vui lòng kiểm tra thiết lập hoặc kết nối mạng.",
                "culture": "<h4>💡 Tham khảo văn hóa</h4><p>Không thể tải giải thích văn hóa học đường Hàn Quốc.</p>"
            },
            "zh": {
                "extracted": text or "图片文本提取失败",
                "schedule": "<h4>📅 日程摘要</h4><p>API 连通发生错误，请以原通知为准进行核对。</p>",
                "materials": "<h4>🎒 准备物品</h4><p>请单独确认通知内容以准备所需物品。</p>",
                "submissions": "<h4>✍️ 提交材料</h4><p>请确认是否有需要在期限内提交的材料。</p>",
                "translation": "调用 Gemini API 失败。请检查设置和网络状态。",
                "culture": "<h4>💡 文化小贴士</h4><p>无法载入韩国学校文化相关说明。</p>"
            },
            "en": {
                "extracted": text or "Failed to extract text from image",
                "schedule": "<h4>📅 Schedule Summary</h4><p>An API integration error occurred. Please verify with the original document.</p>",
                "materials": "<h4>🎒 Materials</h4><p>Please check the notices individually to prepare necessary materials.</p>",
                "submissions": "<h4>✍️ Submissions</h4><p>Please check if there are any documents to submit by the deadline.</p>",
                "translation": "Failed to call Gemini API. Please check settings and network status.",
                "culture": "<h4>💡 Cultural Notes</h4><p>Could not load explanations of Korean school culture.</p>"
            }
        }
        
        l_key = lang if lang in fallback_msg else "ko"
        f_data = fallback_msg[l_key]
        
        return {
            "extracted_text": f_data["extracted"],
            "schedule": f_data["schedule"],
            "materials": f_data["materials"],
            "submissions": f_data["submissions"],
            "full_translation": f_data["translation"],
            "cultural_notes": f_data["culture"]
        }

import hashlib

class GoogleAuthRequest(BaseModel):
    credential: str

@app.get("/api/config")
def get_config():
    return {
        "googleClientId": os.getenv("GOOGLE_CLIENT_ID", "1019623812739-abc123xyz.apps.googleusercontent.com")
    }

@app.post("/api/auth/google")
def google_auth(data: GoogleAuthRequest):
    token = data.credential
    try:
        # Verify Google Client ID Token using Google tokeninfo API
        res = requests.get(f"https://oauth2.googleapis.com/tokeninfo?id_token={token}", timeout=10)
        if not res.ok:
            raise HTTPException(status_code=400, detail="Invalid Google token.")
        
        user_info = res.json()
        email = user_info.get("email")
        name = user_info.get("name")
        picture = user_info.get("picture")
        
        if not email:
            raise HTTPException(status_code=400, detail="Email not provided by Google.")
        
        conn = get_db_connection()
        cur = conn.cursor()
        try:
            # Check if user exists
            cur.execute("SELECT username, role, full_name, profile_pic FROM user_account WHERE username = %s;", (email,))
            row = cur.fetchone()
            
            if row:
                # Update details if changed
                cur.execute(
                    "UPDATE user_account SET full_name = %s, profile_pic = %s WHERE username = %s;",
                    (name, picture, email)
                )
                role = row[1]
            else:
                # Register new user
                cur.execute(
                    "INSERT INTO user_account (username, password_hash, role, email, full_name, profile_pic) VALUES (%s, %s, %s, %s, %s, %s);",
                    (email, None, 'user', email, name, picture)
                )
                role = 'user'
            conn.commit()
        finally:
            cur.close()
            conn.close()
            
        return {
            "status": "success",
            "username": email,
            "role": role,
            "name": name,
            "picture": picture,
            "token": f"google-session-token-{email}"
        }
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Google OAuth error: {e}")
        raise HTTPException(status_code=500, detail="Google authentication failed.")

class UserLogin(BaseModel):
    username: str
    password: str

@app.post("/api/admin/login")
def admin_login(data: UserLogin):
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        pw_hash = hashlib.sha256(data.password.encode('utf-8')).hexdigest()
        cur.execute(
            "SELECT username, role FROM user_account WHERE username = %s AND password_hash = %s;",
            (data.username, pw_hash)
        )
        row = cur.fetchone()
        if not row:
            raise HTTPException(status_code=401, detail="Invalid username or password.")
        
        username, role = row[0], row[1]
        if role != 'admin':
            raise HTTPException(status_code=403, detail="Access denied. Admin role required.")
            
        return {
            "status": "success",
            "username": username,
            "role": role,
            "token": "admin-session-token-daon-2026"
        }
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Login error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error during login.")
    finally:
        cur.close()
        conn.close()

@app.get("/api/admin/welfare")
def get_admin_welfare_benefits(token: str = None):
    if token != "admin-session-token-daon-2026":
        raise HTTPException(status_code=401, detail="Unauthorized dashboard access.")
        
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute("""
            SELECT id, title, category, region, source_url,
                   desc_ko, desc_vi, desc_zh, desc_en,
                   desc_outline, eligibility_dtl, selection_crit, welfare_content,
                   trgter_indvdl, life_array, onap_psblt_yn,
                   download_forms, apply_method, related_websites, inquiry_contacts, updated_at
            FROM welfare_benefits
            ORDER BY updated_at DESC;
        """)
        rows = cur.fetchall()
        benefits = []
        for r in rows:
            elig_raw = r[10] if r[10] else ""
            elig_summary = elig_raw[:120] + ("..." if len(elig_raw) > 120 else "")
            
            benefits.append({
                "id": r[0],
                "title": r[1],
                "category": r[2],
                "minAge": 0,       # For backward compatibility
                "maxAge": 18,      # For backward compatibility
                "maxIncome": 150,  # For backward compatibility
                "region": r[3] if r[3] else "전국",
                "sourceUrl": r[4],
                "desc": {
                    "ko": r[5] if r[5] else "",
                    "vi": r[6] if r[6] else "",
                    "zh": r[7] if r[7] else "",
                    "en": r[8] if r[8] else ""
                },
                "eligibility": elig_summary,
                
                # Detailed raw fields
                "descOutline": r[9],
                "eligibilityDtl": r[10],
                "selectionCrit": r[11],
                "welfareContent": r[12],
                "trgterIndvdl": r[13],
                "lifeArray": r[14],
                "onapPsbltYn": r[15],
                "downloadForms": r[16],
                "applyMethod": r[17],
                "relatedWebsites": r[18],
                "inquiryContacts": r[19],
                "updatedAt": r[20].strftime("%Y-%m-%d %H:%M:%S") if r[20] else ""
            })
        return benefits
    except Exception as e:
        logger.error(f"Error fetching admin welfare benefits: {e}")
        raise HTTPException(status_code=500, detail="Error fetching welfare benefits.")
    finally:
        cur.close()
        conn.close()

