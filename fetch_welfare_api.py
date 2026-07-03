import os
import json
import time
import urllib.request
import urllib.parse
import re
import psycopg2

# Configurations
API_KEY_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'api_key.txt')
OUTPUT_JSON_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'welfare_data.json')
ENV_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), '.env')
INTERVAL_SECONDS = 1800  # 30 minutes

def load_env():
    if os.path.exists(ENV_FILE):
        with open(ENV_FILE, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, val = line.split('=', 1)
                    os.environ[key.strip()] = val.strip()

# Free Google Translate API Stub (No Key Required)
def translate_text(text, target_lang):
    if not text:
        return ""
    try:
        url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=ko&tl=" + target_lang + "&dt=t&q=" + urllib.parse.quote(text)
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=5) as response:
            res = json.loads(response.read().decode('utf-8'))
            translated = "".join([sentence[0] for sentence in res[0]])
            return translated
    except Exception as e:
        print(f"Translation error ({target_lang}): {e}")
        return text  # Fallback to Korean if error occurs

# Parse Age condition from text
def parse_age(target_text):
    # Default fallback age group
    min_age, max_age = 0, 18
    if not target_text:
        return min_age, max_age
    
    # 1. "만 X ~ Y세" 또는 "만 X세 ~ Y세" 또는 "만X~Y세"
    range_match = re.search(r'(?:만\s*)?(\d+)\s*(?:세)?\s*(?:~|-)\s*(?:만\s*)?(\d+)\s*세', target_text)
    if range_match:
        return int(range_match.group(1)), int(range_match.group(2))
    
    # 2. "만 X세 미만/이하"
    under_match = re.search(r'(?:만\s*)?(\d+)\s*세\s*(?:미만|이하)', target_text)
    if under_match:
        return 0, int(under_match.group(1))
    
    # 3. "만 X세 이상"
    over_match = re.search(r'(?:만\s*)?(\d+)\s*세\s*이상', target_text)
    if over_match:
        return int(over_match.group(1)), 18
        
    # 4. 단일 "만 X세"
    single_match = re.search(r'(?:만\s*)?(\d+)\s*세', target_text)
    if single_match:
        age = int(single_match.group(1))
        return max(0, age - 1), min(18, age + 1)
        
    return min_age, max_age

# Parse Income condition from text
def parse_income(target_text):
    if not target_text:
        return 150 # default보편 지원
    
    # Check if income is completely ignored/universal
    universal_keywords = ["상관없이", "상관 없이", "제한 없음", "제한없음", "소득 무관", "소득무관", "기준 없음", "모든 유아", "모든 아동"]
    if any(phrase in target_text for phrase in universal_keywords):
        return 150
    
    # Extract median income percentage (e.g. 50%, 80%, 100%, 120%, 150%)
    percent_match = re.search(r'(\d+)\s*%', target_text)
    if percent_match:
        return int(percent_match.group(1))
    
    if "기초" in target_text or "차상위" in target_text or "소득하위" in target_text:
        # If it also supports general cases, fallback to universal
        if "일반" in target_text or "기타" in target_text or "모든" in target_text:
            return 150
        return 50
    return 150

def save_to_db(items):
    try:
        conn = psycopg2.connect(
            host='127.0.0.1',
            port=5432,
            user='daon_user',
            password='your_strong_password',
            dbname='daondb'
        )
        cur = conn.cursor()
        
        upsert_query = """
        INSERT INTO welfare_benefits (
            id, title, category, min_age, max_age, max_income, region,
            desc_ko, desc_vi, desc_zh, desc_en, eligibility, source_url, updated_at
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, CURRENT_TIMESTAMP)
        ON CONFLICT (id) DO UPDATE SET
            title = EXCLUDED.title,
            category = EXCLUDED.category,
            min_age = EXCLUDED.min_age,
            max_age = EXCLUDED.max_age,
            max_income = EXCLUDED.max_income,
            region = EXCLUDED.region,
            desc_ko = EXCLUDED.desc_ko,
            desc_vi = EXCLUDED.desc_vi,
            desc_zh = EXCLUDED.desc_zh,
            desc_en = EXCLUDED.desc_en,
            eligibility = EXCLUDED.eligibility,
            source_url = EXCLUDED.source_url,
            updated_at = CURRENT_TIMESTAMP;
        """
        
        for item in items:
            cur.execute(upsert_query, (
                item["id"],
                item["title"],
                item["category"],
                item["minAge"],
                item["maxAge"],
                item["maxIncome"],
                item["region"],
                item["desc"]["ko"],
                item["desc"]["vi"],
                item["desc"]["zh"],
                item["desc"]["en"],
                item["eligibility"],
                item["sourceUrl"]
            ))
            
        conn.commit()
        print(f"Successfully upserted {len(items)} items to PostgreSQL DB.")
        cur.close()
        conn.close()
    except Exception as e:
        print(f"Error saving to PostgreSQL DB: {e}")

# Fetch and update cache
def fetch_and_cache():
    # Load env variables from .env
    load_env()
    
    # Read API Key
    api_key = os.getenv("DATA_PORTAL_API_KEY", "")
    if not api_key and os.path.exists(API_KEY_FILE):
        with open(API_KEY_FILE, 'r', encoding='utf-8') as f:
            user_key = f.read().strip()
            if user_key:
                api_key = user_key
                
    if not api_key:
        api_key = "data-portal-test-key"  # default fallback key
                
    print(f"Fetching live data from Bokjiro Central Ministry Welfare API using key: {api_key[:8]}...")
    url = f"http://apis.data.go.kr/B554287/NationalWelfareInformationsV001/NationalWelfarelistV001?serviceKey={api_key}&pageNo=1&numOfRows=100"
    
    req = urllib.request.Request(url, headers={
        "User-Agent": "Mozilla/5.0"
    })
    
    try:
        try:
            response = urllib.request.urlopen(req, timeout=15)
            xml_content = response.read()
        except urllib.error.HTTPError as he:
            if api_key != "data-portal-test-key":
                print("User API key returned HTTPError. Falling back to data-portal-test-key...")
                fallback_url = f"http://apis.data.go.kr/B554287/NationalWelfareInformationsV001/NationalWelfarelistV001?serviceKey=data-portal-test-key&pageNo=1&numOfRows=100"
                req_fallback = urllib.request.Request(fallback_url, headers={"User-Agent": "Mozilla/5.0"})
                response = urllib.request.urlopen(req_fallback, timeout=15)
                xml_content = response.read()
            else:
                raise he
                
        import xml.etree.ElementTree as ET
        root = ET.fromstring(xml_content)
        items = root.findall('.//item')
        print(f"Total raw items fetched from XML API: {len(items)}")
        
        # Filter for multicultural/children/welfare categories
        filtered_items = []
        for idx, item in enumerate(items):
            title = item.find('servNm').text if item.find('servNm') is not None else ''
            desc_text = item.find('servDgst').text if item.find('servDgst') is not None else ''
            target_text = item.find('tgTrgDetailDesc').text if item.find('tgTrgDetailDesc') is not None else ''
            category = item.find('jurMnofNm').text if item.find('jurMnofNm') is not None else '복지'
            
            # Keywords matching multicultural, child, family support
            match_keywords = ["다문화", "외국인", "보육", "아동", "출산", "양육", "가족", "소아", "임산부", "영유아"]
            
            # Exclude business/corporate/industrial/farming/fishery policies that are not family welfare
            exclude_keywords = ["법인", "기업", "사업자", "어업", "농업", "농가", "임업", "경영체", "합작", "경영자금", "벤처", "스타트업", "소상공인"]
            
            is_matched = any(kw in title or kw in desc_text or kw in target_text for kw in match_keywords)
            is_excluded = any(kw in title or kw in target_text for kw in exclude_keywords)
            
            if is_matched and not is_excluded:
                # Limit policies to maximum 15 items to avoid excessive translation overhead
                if len(filtered_items) >= 15:
                    break
                    
                print(f"Processing matched policy: {title}")
                
                # Parse conditions
                min_age, max_age = parse_age(target_text)
                max_income = parse_income(target_text)
                
                # Region parsing
                region = "전국"
                if "마포구" in target_text or "마포구" in category or "마포" in title:
                    region = "서울 마포구"
                elif "수원시" in target_text or "수원시" in category or "수원" in title:
                    region = "경기 수원시"
                    
                # Translate descriptions
                desc_vi = translate_text(desc_text, 'vi')
                desc_zh = translate_text(desc_text, 'zh-CN')
                desc_en = translate_text(desc_text, 'en')
                
                # Extract detailed source URL directly from API
                source_url = item.find('servDtlLink').text if item.find('servDtlLink') is not None else 'https://www.bokjiro.go.kr'
                
                filtered_items.append({
                    "id": f"api_w_{idx}",
                    "title": title,
                    "category": category,
                    "minAge": min_age,
                    "maxAge": max_age,
                    "maxIncome": max_income,
                    "region": region,
                    "desc": {
                        "ko": desc_text,
                        "vi": desc_vi,
                        "zh": desc_zh,
                        "en": desc_en
                    },
                    "eligibility": target_text[:120] + ("..." if len(target_text) > 120 else ""),
                    "sourceUrl": source_url
                })
                
        # Write to JSON Cache file if we have parsed results
        if len(filtered_items) > 0:
            with open(OUTPUT_JSON_PATH, 'w', encoding='utf-8') as f:
                json.dump(filtered_items, f, ensure_ascii=False, indent=4)
            print(f"Successfully cached {len(filtered_items)} live policies to {OUTPUT_JSON_PATH}")
            save_to_db(filtered_items)
        else:
            print("No matching multicultural policies found in live feed. Skipping cache update.")
            
    except Exception as e:
        print(f"API fetch or parsing error: {e}")

# Daemon main loop
def main():
    print(f"Starting Bojogum24 API cache syncing daemon (Interval: {INTERVAL_SECONDS}s)...")
    while True:
        try:
            fetch_and_cache()
        except Exception as err:
            print(f"Daemon loop execution error: {err}")
        time.sleep(INTERVAL_SECONDS)

if __name__ == '__main__':
    main()
