// ==========================================
// 1. GLOBAL STATE & TRANSLATIONS
// ==========================================
let currentLanguage = 'ko';
let activeProfile = {
    childAge: 8,
    incomeBracket: 80,
    region: '서울 마포구'
};

// Simple translations dictionary for basic layout strings
const translations = {
    ko: {
        welcomeTitle: "안녕하세요, 다온 부모님!",
        welcomeDesc: "오늘도 자녀들의 행복한 학교생활을 다온이 돕겠습니다.",
        statusBenefitLabel: "나의 맞춤 혜택",
        statusDocLabel: "서류 해독 및 분석",
        statusDocVal: "대기 중",
        helperSubtitle: "가정통신문, 안내장 등을 입력하거나 업로드하면 한국 문화적 배경과 함께 모국어로 쉽게 설명합니다.",
        btnPhoto: "사진 촬영/업로드",
        btnAnalyze: "다온 AI RAG 분석 실행",
        alertsSubtitle: "가족 구성 정보에 부합하는 새로운 지원 혜택이 복지로에 등록되면 모국어로 실시간 알림을 보냅니다.",
        navHome: "홈",
        navHelper: "서류 도우미",
        navAlerts: "맞춤 혜택",
        navProfile: "마이페이지",
        btnNext: "다음",
        btnStart: "다온 시작하기",
        
        // Onboarding Translations
        obTitle0: "다문화 가정을 위한<br>따뜻한 AI 비서, 다온",
        obDesc0: "우리 자녀들의 즐거운 학교생활과 지원 혜택을 다온이 맞춤형으로 챙겨 드릴게요.",
        obTitle1: "어떤 언어를<br>사용하시나요?",
        obDesc1: "선택하시는 모국어로 모든 안내가 즉시 번역됩니다.",
        obTitle2: "자녀는 몇 명<br>있으신가요?",
        obDesc2: "자녀 나이에 맞는 교육 정보와 보육 혜택을 매칭합니다.",
        obTitle3: "자녀의 상세 정보를<br>입력해 주세요",
        obDesc3: "각 아이의 나이와 성별을 선택해 주세요.",
        obTitle4: "가구의 소득 수준은<br>어떻게 되시나요?",
        obDesc4: "기준 중위소득별로 국가 보조금 자격 요건을 진단합니다.",
        btnObCc1: "1명",
        btnObCc2: "2명",
        btnObCc3: "3명 이상",
        btnObInc50: "기준 중위소득 50% 이하",
        btnObInc80: "기준 중위소득 80% 이하",
        btnObInc120: "기준 중위소득 120% 이하",
        btnObInc150: "기준 중위소득 150% 초과",
        childPrefix: "번째 자녀",
        placeholderAge: "나이(세)",
        counterUnit: "명"
    },
    vi: {
        welcomeTitle: "Xin chào phụ huynh Daon!",
        welcomeDesc: "Daon sẽ luôn đồng hành giúp con bạn có một cuộc sống học đường hạnh phúc.",
        statusBenefitLabel: "Quyền lợi của tôi",
        statusDocLabel: "Phân tích tài liệu",
        statusDocVal: "Đang chờ",
        helperSubtitle: "Nhập hoặc tải lên thư báo gia đình, thông báo trường học, AI sẽ giải thích dễ hiểu bằng tiếng mẹ đẻ kèm bối cảnh văn hóa Hàn Quốc.",
        btnPhoto: "Chụp ảnh/Tải lên",
        btnAnalyze: "Chạy phân tích Daon AI RAG",
        alertsSubtitle: "Khi có trợ cấp mới phù hợp với thông tin gia đình đăng ký trên Bokjiro, chúng tôi sẽ gửi thông báo thời gian thực bằng tiếng mẹ đẻ.",
        navHome: "Trang chủ",
        navHelper: "Trợ lý tài liệu",
        navAlerts: "Trợ cấp",
        navProfile: "Của tôi",
        btnNext: "Tiếp theo",
        btnStart: "Bắt đầu với Daon",
        
        // Onboarding Translations
        obTitle0: "Daon, Trợ lý AI ấm áp<br>cho các gia đình đa văn hóa",
        obDesc0: "Daon sẽ chăm sóc đời sống học đường và các lợi ích hỗ trợ của con bạn một cách cá nhân hóa.",
        obTitle1: "Bạn sử dụng<br>ngôn ngữ nào?",
        obDesc1: "Tất cả các thông tin hướng dẫn sẽ được dịch ngay sang tiếng mẹ đẻ của bạn.",
        obTitle2: "Bạn có bao nhiêu<br>người con?",
        obDesc2: "Chúng tôi khớp thông tin giáo dục và lợi ích chăm sóc phù hợp với độ tuổi của trẻ.",
        obTitle3: "Vui lòng nhập<br>thông tin chi tiết của con",
        obDesc3: "Vui lòng chọn độ tuổi và giới tính của từng bé.",
        obTitle4: "Mức thu nhập hộ gia đình<br>của bạn là bao nhiêu?",
        obDesc4: "Chúng tôi chẩn đoán điều kiện nhận trợ cấp quốc gia theo thu nhập trung bình chuẩn.",
        btnObCc1: "1 bé",
        btnObCc2: "2 bé",
        btnObCc3: "Từ 3 bé trở lên",
        btnObInc50: "Dưới 50% thu nhập trung bình chuẩn",
        btnObInc80: "Dưới 80% thu nhập trung bình chuẩn",
        btnObInc120: "Dưới 120% thu nhập trung bình chuẩn",
        btnObInc150: "Trên 150% thu nhập trung bình chuẩn",
        childPrefix: "Con thứ ",
        placeholderAge: "Tuổi (세)",
        counterUnit: "bé"
    },
    zh: {
        welcomeTitle: "您好，多稳家长！",
        welcomeDesc: "多稳（Daon）将全力协助您的孩子享受幸福的学校生活。",
        statusBenefitLabel: "我的定制福利",
        statusDocLabel: "文件解读与分析",
        statusDocVal: "等待中",
        helperSubtitle: "输入或上传家庭通讯、通知单等，AI将结合韩国文化背景用母语为您进行简单易懂的解释。",
        btnPhoto: "拍照/上传",
        btnAnalyze: "运行 Daon AI RAG 分析",
        alertsSubtitle: "当符合您家庭成员信息的新福利在Bokjiro（福利路）注册时，我们会用您的母语发送实时通知。",
        navHome: "首页",
        navHelper: "文件助手",
        navAlerts: "定制福利",
        navProfile: "个人中心",
        btnNext: "下一步",
        btnStart: "开始多稳",
        
        // Onboarding Translations
        obTitle0: "多稳 (Daon)，多文化家庭的<br>贴心 AI 秘书",
        obDesc0: "多稳将为您量身定制孩子的幸福学校生活与相关补助福利。",
        obTitle1: "您使用哪种<br>语言？",
        obDesc1: "所有指南信息将立即翻译为您选择의母语。",
        obTitle2: "您有几个<br>孩子？",
        obDesc2: "我们将匹配符合孩子年龄的育儿福利。",
        obTitle3: "请输入孩子<br>的详细信息",
        obDesc3: "请选择每个孩子的年龄和性别。",
        obTitle4: "您家庭的收入水平<br>大约是多少？",
        obDesc4: "我们根据基准中位数收入评估国家补贴的申请资格。",
        btnObCc1: "1个孩子",
        btnObCc2: "2个孩子",
        btnObCc3: "3个及以上",
        btnObInc50: "基准中位数收入 50% 以下",
        btnObInc80: "基准中位数收入 80% 이하",
        btnObInc120: "基准中位数收入 120% 以下",
        btnObInc150: "基准中位数收入 150% 以上",
        childPrefix: "个孩子",
        placeholderAge: "年龄 (岁)",
        counterUnit: "个"
    },
    en: {
        welcomeTitle: "Hello, Daon Parents!",
        welcomeDesc: "Daon is here to help your children have a happy and successful school life.",
        statusBenefitLabel: "My Benefits",
        statusDocLabel: "Document Analysis",
        statusDocVal: "Waiting",
        helperSubtitle: "Paste school notices or upload photos, and AI will interpret them in your native language with cultural context.",
        btnPhoto: "Take Photo/Upload",
        btnAnalyze: "Run Daon AI RAG Analysis",
        alertsSubtitle: "Get real-time alerts in your native language when new welfare benefits matching your family profile are registered.",
        navHome: "Home",
        navHelper: "Doc Helper",
        navAlerts: "Welfare",
        navProfile: "My Page",
        btnNext: "Next",
        btnStart: "Start Daon",
        
        // Onboarding Translations
        obTitle0: "Daon, a Warm AI Assistant<br>for Multicultural Families",
        obDesc0: "Daon will customize your children's school guidelines and matching welfare benefits.",
        obTitle1: "Which language<br>do you use?",
        obDesc1: "All instructions will be translated into your chosen native language instantly.",
        obTitle2: "How many children<br>do you have?",
        obDesc2: "We map educational resources and child-care subsidies to fit your children's ages.",
        obTitle3: "Please enter your<br>child's details",
        obDesc3: "Please specify the age and gender of each child.",
        obTitle4: "What is your household<br>income level?",
        obDesc4: "We evaluate eligibility for national subsidies based on median income.",
        btnObCc1: "1 Child",
        btnObCc2: "2 Children",
        btnObCc3: "3 or More",
        btnObInc50: "Under 50% of Median Income",
        btnObInc80: "Under 80% of Median Income",
        btnObInc120: "Under 120% of Median Income",
        btnObInc150: "Over 150% of Median Income",
        childPrefix: " Child",
        placeholderAge: "Age (yrs)",
        counterUnit: "Child(ren)"
    }
};

// ==========================================
// 2. MOCK DATA FOR SIMULATION
// ==========================================

// Mock RAG Knowledge Base (Vector Database emulation)
const mockKnowledgeBase = [
    {
        keyword: "실내화",
        category: "학교 생활",
        content: "한국의 초/중/고등학교에서는 교실 내부의 청결을 위해 운동화를 벗고 별도의 실내 슬리퍼나 실내용 신발(실내화)을 착용합니다. 일반적으로 흰색 천이나 고무 재질로 되어 있으며, 문구점이나 대형마트에서 쉽게 구입할 수 있습니다. 매주 금요일에 집으로 가져와 세탁한 후 월요일에 다시 가져갑니다."
    },
    {
        keyword: "주간학습안내",
        category: "학교 생활",
        content: "한 주 동안 학생들이 배울 교과 목차, 단원명, 준비물, 행사 일정이 적힌 안내장입니다. 대개 매주 금요일이나 월요일 아침에 배부(또는 알림장 어플에 등록)됩니다. 학부모는 매주 이를 확인하여 요일별 준비물을 미리 챙겨주어야 합니다."
    },
    {
        keyword: "급식 신청",
        category: "학교 생활",
        content: "한국 초등학교는 전면 무상급식이 많으나, 방학 중 급식이나 돌봄교실 급식, 혹은 우유 급식 등 특수한 급식의 경우 별도의 '신청서 및 동의서' 제출이 필요하며 기한 내 제출하지 않으면 급식이 제공되지 않을 수 있습니다."
    },
    {
        keyword: "수행평가",
        category: "성적/평가",
        content: "지필평가(시험) 외에 학생의 평소 수업 태도, 과제물, 실기 시험, 토론 활동 등을 평가하는 방식입니다. 초등학교에서는 수행평가 비중이 매우 높으므로 주간학습안내에 예고된 수행평가 일정에 맞춰 자녀가 과제나 준비물을 잘 준비하도록 지도해 주어야 합니다."
    },
    {
        keyword: "다문화보육료",
        category: "행정 서류",
        content: "대한민국 국적을 가진 다문화가정의 만 0~5세 아동이 어린이집을 이용할 경우 소득 수준과 관계없이 보육료를 지원하는 제도입니다. 주민등록등본 등의 다문화가정 증빙서류를 구비하여 관할 동 주민센터에 방문하거나 '복지로' 사이트에서 온라인으로 신청해야 지원받을 수 있습니다."
    }
];

// Mock Welfare Benefits Database (Bokjiro / Gov API emulation)
const mockWelfareDatabase = [
    {
        id: "w1",
        title: "다문화가정 자녀 입학준비금 지원",
        category: "교육지원",
        minAge: 7,
        maxAge: 8,
        maxIncome: 100,
        region: "서울 마포구",
        desc: {
            ko: "초등학교에 입학하는 다문화가정 자녀에게 책가방, 도서, 학용품 구입비 10만 원을 지원합니다.",
            vi: "Hỗ trợ 100.000 KRW chi phí mua cặp sách, sách và dụng cụ học tập cho con em gia đình đa văn hóa chuẩn bị vào lớp 1.",
            zh: "为即将升入小学的多文化家庭子女提供10万韩元的书包、图书和文具购买费用支持。",
            en: "Provides 100,000 KRW for backpacks, books, and stationery school supplies for multicultural family children entering elementary school."
        },
        eligibility: "소득 기준 중위 100% 이하, 만 7~8세 자녀를 둔 마포구 거주 다문화 가정"
    },
    {
        id: "w2",
        title: "다문화 아동 발달/바우처 지원 사업",
        category: "양육/돌봄",
        minAge: 2,
        maxAge: 12,
        maxIncome: 120,
        region: "전국",
        desc: {
            ko: "만 2세에서 12세 아동의 언어발달 및 기초 학습 지도를 지원하는 전문 교사 방문 서비스 및 바우처 카드를 발급합니다.",
            vi: "Phát hành thẻ voucher và dịch vụ giáo viên chuyên môn đến nhà dạy ngôn ngữ và học tập cơ bản cho trẻ em từ 2 đến 12 tuổi.",
            zh: "为2至12岁儿童发行代金券卡，并提供专业教师入户辅导语言和基础学习的服务。",
            en: "Issues voucher cards and provides visiting specialty teacher services for language development and basic learning tutoring for children aged 2-12."
        },
        eligibility: "소득 기준 중위 120% 이하, 만 2~12세 자녀를 둔 다문화 가정 (전국)"
    },
    {
        id: "w3",
        title: "다문화 가족 모국어 교육 교재 무료 배부",
        category: "문화/교육",
        minAge: 3,
        maxAge: 15,
        maxIncome: 150,
        region: "경기 수원시",
        desc: {
            ko: "부모와 자녀 간의 원활한 소통을 위해 이중언어(베트남어, 중국어 등) 동화책 및 교재를 무상 지원합니다.",
            vi: "Cung cấp miễn phí truyện tranh và sách giáo khoa song ngữ (tiếng Việt, tiếng Trung, v.v.) để hỗ trợ giao tiếp giữa cha mẹ và con cái.",
            zh: "免费提供双语（越南语、中文等）绘本及教材，促进父母与子女之间的顺畅交流。",
            en: "Free provision of bilingual (Vietnamese, Chinese, etc.) fairy tale books and textbooks to facilitate parent-child communication."
        },
        eligibility: "소득 기준 중위 150% 이하, 만 3~15세 자녀를 둔 수원시 거주 다문화 가정"
    },
    {
        id: "w4",
        title: "저소득 다문화가정 자녀 컴퓨터 보급 및 통신비 지원",
        category: "생활/경제",
        minAge: 6,
        maxAge: 18,
        maxIncome: 50,
        region: "전국",
        desc: {
            ko: "교육 격차 해소를 위해 가구당 교육용 PC 1대 무상 보급 및 매달 교육용 인터넷 요금을 지원합니다.",
            vi: "Cấp miễn phí 1 máy tính PC dùng cho học tập mỗi hộ gia đình và hỗ trợ cước internet học tập hàng tháng để xóa bỏ khoảng cách giáo dục.",
            zh: "为消除教育差距，每户免费普及1台教学电脑，并每月资助教育用网络宽带费用。",
            en: "Provides 1 free educational PC per household and supports monthly internet service fees to bridge the educational gap."
        },
        eligibility: "소득 기준 중위 50% 이하(기초/차상위 등), 만 6~18세 자녀를 둔 다문화 가정 (전국)"
    }
];

// Presets for Demo Simulation Buttons
const mockNoticeTemplates = {
    school: `[주간학습안내장 - 마포초등학교 1학년 2반]
일정: 5월 12일 (수) 봄 소풍 예정 (도시락 지참)
수행평가: 5월 14일 (금) 국어 받아쓰기 3회차 실시
알림 및 준비물: 
- 교실 내 청결을 위해 매일 실내화 지참할 것.
- 방학 중 늘봄교실 급식 신청서 동의 여부 체크 후 금요일까지 회신 바랍니다.`,
    
    admin: `[다문화 보육료 지원 신청 안내]
신청 대상: 만 0~5세 다문화가정 아동 (국적법에 따른 대한민국 국적 소지 아동)
지원 내용: 어린이집 보육료 지원 (소득 무관 전액)
신청 요령: 주민등록등본 1부 구비하여 동 주민센터 방문 혹은 복지로 사이트에서 신청 가능.`
};

// ==========================================
// 3. TAB CONTROLLER & NAVIGATION
// ==========================================
function switchTab(tabId, navElement = null) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show active tab
    document.getElementById(tabId).classList.add('active');
    
    // Update navigation active state
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    if (navElement) {
        navElement.classList.add('active');
    } else {
        // Find corresponding nav button if navigation was triggered programmatically
        let navIndex = 0;
        if (tabId === 'tab-home') navIndex = 0;
        else if (tabId === 'tab-helper') navIndex = 1;
        else if (tabId === 'tab-alerts') navIndex = 2;
        else if (tabId === 'tab-profile') navIndex = 3;
        
        const navItems = document.querySelectorAll('.nav-item');
        if (navItems[navIndex]) {
            navItems[navIndex].classList.add('active');
        }
    }
    
    // Scroll to top
    document.querySelector('.app-main').scrollTop = 0;
}

// ==========================================
// 4. LANGUAGE TRANSLATOR MODULE
// ==========================================
function changeLanguage(langCode) {
    if (!langCode || !translations[langCode]) {
        langCode = 'ko';
    }
    currentLanguage = langCode;
    
    // Update all text nodes that have corresponding dictionary translations
    const elements = {
        'txt-welcome-title': translations[langCode].welcomeTitle,
        'txt-welcome-desc': translations[langCode].welcomeDesc,
        'txt-status-benefit-label': translations[langCode].statusBenefitLabel,
        'txt-status-doc-label': translations[langCode].statusDocLabel,
        'txt-helper-subtitle': translations[langCode].helperSubtitle,
        'txt-btn-photo': translations[langCode].btnPhoto,
        'txt-btn-analyze': translations[langCode].btnAnalyze,
        'txt-alerts-subtitle': translations[langCode].alertsSubtitle,
        'nav-txt-home': translations[langCode].navHome,
        'nav-txt-helper': translations[langCode].navHelper,
        'nav-txt-alerts': translations[langCode].navAlerts,
        'nav-txt-profile': translations[langCode].navProfile,
        
        // Onboarding wizard texts
        'txt-ob-title-0': translations[langCode].obTitle0,
        'txt-ob-desc-0': translations[langCode].obDesc0,
        'txt-ob-title-1': translations[langCode].obTitle1,
        'txt-ob-desc-1': translations[langCode].obDesc1,
        'txt-ob-title-2': translations[langCode].obTitle2,
        'txt-ob-desc-2': translations[langCode].obDesc2,
        'txt-ob-title-3': translations[langCode].obTitle3,
        'txt-ob-desc-3': translations[langCode].obDesc3,
        'txt-ob-title-4': translations[langCode].obTitle4,
        'txt-ob-desc-4': translations[langCode].obDesc4,
        'btn-ob-inc-50': translations[langCode].btnObInc50,
        'btn-ob-inc-80': translations[langCode].btnObInc80,
        'btn-ob-inc-120': translations[langCode].btnObInc120,
        'btn-ob-inc-150': translations[langCode].btnObInc150,
        'txt-ob-counter-unit': translations[langCode].counterUnit
    };
    
    for (const [id, text] of Object.entries(elements)) {
        const el = document.getElementById(id);
        if (el) el.innerHTML = text; // Use innerHTML to preserve line breaks
    }
    
    // Auto translate current results if they are visible
    const helperResultCard = document.getElementById('helper-result-card');
    if (helperResultCard && !helperResultCard.classList.contains('hidden')) {
        updateRAGOutputText();
    }
    
    // Auto translate matching benefits if visible
    if (document.querySelectorAll('.benefit-card').length > 0) {
        renderMatchingBenefits();
    }
}

// ==========================================
// 5. RAG DOCUMENT HELPER ENGINE SIMULATION
// ==========================================
function loadMockData(type) {
    switchTab('tab-helper');
    document.getElementById('doc-text-input').value = mockNoticeTemplates[type];
}

function simulateOCR(input) {
    if (input.files && input.files[0]) {
        const overlay = document.getElementById('ocr-loading');
        overlay.classList.remove('hidden');
        
        // Emulate OCR processing delay
        setTimeout(() => {
            overlay.classList.add('hidden');
            // Inject dummy text matching a typical school letter
            document.getElementById('doc-text-input').value = `[알림장 - 마포초등학교 1학년]
제목: 방학 돌봄교실 안내 및 신청서 배부
- 급식 신청: 동의서 체크 후 5월 14일까지 행정실 제출.
- 준비물: 개인 물통 및 매일 신을 깨끗한 실내화 지참.`;
            
            triggerToast("OCR 성공", "이미지에서 한글 텍스트를 추출하였습니다.");
        }, 1500);
    }
}

// Simple text processing RAG pipeline simulation
let latestRetrievedKnowledge = [];
let latestInputText = "";

function runDocumentRAG() {
    const textInput = document.getElementById('doc-text-input').value.trim();
    if (!textInput) {
        alert("분석할 텍스트를 입력해 주세요.");
        return;
    }
    
    latestInputText = textInput;
    latestRetrievedKnowledge = [];
    
    // Show visualizer
    const visualizer = document.getElementById('rag-visualizer');
    visualizer.classList.remove('hidden');
    
    // Reset steps
    document.getElementById('step-ocr').classList.remove('active');
    document.getElementById('step-retrieve').classList.remove('active');
    document.getElementById('step-generate').classList.remove('active');
    document.getElementById('retrieved-data-box').style.display = "none";
    document.getElementById('helper-result-card').classList.add('hidden');
    
    // Step 1: OCR Complete
    setTimeout(() => {
        document.getElementById('step-ocr').classList.add('active');
        
        // Step 2: Retrieval (Similarity search in knowledge base)
        setTimeout(() => {
            document.getElementById('step-retrieve').classList.add('active');
            
            // Search keywords in Mock KB
            mockKnowledgeBase.forEach(kb => {
                if (textInput.includes(kb.keyword)) {
                    latestRetrievedKnowledge.push(kb);
                }
            });
            
            // Default fallback if no keywords matched
            if (latestRetrievedKnowledge.length === 0) {
                latestRetrievedKnowledge.push({
                    keyword: "가정통신문 기본수칙",
                    category: "학교 행정",
                    content: "한국 초등학교의 가정통신문은 중요한 마감 기한(일정, 서류 제출)과 개별 준비물이 핵심입니다. 기한을 어기면 참여가 누락될 수 있습니다."
                });
            }
            
            // Show retrieved knowledge
            const box = document.getElementById('retrieved-data-box');
            box.innerHTML = `<strong>지식 검색 성공 (${latestRetrievedKnowledge.length}건):</strong><br>` + 
                latestRetrievedKnowledge.map(k => `🔍 [${k.category}] ${k.keyword}: ${k.content.substring(0, 70)}...`).join('<br>');
            box.style.display = "block";
            
            // Step 3: Generation (Combined prompt creation and translation)
            setTimeout(() => {
                document.getElementById('step-generate').classList.add('active');
                
                setTimeout(() => {
                    updateRAGOutputText();
                    document.getElementById('helper-result-card').classList.remove('remove');
                    document.getElementById('helper-result-card').classList.remove('hidden');
                    document.getElementById('txt-status-doc-val').textContent = "분석 완료";
                    
                    // Smooth scroll to results
                    document.getElementById('helper-result-card').scrollIntoView({ behavior: 'smooth' });
                }, 800);
                
            }, 1200);
            
        }, 1200);
        
    }, 600);
}

function updateRAGOutputText() {
    const contentBox = document.getElementById('result-body-content');
    const langTag = document.getElementById('result-lang-tag');
    
    // Map lang code to UI label
    const langLabels = { ko: '한국어', vi: 'Tiếng Việt', zh: '中文', en: 'English' };
    langTag.textContent = langLabels[currentLanguage];
    
    // Pre-calculated high quality simulation translations
    let outputHTML = "";
    
    if (currentLanguage === 'vi') { // Vietnamese
        outputHTML = `
            <h4>📅 Tóm tắt lịch trình (Lịch trình quan trọng)</h4>
            <p><strong>Lịch trình:</strong> Kiểm tra các thông tin thời hạn nộp hồ sơ hoặc thời gian được đề xuất trong văn bản.</p>
            <ul>
                <li><strong>Hạn nộp đơn:</strong> Ngày 14 tháng 5 (Thứ Sáu) nộp lại tờ đồng ý cho Văn phòng hành chính trường học.</li>
                <li><strong>Sự kiện:</strong> Cần gửi đơn phản hồi đúng hạn để không ảnh hưởng đến việc phục vụ suất ăn cho trẻ trong thời gian nghỉ hè.</li>
            </ul>

            <h4>🎒 Đồ dùng cần chuẩn bị</h4>
            <ul>
                <li>Bình nước cá nhân của học sinh.</li>
                <li>Một đôi giày đi trong nhà (sil-nae-hwa) sạch sẽ để đi hàng ngày.</li>
            </ul>

            <div class="culture-note">
                <h5><i class="fa-solid fa-lightbulb"></i> Bối cảnh văn hóa Hàn Quốc (Thông tin hữu ích)</h5>
                <p><strong>Giày đi trong nhà (Sil-nae-hwa - 실내화):</strong> ${mockKnowledgeBase[0].content}</p>
                <p><strong>주간학습안내장 (Bảng hướng dẫn học tập hàng tuần):</strong> ${mockKnowledgeBase[1].content}</p>
            </div>
        `;
    } else if (currentLanguage === 'zh') { // Chinese
        outputHTML = `
            <h4>📅 重要日程摘要</h4>
            <p><strong>日程提醒:</strong> 仔细确认材料提交截止日期或通知中的关键时间点。</p>
            <ul>
                <li><strong>提交截止日:</strong> 5月14日（星期五）前将同意书填写后交至学校行政室。</li>
                <li><strong>备注事项:</strong> 请务必在截止日期前提交申请，否则可能会影响放学后托管班的餐食供应。</li>
            </ul>

            <h4>🎒 学生准备物品</h4>
            <ul>
                <li>学生个人水杯/水壶。</li>
                <li>每天上学必须携带一双干净的室内鞋（Sil-nae-hwa）。</li>
            </ul>

            <div class="culture-note">
                <h5><i class="fa-solid fa-lightbulb"></i> 韩国学校文化贴士</h5>
                <p><strong>室内鞋 (실내화):</strong> ${mockKnowledgeBase[0].content}</p>
                <p><strong>周间学习计划表 (주간학습안내):</strong> ${mockKnowledgeBase[1].content}</p>
            </div>
        `;
    } else if (currentLanguage === 'en') { // English
        outputHTML = `
            <h4>📅 Key Schedule Summary</h4>
            <p><strong>Checkpoints:</strong> Pay close attention to deadlines and special school schedules.</p>
            <ul>
                <li><strong>Submission Deadline:</strong> Return the signed consent form to the school administration office by May 14th (Friday).</li>
                <li><strong>Note:</strong> Timely response is critical to ensure school lunch during the vacation care program.</li>
            </ul>

            <h4>🎒 Student Preparation List</h4>
            <ul>
                <li>Personal drinking water bottle.</li>
                <li>Clean indoor shoes (Sil-nae-hwa) to wear inside the classroom daily.</li>
            </ul>

            <div class="culture-note">
                <h5><i class="fa-solid fa-lightbulb"></i> Cultural Context Explained</h5>
                <p><strong>Indoor Shoes (Sil-nae-hwa - 실내화):</strong> ${mockKnowledgeBase[0].content}</p>
                <p><strong>Weekly Learning Notice (주간학습안내):</strong> ${mockKnowledgeBase[1].content}</p>
            </div>
        `;
    } else { // Korean (Default)
        outputHTML = `
            <h4>📅 주요 일정 요약</h4>
            <ul>
                <li><strong>제출 마감:</strong> 5월 14일(금요일)까지 동의서 체크 후 행정실 제출 필수.</li>
                <li><strong>행사/안내:</strong> 늘봄교실 급식 신청에 동의해야 방학 중 급식이 원활히 제공됩니다.</li>
            </ul>

            <h4>🎒 등교 준비물</h4>
            <ul>
                <li>개인 휴대용 물통.</li>
                <li>매일 신을 수 있는 깨끗하게 세탁된 실내화.</li>
            </ul>

            <div class="culture-note">
                <h5><i class="fa-solid fa-lightbulb"></i> 다온 RAG 지식 매칭 정보</h5>
                <p><strong>실내화 문화:</strong> ${mockKnowledgeBase[0].content}</p>
                <p><strong>주간학습안내 정보:</strong> ${mockKnowledgeBase[1].content}</p>
            </div>
        `;
    }
    
    contentBox.innerHTML = outputHTML;
}

function copyResultText() {
    const text = document.getElementById('result-body-content').innerText;
    navigator.clipboard.writeText(text).then(() => {
        triggerToast("복사 완료", "분석 리포트 텍스트가 클립보드에 복사되었습니다.");
    });
}

// ==========================================
// 6. WELFARE ALGORITHM & MATCHING SIMULATION
// ==========================================
function simulateBenefitMatch(showToast = true) {
    activeProfile.childAge = parseInt(document.getElementById('prof-child-age').value) || 8;
    activeProfile.incomeBracket = parseInt(document.getElementById('prof-income').value) || 80;
    activeProfile.region = document.getElementById('prof-region').value;
    
    if (showToast) {
        triggerToast("매칭 완료", "가구원 프로필을 바탕으로 복지 데이터를 매칭했습니다.");
    }
    renderMatchingBenefits();
}

function renderMatchingBenefits() {
    const container = document.getElementById('matching-benefits-list');
    
    // Filter logic using user profile inputs
    const matched = mockWelfareDatabase.filter(benefit => {
        // 1. Age condition
        const ageMatch = activeProfile.childAge >= benefit.minAge && activeProfile.childAge <= benefit.maxAge;
        // 2. Income condition
        const incomeMatch = activeProfile.incomeBracket <= benefit.maxIncome;
        // 3. Regional condition (either '전국' or exact match)
        const regionMatch = benefit.region === "전국" || activeProfile.region.includes(benefit.region);
        
        return ageMatch && incomeMatch && regionMatch;
    });
    
    // Update main dashboard status card
    document.getElementById('txt-status-benefit-val').textContent = `${matched.length}건 매칭됨`;
    
    if (matched.length === 0) {
        container.innerHTML = `
            <div class="no-data">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <p>현재 조건에 부합하는 복지 혜택이 존재하지 않습니다.<br>(가구 조건 필터를 조절해 보세요.)</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = matched.map(benefit => `
        <div class="benefit-card">
            <span class="benefit-cat-tag">${benefit.category}</span>
            <h4>${benefit.title}</h4>
            <p class="benefit-desc">${benefit.desc[currentLanguage] || benefit.desc['ko']}</p>
            <div class="benefit-eligibility">
                <strong>대상 조건:</strong> ${benefit.eligibility}
            </div>
        </div>
    `).join('');
}

// ==========================================
// 7. MOCK PUSH NOTIFICATION SYSTEM (Web Push simulation)
// ==========================================
let notificationCount = 0;

function triggerMockPushNotification(type) {
    let mockBenefit = null;
    
    if (type === 'child_allowance') {
        mockBenefit = {
            title: "다문화가정 자녀 입학준비금 지원",
            body: {
                ko: "올해 입학한 자녀를 둔 학부모님 대상, 입학준비금 10만 원을 즉시 신청하세요!",
                vi: "Gửi phụ huynh có con học lớp 1 năm nay, hãy đăng ký nhận ngay 100.000 KRW tiền chuẩn bị nhập học!",
                zh: "针对今年入学的子女家长，请立即申请10万韩元的入学准备金！",
                en: "Apply immediately for the 100,000 KRW school entrance allowance for parents with children entering school this year!"
            }
        };
    } else {
        mockBenefit = {
            title: "다문화 아동 발달 바우처 지원",
            body: {
                ko: "만 2~12세 대상 언어 발달 교사 방문 및 학습 바우처 카드가 신규 개정되었습니다.",
                vi: "Thông báo sửa đổi mới về việc cấp thẻ voucher học tập và giáo viên ngôn ngữ đến nhà cho trẻ từ 2-12 tuổi.",
                zh: "针对2-12岁儿童的语言发育教师入户及学习代金券卡已全新修订。",
                en: "New revision for visiting language tutoring teacher and learning voucher cards for children aged 2-12."
            }
        };
    }
    
    // Add badge
    notificationCount++;
    const badge = document.getElementById('alert-badge');
    badge.textContent = notificationCount;
    badge.classList.remove('hidden');
    
    // Play sound simulation via Web Audio API
    playNotificationBeep();
    
    // Generate Toast UI
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'push-toast';
    
    // Render translation in toast
    const bodyText = mockBenefit.body[currentLanguage] || mockBenefit.body['ko'];
    
    toast.innerHTML = `
        <div class="toast-icon"><i class="fa-solid fa-bell-concierge"></i></div>
        <div class="toast-content" onclick="openBenefitFromToast()">
            <div class="toast-title">
                <span>Daon Alert (보조금24 실시간 매칭)</span>
                <span class="toast-time">지금</span>
            </div>
            <div class="toast-body">
                <strong>${mockBenefit.title}</strong><br>
                ${bodyText}
            </div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove(); event.stopPropagation();">&times;</button>
    `;
    
    container.appendChild(toast);
    
    // Auto-remove after 6 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 6000);
}

function openBenefitFromToast() {
    // Switch to active matching tab
    switchTab('tab-alerts');
    // Pre-fill profile to guarantee matching the child allowance / voucher
    document.getElementById('prof-child-age').value = 8;
    document.getElementById('prof-income').value = 80;
    simulateBenefitMatch();
    
    // Reset notification badge
    notificationCount = 0;
    document.getElementById('alert-badge').classList.add('hidden');
    
    // Remove toast
    const container = document.getElementById('toast-container');
    container.innerHTML = "";
}

function triggerToast(title, body) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'push-toast';
    toast.style.background = 'rgba(82, 120, 83, 0.95)'; // Primay matching green
    
    toast.innerHTML = `
        <div class="toast-icon"><i class="fa-solid fa-circle-check" style="color: #F9F07A;"></i></div>
        <div class="toast-content">
            <div class="toast-title">
                <span>${title}</span>
                <span class="toast-time">방금</span>
            </div>
            <div class="toast-body">${body}</div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove();">&times;</button>
    `;
    container.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 3500);
}

// Notification sound simulator using browser Web Audio API (so no external files are needed)
function playNotificationBeep() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5 note
        gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
        
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.35);
    } catch (e) {
        console.log("Audio play blocked by browser autoplay policy.");
    }
}

// ==========================================
// 8. TOSS-STYLE STEP-BY-STEP INTERACTIVE WIZARD CONTROLLER
// ==========================================
let onboardStep = 0;
let onboardData = {
    lang: null,        // Start with no selection
    childCount: 1,     // Starts with 1 child by default in counter UI
    children: [],
    income: null       // Start with no selection
};

// Wizard progress bar milestones
const progressMilestones = [20, 40, 60, 80, 100];

function updateOnboardProgress() {
    const fill = document.getElementById('onboard-progress-fill');
    if (fill) {
        fill.style.width = `${progressMilestones[onboardStep]}%`;
    }
}

function nextOnboardStep() {
    const currentStepEl = document.getElementById(`onboard-step-${onboardStep}`);
    const nextStepEl = document.getElementById(`onboard-step-${onboardStep + 1}`);
    const nextBtn = document.getElementById('btn-onboarding-next');
    
    // Step Validations (Manual Next Button Actions)
    if (onboardStep === 1) {
        if (!onboardData.lang) {
            alert(currentLanguage === 'ko' ? '사용하실 언어를 선택해 주세요.' : 
                  currentLanguage === 'vi' ? 'Vui lòng chọn ngôn ngữ của bạn.' :
                  currentLanguage === 'zh' ? '请选择您的语言。' : 'Please select your language.');
            return;
        }
    }
    
    if (onboardStep === 2) {
        if (!onboardData.childCount || onboardData.childCount < 1) {
            alert(currentLanguage === 'ko' ? '자녀의 수를 올바르게 지정해 주세요.' : 
                  currentLanguage === 'vi' ? 'Vui lòng chỉ định số lượng con của bạn.' :
                  currentLanguage === 'zh' ? '请正确指定您的孩子数量。' : 'Please specify the correct number of children.');
            return;
        }
    }
    
    if (onboardStep === 3) {
        // Validate children inputs are populated
        const rows = document.querySelectorAll('.child-input-row');
        let isValid = true;
        
        onboardData.children = [];
        rows.forEach((row, idx) => {
            const ageInput = row.querySelector('.child-age-input');
            const ageVal = parseInt(ageInput.value);
            const selectedGenderBtn = row.querySelector('.gender-btn.selected');
            
            if (isNaN(ageVal) || ageVal < 0 || ageVal > 19) {
                alert(`${idx + 1}번째 자녀의 나이(0~19세)를 올바르게 입력해 주세요.`);
                isValid = false;
                return;
            }
            
            if (!selectedGenderBtn) {
                alert(`${idx + 1}번째 자녀의 성별을 선택해 주세요.`);
                isValid = false;
                return;
            }
            
            onboardData.children.push({
                age: ageVal,
                gender: selectedGenderBtn.dataset.gender
            });
        });
        
        if (!isValid) return;
    }
    
    if (onboardStep === 4) {
        if (!onboardData.income) {
            alert(currentLanguage === 'ko' ? '가구 소득 수준을 선택해 주세요.' : 
                  currentLanguage === 'vi' ? 'Vui lòng chọn mức thu nhập hộ gia đình.' :
                  currentLanguage === 'zh' ? '请选择家庭收入水平。' : 'Please select your household income level.');
            return;
        }
        finishOnboarding();
        return;
    }
    
    // Animate Current Step Exit
    currentStepEl.classList.remove('active');
    currentStepEl.classList.add('exit');
    
    // Animate Next Step Entrance
    onboardStep++;
    nextStepEl.classList.remove('exit');
    nextStepEl.classList.add('active');
    
    // Update Progress Bar
    updateOnboardProgress();
    
    // Special Actions per step
    if (onboardStep === 3) {
        generateOnboardChildForms();
    }
    
    // Footer Button Text controller
    if (onboardStep === 4) {
        nextBtn.textContent = translations[currentLanguage].btnStart || "다온 시작하기";
    } else {
        nextBtn.textContent = translations[currentLanguage].btnNext || "다음";
    }
}

// Select Native Language Option (Step 1)
function selectOnboardLanguage(langCode) {
    onboardData.lang = langCode;
    
    // Toggle visual selected tags
    document.querySelectorAll('.lang-opt-btn').forEach(btn => {
        const text = btn.textContent.toLowerCase();
        if (
            (langCode === 'ko' && text.includes('한국어')) ||
            (langCode === 'vi' && text.includes('tiếng việt')) ||
            (langCode === 'zh' && text.includes('中文')) ||
            (langCode === 'en' && text.includes('english'))
        ) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });
    
    // Play sound & transition language instantly
    playNotificationBeep();
    changeLanguage(langCode);
}

// Toss-style +/- Child Count Counter Incrementor (Step 2)
function adjustOnboardChildCount(amount) {
    if (onboardData.childCount === null) {
        onboardData.childCount = 1;
    }
    let newCount = onboardData.childCount + amount;
    if (newCount < 1) newCount = 1;
    if (newCount > 10) newCount = 10; // Capped at 10 children max for security/layout limits
    
    onboardData.childCount = newCount;
    
    const countDisplay = document.getElementById('onboard-child-count-display');
    if (countDisplay) {
        countDisplay.textContent = newCount;
    }
    
    playNotificationBeep();
}

// Dynamically generate child input rows based on step 2 answer
function generateOnboardChildForms() {
    const container = document.getElementById('dynamic-children-inputs');
    container.innerHTML = "";
    
    // Clear and preset array
    onboardData.children = [];
    
    // Multi-language child titles generator based on language conventions
    function getChildLabel(index) {
        const order = index + 1;
        if (currentLanguage === 'vi') {
            return `Con thứ ${order}`; // Vietnamese: Con thứ 1, Con thứ 2
        } else if (currentLanguage === 'zh') {
            return `第 ${order} 个孩子`; // Chinese: 第 1 个孩子, 第 2 个孩子
        } else if (currentLanguage === 'en') {
            const suffix = order === 1 ? 'st' : order === 2 ? 'nd' : order === 3 ? 'rd' : 'th';
            return `${order}${suffix} Child`; // English: 1st Child, 2nd Child
        } else {
            return `${order}번째 자녀`; // Korean: 1번째 자녀, 2번째 자녀
        }
    }
    
    const placeholderText = translations[currentLanguage].placeholderAge || "나이(세)";
    
    for (let i = 0; i < onboardData.childCount; i++) {
        // Preset mock placeholder data
        onboardData.children.push({ age: 8, gender: '' });
        
        const row = document.createElement('div');
        row.className = 'child-input-row';
        row.innerHTML = `
            <div class="child-row-title"><i class="fa-solid fa-child-reaching"></i> ${getChildLabel(i)}</div>
            <div class="child-fields">
                <div class="child-age-field">
                    <input type="number" class="child-age-input" value="8" min="0" max="19" placeholder="${placeholderText}">
                </div>
                <div class="gender-toggle-group">
                    <button type="button" class="gender-btn male" data-gender="M" onclick="setChildGender(${i}, 'M', this)">
                        <i class="fa-solid fa-mars"></i>
                    </button>
                    <button type="button" class="gender-btn female" data-gender="F" onclick="setChildGender(${i}, 'F', this)">
                        <i class="fa-solid fa-venus"></i>
                    </button>
                </div>
            </div>
        `;
        container.appendChild(row);
    }
}

function setChildGender(childIdx, gender, element) {
    const parentRow = element.parentElement;
    parentRow.querySelectorAll('.gender-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    element.classList.add('selected');
    onboardData.children[childIdx].gender = gender;
    
    // Play light touch feedback beep
    playNotificationBeep();
}

// Select Household Income Option (Step 4)
function selectOnboardIncome(incomeVal) {
    onboardData.income = incomeVal;
    
    // Solve substring overlap highlight bug (e.g. 50 and 150 both highlighted) using strict ID mapping
    document.querySelectorAll('.income-opt-btn').forEach(btn => {
        if (btn.id === `btn-ob-inc-${incomeVal}`) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });
    
    playNotificationBeep();
}

function finishOnboarding() {
    const overlay = document.getElementById('onboarding-overlay');
    
    // Bind finalized variables into global states
    currentLanguage = onboardData.lang;
    
    // Primary child age maps to first child's input
    const primaryChildAge = onboardData.children[0] ? onboardData.children[0].age : 8;
    activeProfile.childAge = primaryChildAge;
    activeProfile.incomeBracket = onboardData.income;
    
    // Synchronize filters
    document.getElementById('global-lang').value = onboardData.lang;
    document.getElementById('prof-child-age').value = primaryChildAge;
    document.getElementById('prof-income').value = onboardData.income;
    
    // Trigger Match & translations
    changeLanguage(onboardData.lang);
    simulateBenefitMatch(false); // Silent calculation initially
    
    // Save to LocalStorage
    localStorage.setItem('daon_onboarded', 'true');
    localStorage.setItem('daon_lang', onboardData.lang);
    localStorage.setItem('daon_child_age', primaryChildAge);
    localStorage.setItem('daon_income', onboardData.income);
    localStorage.setItem('daon_children', JSON.stringify(onboardData.children)); // Stringify child details
    
    overlay.classList.add('fade-out');
    triggerToast("다온 가입 완료", "가족 프로필 맞춤 셋업이 완벽히 적용되었습니다.");
    
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 600);
}

function skipOnboarding() {
    // Skip fallback values
    onboardData.lang = 'ko';
    onboardData.children = [{ age: 8, gender: 'M' }];
    onboardData.income = 80;
    finishOnboarding();
}

function resetOnboarding() {
    const overlay = document.getElementById('onboarding-overlay');
    const nextBtn = document.getElementById('btn-onboarding-next');
    
    onboardStep = 0;
    localStorage.removeItem('daon_onboarded');
    
    // Reset wizard active layers
    document.querySelectorAll('.wizard-step').forEach((step, idx) => {
        step.classList.remove('exit');
        if (idx === 0) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
    
    // Reset selection indicators
    document.querySelectorAll('.lang-opt-btn, .income-opt-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Reset child count default to 1
    onboardData.childCount = 1;
    const countDisplay = document.getElementById('onboard-child-count-display');
    if (countDisplay) {
        countDisplay.textContent = "1";
    }
    
    // Reset progress
    updateOnboardProgress();
    nextBtn.textContent = translations[currentLanguage].btnNext || "다음";
    
    overlay.style.display = 'flex';
    setTimeout(() => {
        overlay.classList.remove('fade-out');
    }, 50);
    
    switchTab('tab-home');
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    try {
        // 1. Force Reset Onboarding via URL parameter (?reset=true)
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('reset') === 'true') {
            localStorage.removeItem('daon_onboarded');
            localStorage.removeItem('daon_lang');
            localStorage.removeItem('daon_child_age');
            localStorage.removeItem('daon_income');
            localStorage.removeItem('daon_children');
        }

        // Load configurations from cache
        const savedLang = localStorage.getItem('daon_lang') || 'ko';
        const savedAge = parseInt(localStorage.getItem('daon_child_age')) || 8;
        const savedIncome = parseInt(localStorage.getItem('daon_income')) || 80;
        
        currentLanguage = savedLang;
        activeProfile.childAge = savedAge;
        activeProfile.incomeBracket = savedIncome;
        
        const globalLangEl = document.getElementById('global-lang');
        if (globalLangEl) globalLangEl.value = savedLang;
        
        const profChildAgeEl = document.getElementById('prof-child-age');
        if (profChildAgeEl) profChildAgeEl.value = savedAge;
        
        const profIncomeEl = document.getElementById('prof-income');
        if (profIncomeEl) profIncomeEl.value = savedIncome;
        
        // Initial load setup
        changeLanguage(savedLang);
        simulateBenefitMatch(false);
        
        // Onboarding Check
        const hasOnboarded = localStorage.getItem('daon_onboarded');
        const overlay = document.getElementById('onboarding-overlay');
        if (overlay) {
            if (hasOnboarded === 'true') {
                overlay.style.display = 'none';
                overlay.classList.add('fade-out');
            } else {
                // Show onboarding starting state
                updateOnboardProgress();
            }
        }
    } catch (err) {
        console.error("Daon load initialization error:", err);
    }
});
