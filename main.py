import os
import json
import base64
import logging
import urllib.request
import urllib.parse
import psycopg2
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

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "AIzaSyD8AMx28UlQS0lEBbYLHIK0pZaZ--dU1E8")
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

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/api/welfare")
def get_welfare_benefits():
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute("""
            SELECT id, title, category, min_age, max_age, max_income, region,
                   desc_ko, desc_vi, desc_zh, desc_en, eligibility, source_url
            FROM welfare_benefits
            ORDER BY id ASC;
        """)
        rows = cur.fetchall()
        benefits = []
        for r in rows:
            benefits.append({
                "id": r[0],
                "title": r[1],
                "category": r[2],
                "minAge": r[3],
                "maxAge": r[4],
                "maxIncome": r[5],
                "region": r[6],
                "desc": {
                    "ko": r[7],
                    "vi": r[8],
                    "zh": r[9],
                    "en": r[10]
                },
                "eligibility": r[11],
                "sourceUrl": r[12]
            })
        return benefits
    except Exception as e:
        logger.error(f"Error fetching welfare benefits: {e}")
        raise HTTPException(status_code=500, detail="Error fetching welfare benefits.")
    finally:
        cur.close()
        conn.close()

def call_gemini_api(payload, model_name="gemini-2.5-flash"):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={GEMINI_API_KEY}"
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as response:
            res_data = json.loads(response.read().decode("utf-8"))
            return res_data
    except Exception as e:
        logger.error(f"Gemini API model {model_name} error: {e}")
        # Try fallback model
        if model_name != "gemini-2.0-flash":
            logger.info("Falling back to gemini-2.0-flash...")
            return call_gemini_api(payload, model_name="gemini-2.0-flash")
        raise e

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
        # Return fallback structure
        return {
            "extracted_text": text or "이미지 텍스트 추출 실패",
            "schedule": "<h4>📅 일정 요약</h4><p>API 연동 에러가 발생하여 간이 안내 처리합니다.</p>",
            "materials": "<h4>🎒 준비물</h4><p>안내문을 개별 확인해 주시기 바랍니다.</p>",
            "submissions": "<h4>✍️ 제출 서류</h4><p>기한 내에 제출 서류가 있는지 확인 바랍니다.</p>",
            "full_translation": "Gemini API 호출에 실패하였습니다. 설정 및 네트워크 상태를 확인하세요.",
            "cultural_notes": "<h4>💡 참고 사항</h4><p>한국 학교 문화 설명을 불러올 수 없습니다.</p>"
        }
