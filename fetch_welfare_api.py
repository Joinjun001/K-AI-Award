import os
import json
import time
import urllib.request
import urllib.parse
import psycopg2
import psycopg2.extras
import xml.etree.ElementTree as ET

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
            id, title, category, region, source_url,
            desc_ko, desc_vi, desc_zh, desc_en,
            desc_outline, eligibility_dtl, selection_crit, welfare_content,
            trgter_indvdl, life_array, onap_psblt_yn,
            download_forms, apply_method, related_websites, inquiry_contacts, updated_at
        ) VALUES (
            %s, %s, %s, %s, %s,
            %s, %s, %s, %s,
            %s, %s, %s, %s,
            %s, %s, %s,
            %s, %s, %s, %s, CURRENT_TIMESTAMP
        )
        ON CONFLICT (id) DO UPDATE SET
            title = EXCLUDED.title,
            category = EXCLUDED.category,
            region = EXCLUDED.region,
            source_url = EXCLUDED.source_url,
            desc_ko = EXCLUDED.desc_ko,
            desc_vi = EXCLUDED.desc_vi,
            desc_zh = EXCLUDED.desc_zh,
            desc_en = EXCLUDED.desc_en,
            desc_outline = EXCLUDED.desc_outline,
            eligibility_dtl = EXCLUDED.eligibility_dtl,
            selection_crit = EXCLUDED.selection_crit,
            welfare_content = EXCLUDED.welfare_content,
            trgter_indvdl = EXCLUDED.trgter_indvdl,
            life_array = EXCLUDED.life_array,
            onap_psblt_yn = EXCLUDED.onap_psblt_yn,
            download_forms = EXCLUDED.download_forms,
            apply_method = EXCLUDED.apply_method,
            related_websites = EXCLUDED.related_websites,
            inquiry_contacts = EXCLUDED.inquiry_contacts,
            updated_at = CURRENT_TIMESTAMP;
        """
        
        for item in items:
            cur.execute(upsert_query, (
                item["id"],
                item["title"],
                item["category"],
                item["region"],
                item["sourceUrl"],
                item["desc"]["ko"],
                item["desc"]["vi"],
                item["desc"]["zh"],
                item["desc"]["en"],
                item["descOutline"],
                item["eligibilityDtl"],
                item["selectionCrit"],
                item["welfareContent"],
                item["trgterIndvdl"],
                item["lifeArray"],
                item["onapPsbltYn"],
                psycopg2.extras.Json(item["downloadForms"]),
                psycopg2.extras.Json(item["applyMethod"]),
                psycopg2.extras.Json(item["relatedWebsites"]),
                psycopg2.extras.Json(item["inquiryContacts"])
            ))
            
        conn.commit()
        print(f"Successfully upserted {len(items)} items to PostgreSQL DB.")
        cur.close()
        conn.close()
    except Exception as e:
        print(f"Error saving to PostgreSQL DB: {e}")

def fetch_and_cache():
    load_env()
    
    api_key = os.getenv("DATA_PORTAL_API_KEY", "")
    if not api_key and os.path.exists(API_KEY_FILE):
        with open(API_KEY_FILE, 'r', encoding='utf-8') as f:
            user_key = f.read().strip()
            if user_key:
                api_key = user_key
                
    if not api_key:
        api_key = "data-portal-test-key"
        
    print(f"Fetching live data from Bokjiro Central Ministry Welfare API using key: {api_key[:8]}...")
    
    # Fetch list
    url = f"http://apis.data.go.kr/B554287/NationalWelfareInformationsV001/NationalWelfarelistV001?serviceKey={api_key}&pageNo=1&numOfRows=100&callTp=L&srchKeyCode=001"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    
    try:
        try:
            response = urllib.request.urlopen(req, timeout=15)
            xml_content = response.read()
        except urllib.error.HTTPError as he:
            if api_key != "data-portal-test-key":
                print("User API key returned HTTPError. Falling back to data-portal-test-key...")
                fallback_url = f"http://apis.data.go.kr/B554287/NationalWelfareInformationsV001/NationalWelfarelistV001?serviceKey=data-portal-test-key&pageNo=1&numOfRows=100&callTp=L&srchKeyCode=001"
                req_fallback = urllib.request.Request(fallback_url, headers={"User-Agent": "Mozilla/5.0"})
                response = urllib.request.urlopen(req_fallback, timeout=15)
                xml_content = response.read()
            else:
                raise he
                
        root = ET.fromstring(xml_content)
        items = root.findall('.//servList')
        print(f"Total raw items fetched from XML API: {len(items)}")
        
        filtered_items = []
        for idx, item in enumerate(items):
            serv_id = item.find('servId').text if item.find('servId') is not None else ''
            title = item.find('servNm').text if item.find('servNm') is not None else ''
            desc_text = item.find('servDgst').text if item.find('servDgst') is not None else ''
            category = item.find('jurMnofNm').text if item.find('jurMnofNm') is not None else '복지'
            trg_val = item.find('trgterIndvdlArray').text if item.find('trgterIndvdlArray') is not None else ''
            life_val = item.find('lifeArray').text if item.find('lifeArray') is not None else ''
            
            # Keywords matching multicultural, child, family support
            match_keywords = ["다문화", "외국인", "보육", "아동", "출산", "양육", "가족", "소아", "임산부", "영유아"]
            exclude_keywords = ["법인", "기업", "사업자", "어업", "농업", "농가", "임업", "경영체", "합작", "경영자금", "벤처", "스타트업", "소상공인"]
            
            is_matched = any(kw in title or kw in desc_text or kw in trg_val or kw in life_val for kw in match_keywords)
            is_excluded = any(kw in title or kw in trg_val for kw in exclude_keywords)
            
            if is_matched and not is_excluded:
                if len(filtered_items) >= 15:
                    break
                    
                print(f"Processing matched policy: {title} ({serv_id})")
                
                # Call detailed API
                detail_url = f"http://apis.data.go.kr/B554287/NationalWelfareInformationsV001/NationalWelfaredetailedV001?serviceKey={api_key}&servId={serv_id}"
                
                eligibility_dtl = ""
                selection_crit = ""
                welfare_content = ""
                onap_psblt_yn = item.find('onapPsbltYn').text if item.find('onapPsbltYn') is not None else 'N'
                
                download_forms = []
                apply_method = []
                related_websites = []
                inquiry_contacts = []
                
                try:
                    detail_req = urllib.request.Request(detail_url, headers={"User-Agent": "Mozilla/5.0"})
                    with urllib.request.urlopen(detail_req, timeout=15) as det_res:
                        detail_xml = det_res.read()
                        detail_root = ET.fromstring(detail_xml)
                        dtl_node = detail_root if detail_root.tag == 'wantedDtl' else detail_root.find('.//wantedDtl')
                        
                        if dtl_node is not None:
                            eligibility_dtl = dtl_node.find('tgtrDtlCn').text.strip() if dtl_node.find('tgtrDtlCn') is not None and dtl_node.find('tgtrDtlCn').text else ""
                            selection_crit = dtl_node.find('slctCritCn').text.strip() if dtl_node.find('slctCritCn') is not None and dtl_node.find('slctCritCn').text else ""
                            welfare_content = dtl_node.find('alwServCn').text.strip() if dtl_node.find('alwServCn') is not None and dtl_node.find('alwServCn').text else ""
                            
                            # Parse forms
                            for nested in dtl_node.findall('basfrmList'):
                                n_name = nested.find('servSeDetailNm').text if nested.find('servSeDetailNm') is not None else ''
                                n_url = nested.find('servSeDetailLink').text if nested.find('servSeDetailLink') is not None else ''
                                if n_name or n_url:
                                    download_forms.append({"name": n_name, "url": n_url})
                                    
                            # Parse methods
                            for nested in dtl_node.findall('applmetList'):
                                n_name = nested.find('servSeDetailNm').text if nested.find('servSeDetailNm') is not None else ''
                                n_url = nested.find('servSeDetailLink').text if nested.find('servSeDetailLink') is not None else ''
                                if n_name or n_url:
                                    apply_method.append({"step": n_name, "guide": n_url})
                                    
                            # Parse websites
                            for nested in dtl_node.findall('inqplHmpgReldList'):
                                n_name = nested.find('servSeDetailNm').text if nested.find('servSeDetailNm') is not None else ''
                                n_url = nested.find('servSeDetailLink').text if nested.find('servSeDetailLink') is not None else ''
                                if n_name or n_url:
                                    related_websites.append({"name": n_name, "url": n_url})
                                    
                            # Parse contacts
                            for nested in dtl_node.findall('inqplCtadrList'):
                                n_name = nested.find('servSeDetailNm').text if nested.find('servSeDetailNm') is not None else ''
                                n_url = nested.find('servSeDetailLink').text if nested.find('servSeDetailLink') is not None else ''
                                if n_name or n_url:
                                    inquiry_contacts.append({"name": n_name, "phone": n_url})
                except Exception as det_err:
                    print(f"  -> Detail fetch error: {det_err}")
                    
                # Region parsing
                region = "전국"
                if "마포구" in eligibility_dtl or "마포구" in category or "마포" in title:
                    region = "서울 마포구"
                elif "수원시" in eligibility_dtl or "수원시" in category or "수원" in title:
                    region = "경기 수원시"
                    
                # Translate descriptions
                desc_vi = translate_text(desc_text, 'vi')
                desc_zh = translate_text(desc_text, 'zh-CN')
                desc_en = translate_text(desc_text, 'en')
                
                source_url = item.find('servDtlLink').text if item.find('servDtlLink') is not None else 'https://www.bokjiro.go.kr'
                
                filtered_items.append({
                    "id": serv_id,
                    "title": title,
                    "category": category,
                    "region": region,
                    "sourceUrl": source_url,
                    "desc": {
                        "ko": desc_text,
                        "vi": desc_vi,
                        "zh": desc_zh,
                        "en": desc_en
                    },
                    "descOutline": desc_text,
                    "eligibilityDtl": eligibility_dtl,
                    "selectionCrit": selection_crit,
                    "welfareContent": welfare_content,
                    "trgterIndvdl": trg_val,
                    "lifeArray": life_val,
                    "onapPsbltYn": onap_psblt_yn,
                    "downloadForms": download_forms,
                    "applyMethod": apply_method,
                    "relatedWebsites": related_websites,
                    "inquiryContacts": inquiry_contacts
                })
                
        if len(filtered_items) > 0:
            with open(OUTPUT_JSON_PATH, 'w', encoding='utf-8') as f:
                json.dump(filtered_items, f, ensure_ascii=False, indent=4)
            print(f"Successfully cached {len(filtered_items)} live policies to {OUTPUT_JSON_PATH}")
            save_to_db(filtered_items)
        else:
            print("No matching multicultural policies found. Skipping cache update.")
            
    except Exception as e:
        import traceback
        traceback.print_exc()
        print(f"API fetch or parsing error: {e}")

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
