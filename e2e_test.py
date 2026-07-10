import urllib.request
import urllib.parse
import json
import sys
import ssl

def test_frontend():
    print("Testing Frontend (port 8400)...")
    try:
        url = "https://localhost/"
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req, timeout=5, context=ssl._create_unverified_context()) as res:
            status = res.status
            if status == 200:
                print("✅ Pass: Frontend is up and running (200 OK)")
                return True
            else:
                print(f"❌ Fail: Frontend returned status {status}")
                return False
    except Exception as e:
        print(f"❌ Fail: Frontend connection error: {e}")
        return False

def test_db_welfare_api():
    print("\nTesting Database Welfare API (/api/welfare)...")
    try:
        url = "https://localhost/api/welfare"
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req, timeout=5, context=ssl._create_unverified_context()) as res:
            status = res.status
            if status == 200:
                data = json.loads(res.read().decode('utf-8'))
                if isinstance(data, list) and len(data) > 0:
                    print(f"✅ Pass: Welfare API returned {len(data)} items from PostgreSQL")
                    return True
                else:
                    print("❌ Fail: Welfare API returned empty or invalid data format")
                    return False
            else:
                print(f"❌ Fail: Welfare API returned status {status}")
                return False
    except Exception as e:
        print(f"❌ Fail: Welfare API connection error: {e}")
        return False

def test_gemini_analyze_api():
    print("\nTesting Gemini Document Analysis API (/api/analyze)...")
    try:
        url = "https://localhost/api/analyze"
        # Test text
        post_data = urllib.parse.urlencode({
            'text': '[가정통신문]\n준비물: 실내화 지참.\n일정: 5월 10일 하교 시까지 행정실에 신청서 제출 바랍니다.',
            'lang': 'vi'
        }).encode('utf-8')
        
        req = urllib.request.Request(url, data=post_data, method='POST')
        with urllib.request.urlopen(req, timeout=20, context=ssl._create_unverified_context()) as res:
            status = res.status
            if status == 200:
                result = json.loads(res.read().decode('utf-8'))
                # Verify expected keys
                required_keys = ["extracted_text", "schedule", "materials", "submissions", "full_translation", "cultural_notes"]
                missing_keys = [k for k in required_keys if k not in result]
                if not missing_keys:
                    print("✅ Pass: Analyze API successfully translated and summarized document using Gemini API")
                    print(f"  - Extracted Text: {repr(result['extracted_text'][:60])}...")
                    print(f"  - Full Translation: {repr(result['full_translation'][:60])}...")
                    return True
                else:
                    print(f"❌ Fail: Analyze API is missing keys: {missing_keys}")
                    return False
            else:
                print(f"❌ Fail: Analyze API returned status {status}")
                return False
    except Exception as e:
        print(f"❌ Fail: Analyze API connection error: {e}")
        return False

def main():
    print("========================================")
    print("🚀 DAON SERVICE E2E INTEGRATION TEST 🚀")
    print("========================================")
    
    frontend_ok = test_frontend()
    welfare_ok = test_db_welfare_api()
    analyze_ok = test_gemini_analyze_api()
    
    print("\n========================================")
    if frontend_ok and welfare_ok and analyze_ok:
        print("🎉 ALL TESTS PASSED SUCCESSFULLY! 🎉")
        print("========================================")
        sys.exit(0)
    else:
        print("🚨 SOME TESTS FAILED. PLEASE CHECK LOGS. 🚨")
        print("========================================")
        sys.exit(1)

if __name__ == '__main__':
    main()
