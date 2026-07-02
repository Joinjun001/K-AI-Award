import os
import json
import time
import urllib.request
import urllib.parse
import re

# Configurations
API_KEY_FILE = '/home/injun/daon-app/api_key.txt'
OUTPUT_JSON_PATH = '/home/injun/daon-app/welfare_data.json'
INTERVAL_SECONDS = 1800  # 30 minutes

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
    
    # Try to extract numbers
    numbers = [int(n) for n in re.findall(r'\d+', target_text)]
    if len(numbers) >= 2:
        min_age, max_age = min(numbers), max(numbers)
    elif len(numbers) == 1:
        if "미만" in target_text or "이하" in target_text:
            min_age, max_age = 0, numbers[0]
        elif "이상" in target_text:
            min_age, max_age = numbers[0], 19
    return min_age, max_age

# Parse Income condition from text
def parse_income(target_text):
    if not target_text:
        return 150 # default보편 지원
    
    # Extract median income percentage (e.g. 50%, 80%, 100%, 120%, 150%)
    match = re.search(r'(\d+)%', target_text)
    if match:
        return int(match.group(1))
    
    if "기초" in target_text or "차상위" in target_text or "소득하위" in target_text:
        return 50
    return 150

# Fetch and update cache
def fetch_and_cache():
    # Read API Key
    api_key = "data-portal-test-key"  # default fallback key
    if os.path.exists(API_KEY_FILE):
        with open(API_KEY_FILE, 'r', encoding='utf-8') as f:
            user_key = f.read().strip()
            if user_key:
                api_key = user_key
                
    print(f"Fetching live data from Bojogum24 API using key: {api_key[:8]}...")
    url = "https://api.odcloud.kr/api/gov24/v3/serviceList?page=1&perPage=80"
    
    req = urllib.request.Request(url, headers={
        "Authorization": f"Infuser {api_key}",
        "User-Agent": "Mozilla/5.0"
    })
    
    try:
        try:
            response = urllib.request.urlopen(req, timeout=10)
        except urllib.error.HTTPError as he:
            if he.code == 401 and api_key != "data-portal-test-key":
                print("User API key returned 401 (Unauthorized). It might still be activating on the portal side. Falling back to data-portal-test-key...")
                req = urllib.request.Request(url, headers={
                    "Authorization": "Infuser data-portal-test-key",
                    "User-Agent": "Mozilla/5.0"
                })
                response = urllib.request.urlopen(req, timeout=10)
            else:
                raise he
                
        res_data = json.loads(response.read().decode('utf-8'))
        raw_items = res_data.get('data', [])
        print(f"Total raw items fetched: {len(raw_items)}")
        
        # Filter for multicultural/children/welfare categories
        filtered_items = []
        for idx, item in enumerate(raw_items):
            title = item.get('서비스명', '')
            desc_text = item.get('지원내용', '')
            target_text = item.get('지원대상', '')
            category = item.get('부서명', '복지')
            
            # Keywords matching multicultural, child, family support
            match_keywords = ["다문화", "외국인", "보육", "아동", "출산", "양육", "가족", "소아", "임산부", "영유아"]
            is_matched = any(kw in title or kw in desc_text or kw in target_text for kw in match_keywords)
            
            if is_matched:
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
                source_url = item.get('상세조회URL', 'https://www.bokjiro.go.kr')
                
                filtered_items.append({
                    "id": f"api_w_{idx}",
                    "title": title,
                    "category": item.get('지원유형', '기타'),
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
