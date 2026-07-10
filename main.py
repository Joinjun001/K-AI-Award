import os
import json
import base64
import logging
import urllib.request
import urllib.parse
import psycopg2
import requests
import io
import re
from PIL import Image
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

def compress_image(image_bytes: bytes, max_size=(1024, 1024), quality=75) -> bytes:
    try:
        img = Image.open(io.BytesIO(image_bytes))
        # Convert RGBA to RGB for JPEG compatibility
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")
        # Resize image retaining aspect ratio
        img.thumbnail(max_size, Image.Resampling.LANCZOS)
        
        out_io = io.BytesIO()
        img.save(out_io, format="JPEG", quality=quality)
        compressed_bytes = out_io.getvalue()
        logger.info(f"Image compressed successfully: {len(image_bytes)} bytes -> {len(compressed_bytes)} bytes")
        return compressed_bytes
    except Exception as e:
        logger.warning(f"Image compression failed, using original bytes: {e}")
        return image_bytes

LLM_PROVIDER = os.getenv("LLM_PROVIDER", "gemini").lower()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
OCI_API_KEY = os.getenv("OCI_API_KEY")

if LLM_PROVIDER == "gemini" and not GEMINI_API_KEY:
    logger.warning("GEMINI_API_KEY is not set. Gemini API features will fail.")
elif LLM_PROVIDER == "oci" and not OCI_API_KEY:
    logger.warning("OCI_API_KEY is not set. OCI Generative AI features will fail.")

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

def call_llm(prompt: str, file_bytes: bytes = None, mime_type: str = "image/jpeg", force_json: bool = False):
    provider = os.getenv("LLM_PROVIDER", "gemini").lower()
    
    if provider == "oci":
        oci_key = os.getenv("OCI_API_KEY")
        oci_region = os.getenv("OCI_REGION", "ap-osaka-1")
        oci_compartment = os.getenv("OCI_COMPARTMENT_ID")
        oci_model = os.getenv("OCI_MODEL_ID", "meta.llama-3.2-90b-vision-instruct")
        
        if not oci_key or not oci_compartment:
            logger.error("OCI_API_KEY or OCI_COMPARTMENT_ID is missing.")
            raise HTTPException(status_code=500, detail="OCI Generative AI configuration is missing.")
            
        url = f"https://inference.generativeai.{oci_region}.oci.oraclecloud.com/openai/v1/chat/completions"
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {oci_key}",
            "OpenAI-Project": oci_compartment
        }
        
        content_parts = [{"type": "text", "text": prompt}]
        if file_bytes:
            base64_data = base64.b64encode(file_bytes).decode("utf-8")
            content_parts.append({
                "type": "image_url",
                "image_url": {
                    "url": f"data:{mime_type};base64,{base64_data}"
                }
            })
            
        payload = {
            "model": oci_model,
            "messages": [
                {
                    "role": "user",
                    "content": content_parts
                }
            ],
            "temperature": 0.2
        }
        if force_json:
            payload["response_format"] = {"type": "json_object"}
            
        
        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode("utf-8"),
            headers=headers,
            method="POST"
        )
        
        try:
            with urllib.request.urlopen(req, timeout=90) as response:
                res_data = json.loads(response.read().decode("utf-8"))
                return res_data["choices"][0]["message"]["content"]
        except Exception as e:
            logger.error(f"OCI Generative AI error: {e}")
            if hasattr(e, "read"):
                try:
                    logger.error(f"OCI Error body: {e.read().decode('utf-8')}")
                except Exception:
                    pass
            raise e
    else:
        # Default Gemini mode
        parts = [{"text": prompt}]
        if file_bytes:
            base64_data = base64.b64encode(file_bytes).decode("utf-8")
            parts.append({
                "inlineData": {
                    "mimeType": mime_type,
                    "data": base64_data
                }
            })
        payload = {
            "contents": [{"parts": parts}]
        }
        if force_json:
            payload["generationConfig"] = {
                "responseMimeType": "application/json"
            }
        res = call_gemini_api(payload)
        candidate = res["candidates"][0]
        return candidate["content"]["parts"][0]["text"]

@app.post("/api/ocr")
async def ocr_document(file: UploadFile = File(...)):
    prompt = "Extract all readable Korean text from this document image. Do not translate, do not add explanation, just return the plain text."
    file_bytes = await file.read()
    file_bytes = compress_image(file_bytes)
    mime_type = "image/jpeg"
    
    try:
        text_response = call_llm(prompt=prompt, file_bytes=file_bytes, mime_type=mime_type)
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
    
    headers_map = {
        "ko": {
            "schedule": "📅 주요 일정 및 시간",
            "materials": "🎒 준비물 안내",
            "submissions": "✍️ 제출/서명 서류 및 협조사항"
        },
        "vi": {
            "schedule": "📅 Các ngày & giờ quan trọng",
            "materials": "🎒 Vật dụng cần chuẩn bị",
            "submissions": "✍️ Tài liệu cần nộp / ký / hợp tác"
        },
        "zh": {
            "schedule": "📅 重要日期与时间",
            "materials": "🎒 需要准备的物品",
            "submissions": "✍️ 需提交/签字的材料及协作事项"
        },
        "en": {
            "schedule": "📅 Key Dates & Times",
            "materials": "🎒 Materials to Prepare",
            "submissions": "✍️ Documents to Submit / Sign / Cooperation"
        }
    }
    
    selected_headers = headers_map.get(lang, headers_map["ko"])
    sch_hdr = selected_headers["schedule"]
    mat_hdr = selected_headers["materials"]
    sub_hdr = selected_headers["submissions"]
    
    exclusion_rule = ""
    if lang != "ko":
        exclusion_rule = "Do NOT include any Korean text or Korean headings in these summaries."
    else:
        exclusion_rule = "Since the target language is Korean, all category headings and contents must be written in Korean."

    prompt = f"""
    You are a kind and professional elementary school teacher and translator helping multicultural families.
    Analyze the provided primary notice/document.
    
    Tasks:
    1. Extract the original Korean text from the document.
    2. Translate the content and summarize the core information that parents MUST know into three categories.
       The category headings and all summary contents MUST be written 100% in the target language ({target_lang_name}) only. {exclusion_rule}
       You MUST use the following exact headers for the categories:
       - {sch_hdr}
       - {mat_hdr}
       - {sub_hdr}
       Format them as nice HTML tags (e.g. <h4>, <ul>, <li>, <p>).
    3. Generate the full translation of the text in the target language ({target_lang_name}).
    4. If there are any unique Korean school culture terms (e.g. 실내화, 주간학습안내, 늘봄교실, etc.) in the document, explain them in detail in the target language ({target_lang_name}) inside a div with class "culture-note".
    
    You MUST respond with a JSON object conforming exactly to this JSON schema:
    {{
      "extracted_text": "Detailed original Korean text extracted from the document",
      "schedule": "HTML content for Key Schedule Summary in the target language ({target_lang_name}) only",
      "materials": "HTML content for Student Preparation List in the target language ({target_lang_name}) only",
      "submissions": "HTML content for Submissions/Signatures required in the target language ({target_lang_name}) only",
      "full_translation": "Full translation in the target language ({target_lang_name})",
      "cultural_notes": "HTML content explaining unique culture terms in target language ({target_lang_name})"
    }}
    
    CRITICAL JSON RULE: You MUST output a strictly valid JSON object. Do not include raw unescaped double quotes inside the JSON string values (especially inside HTML tags). Use single quotes or escape them as \\" for HTML attributes.
    """
    
    file_bytes = None
    mime_type = "image/jpeg"
    full_prompt = prompt
    
    if file:
        file_bytes = await file.read()
        file_bytes = compress_image(file_bytes)
        mime_type = "image/jpeg"
    elif text:
        full_prompt = f"{prompt}\n\nHere is the text to analyze:\n{text}"
        
    try:
        text_response = call_llm(prompt=full_prompt, file_bytes=file_bytes, mime_type=mime_type, force_json=True)
        
        # Clean potential markdown or conversational wrappers by slicing to the JSON boundaries
        cleaned = text_response.strip()
        start_idx = cleaned.find("{")
        end_idx = cleaned.rfind("}")
        if start_idx != -1 and end_idx != -1 and end_idx > start_idx:
            cleaned = cleaned[start_idx:end_idx+1]
        
        result = json.loads(cleaned)
        return result
    except Exception as e:
        logger.error(f"Failed to generate translation from LLM: {e}")
        raise HTTPException(status_code=500, detail="AI 분석 및 번역 중 오류가 발생하였습니다. API 설정 및 네트워크를 확인하세요.")

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

class UserRegister(BaseModel):
    username: str
    password: str
    email: str
    full_name: str

class UserLogin(BaseModel):
    username: str
    password: str

@app.get("/api/auth/check-username")
def check_username(username: str):
    if not re.match(r"^[a-zA-Z0-9_-]{3,20}$", username):
        return {"available": False}
        
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute("SELECT username FROM user_account WHERE username = %s;", (username,))
        exists = cur.fetchone() is not None
        return {"available": not exists}
    except Exception as e:
        logger.error(f"Error checking username availability: {e}")
        raise HTTPException(status_code=500, detail="아이디 중복 확인에 실패했습니다.")
    finally:
        cur.close()
        conn.close()

@app.post("/api/auth/register")
def register_user(data: UserRegister):
    if not re.match(r"^[a-zA-Z0-9_-]{3,20}$", data.username):
        raise HTTPException(status_code=400, detail="아이디는 3~20자의 영문, 숫자, 밑줄(_), 붙임표(-)만 사용할 수 있습니다.")
        
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        # Check if username or email already exists
        cur.execute("SELECT username FROM user_account WHERE username = %s OR email = %s;", (data.username, data.email))
        if cur.fetchone():
            raise HTTPException(status_code=400, detail="이미 가입된 아이디 또는 이메일입니다.")
            
        pw_hash = hashlib.sha256(data.password.encode('utf-8')).hexdigest()
        cur.execute(
            "INSERT INTO user_account (username, password_hash, role, email, full_name) VALUES (%s, %s, %s, %s, %s);",
            (data.username, pw_hash, 'user', data.email, data.full_name)
        )
        conn.commit()
        return {"status": "success", "message": "User registered successfully."}
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"User registration error: {e}")
        raise HTTPException(status_code=500, detail="회원가입에 실패했습니다.")
    finally:
        cur.close()
        conn.close()

@app.post("/api/auth/login")
def login_user(data: UserLogin):
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        pw_hash = hashlib.sha256(data.password.encode('utf-8')).hexdigest()
        cur.execute(
            "SELECT username, role, full_name, email, profile_pic FROM user_account WHERE username = %s AND password_hash = %s;",
            (data.username, pw_hash)
        )
        row = cur.fetchone()
        if not row:
            raise HTTPException(status_code=401, detail="아이디 또는 비밀번호가 잘못되었습니다.")
            
        username, role, full_name, email, profile_pic = row[0], row[1], row[2], row[3], row[4]
        return {
            "status": "success",
            "username": username,
            "role": role,
            "name": full_name or username,
            "email": email,
            "picture": profile_pic,
            "token": f"local-session-token-{username}"
        }
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"User login error: {e}")
        raise HTTPException(status_code=500, detail="로그인에 실패했습니다.")
    finally:
        cur.close()
        conn.close()

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

