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
        // Navigation
        navHome: "홈",
        navAlerts: "혜택 피드",
        navProfile: "마이페이지",
        
        // General Welcome Panel
        welcomeTitle: "다문화 가정을 위한<br>따뜻한 AI 비서, 다온",
        welcomeDesc: "복지 신청 서류 번역부터 나에게 딱 맞는 혜택 알림까지, 다온이 한국 생활을 함께합니다.",
        
        // Tab Headers & Buttons
        helperSubtitle: "어려운 관공서 알림장이나 서류를 촬영하거나 텍스트를 입력해 보세요. 다온 AI가 알기 쉽게 번역하고 요약해 드립니다.",
        btnPhoto: "사진 촬영/업로드",
        btnAnalyze: "다온 AI RAG 분석 실행",
        alertsSubtitle: "가족 구성 정보에 부합하는 새로운 지원 혜택이 복지로에 등록되면 모국어로 실시간 알림을 보냅니다.",
        btnNext: "다음",
        btnStart: "다온 시작하기",
        homeFeedTitle: "실시간 복지로 지원 혜택 피드",
        homeFeedDesc: "전국의 다문화 가정을 위한 실시간 정부/지자체 복지 정책 목록입니다.",
        modalAgeLabel: "대상 연령",
        modalIncomeLabel: "소득 기준",
        modalRegionLabel: "거주 지역",
        modalEligTitle: "상세 지원 조건",
        modalLinkLabel: "공식 홈페이지 신청 바로가기",
        modalSourceLabel: "출처: 복지로 및 공식 기관",
        
        // Extra localization
        helperTitle: "RAG 서류·행정 도우미",
        helperInputTitle: "문서 분석 및 번역",
        ocrLoadingDesc: "이미지에서 한글 텍스트를 추출 중입니다 (OCR)...",
        helperLoadingDesc: "다온 AI가 문서를 해독하고 한국 문화적 맥락을 파악하고 있습니다...",
        reportTitle: "다온 AI 맞춤 분석 리포트",
        btnCopy: "복사하기",
        alertsTitle: "나의 맞춤 혜택 & 알림",
        profileSettingTitle: "가구 정보 설정 (Profile)",
        profileSettingDesc: "정확한 복지 혜택 매칭을 위해 아래 필터를 입력해 주세요.",
        labelChildAge: "자녀 나이 (세)",
        labelIncome: "소득분위 (기준 중위소득 %)",
        labelRegion: "거주 지역",
        btnSimulateMatch: "맞춤 혜택 매칭 시뮬레이션",
        pushTitle: "실시간 가상 신규 혜택 등록 알림",
        pushDesc: "복지로에 새로운 복지 제도가 등록되었을 때의 <strong>백그라운드 푸시 알림 작동</strong>을 테스트합니다.",
        btnTestPush1: "'다문화 교육입학금' 신설 알림 테스트",
        btnTestPush2: "'다문화 바우처 카드' 신설 알림 테스트",
        matchedBenefitsTitle: "매칭된 맞춤 혜택 목록",
        myprofileTitle: "마이 페이지 & 계정 정보",
        myprofileUsername: "다온 패밀리",
        settingGuide: "온보딩 가이드 다시 보기",
        settingSecurity: "보안 및 개인정보 관리",
        settingFeedback: "번역 품질 피드백 및 기여",
        settingApi: "공용 데이터 연동 관리 (보조금24 API)",
        
        optInc50: "50% 이하 (기초/차상위 등)",
        optInc80: "80% 이하 (교육지원금 등)",
        optInc120: "120% 이하 (다문화 보편지원 등)",
        optInc150: "150% 초과 (소득제한 초과)",
        optRegMapo: "서울특별시 마포구",
        optRegSuwon: "경기도 수원시",
        optRegNamdong: "인천광역시 남동구",
        optRegHaeundae: "부산광역시 해운대구",
        
        metaTarget: "대상",
        metaAgeUnit: "세",
        metaConditionLabel: "대상 조건",
        placeholderAge: "나이(세)",
        placeholderText: "여기에 학교 통신문 텍스트를 붙여넣거나 사진을 업로드해 주세요.\n예: '준비물: 실내화 지참. 5월 10일 주간안내장 서명 후 제출 바랍니다.'",
        ocrExtractText: "이미지에서 한글 텍스트를 추출 중입니다 (OCR)...",
        noMatchMessage: "현재 조건에 부합하는 복지 혜택이 존재하지 않습니다.<br>(가구 조건 필터를 조절해 보세요.)",
        noMatchHelp: "가구 정보 설정 후 '맞춤 혜택 매칭 시뮬레이션' 버튼을 클릭해 주세요.",
        
        // Onboarding Translations
        obTitle0: "다문화 가정을 위한<br>따뜻한 AI 비서, 다온",
        obDesc0: "다온은 어려운 관공서 서류 번역부터 우리 가족 맞춤형 혜택 정보 매칭까지 한국 생활의 든든한 동반자가 되어 줍니다.",
        obTitle1: "가장 편안한 언어를 선택해 주세요",
        obDesc1: "사용하시는 모국어에 맞춰 모든 혜택 정보와 안내장이 자동 번역되어 제공됩니다.",
        obTitle2: "자녀의 정보를 입력해 주세요",
        obDesc2: "아이의 연령에 꼭 맞는 아동 맞춤 혜택을 매칭합니다.",
        obTitle3: "가정의 월평균 소득을 입력해 주세요",
        obDesc3: "정부 복지 혜택 매칭을 위해 가구 전체의 월평균 소득을 만 원 단위로 적어주세요.",
        obAddChild: "자녀 추가하기",
        counterUnit: "명",
        methodPhotoLabel: "사진 업로드",
        methodTextLabel: "텍스트 직접 입력",
        uploadZoneTitle: "가정통신문 사진을 올려주세요",
        uploadZoneDesc: "클릭하여 앨범에서 선택하거나 카메라 촬영"
    },
    vi: {
        // Navigation
        navHome: "Trang chủ",
        navAlerts: "Bảng tin trợ cấp",
        navProfile: "Trang cá nhân",
        
        // General Welcome Panel
        welcomeTitle: "Daon, Trợ lý AI ấm áp<br>cho các gia đình đa văn hóa",
        welcomeDesc: "Từ dịch thuật hồ sơ hành chính đến thông báo trợ cấp phù hợp nhất cho bạn, Daon đồng hành cùng cuộc sống Hàn Quốc.",
        
        // Tab Headers & Buttons
        helperSubtitle: "Hãy chụp ảnh hoặc nhập văn bản các thông báo, tài liệu khó từ cơ quan công quyền. Daon AI sẽ dịch và tóm tắt một cách dễ hiểu.",
        btnPhoto: "Chụp ảnh/Tải lên",
        btnAnalyze: "Chạy phân tích Daon AI RAG",
        alertsSubtitle: "Khi chính sách phúc lợi mới phù hợp với thông tin gia đình được đăng ký trên Bokjiro, hệ thống sẽ gửi thông báo đẩy thời gian thực bằng ngôn ngữ mẹ đẻ.",
        btnNext: "Tiếp theo",
        btnStart: "Bắt đầu với Daon",
        homeFeedTitle: "Bảng tin trợ cấp thời gian thực Bokjiro",
        homeFeedDesc: "Danh sách chính sách phúc lợi chính phủ/địa phương thời gian thực dành cho các gia đình đa văn hóa.",
        modalAgeLabel: "Độ tuổi đối tượng",
        modalIncomeLabel: "Tiêu chuẩn thu nhập",
        modalRegionLabel: "Khu vực cư trú",
        modalEligTitle: "Điều kiện hỗ trợ chi tiết",
        modalLinkLabel: "Đến trang đăng ký chính thức",
        modalSourceLabel: "Nguồn: Bokjiro & Cơ quan chính thức",
        
        // Extra localization
        helperTitle: "Trợ lý Hành chính & Tài liệu RAG",
        helperInputTitle: "Phân tích và Dịch tài liệu",
        ocrLoadingDesc: "Đang trích xuất văn bản tiếng Hàn từ hình ảnh (OCR)...",
        helperLoadingDesc: "Daon AI đang giải mã tài liệu và tìm hiểu bối cảnh văn hóa Hàn Quốc...",
        reportTitle: "Báo cáo phân tích tùy chỉnh Daon AI",
        btnCopy: "Sao chép",
        alertsTitle: "Trợ cấp & Thông báo phù hợp của tôi",
        profileSettingTitle: "Thiết lập thông tin gia đình (Profile)",
        profileSettingDesc: "Vui lòng nhập các bộ lọc bên dưới để đối chiếu phúc lợi chính xác.",
        labelChildAge: "Tuổi của con (세)",
        labelIncome: "Mức thu nhập (% thu nhập trung bình chuẩn)",
        labelRegion: "Khu vực cư trú",
        btnSimulateMatch: "Mô phỏng đối chiếu trợ cấp phù hợp",
        pushTitle: "Thông báo đăng ký trợ cấp mới giả định thời gian thực",
        pushDesc: "Kiểm tra hoạt động của <strong>thông báo đẩy nền</strong> khi có chính sách phúc lợi mới được đăng ký trên Bokjiro.",
        btnTestPush1: "Kiểm tra thông báo 'Tiền mừng nhập học đa văn hóa'",
        btnTestPush2: "Kiểm tra thông báo 'Thẻ voucher đa văn hóa'",
        matchedBenefitsTitle: "Danh sách phúc lợi phù hợp đã khớp",
        myprofileTitle: "Trang cá nhân & Thông tin tài khoản",
        myprofileUsername: "Gia đình Daon",
        settingGuide: "Xem lại Hướng dẫn bắt đầu",
        settingSecurity: "Quản lý bảo mật & Thông tin cá nhân",
        settingFeedback: "Phản hồi và đóng góp chất lượng dịch",
        settingApi: "Quản lý liên kết dữ liệu công cộng (Bojogum24 API)",
        
        optInc50: "Dưới 50% (Hộ nghèo/cận nghèo v.v.)",
        optInc80: "Dưới 80% (Học bổng giáo dục v.v.)",
        optInc120: "Dưới 120% (Trợ cấp đa văn hóa v.v.)",
        optInc150: "Trên 150% (Vượt giới hạn thu nhập)",
        optRegMapo: "Quận Mapo, Seoul",
        optRegSuwon: "Thành phố Suwon, Gyeonggi",
        optRegNamdong: "Quận Namdong, Incheon",
        optRegHaeundae: "Quận Haeundae, Busan",
        
        metaTarget: "Đối tượng",
        metaAgeUnit: "tuổi",
        metaConditionLabel: "Điều kiện đối tượng",
        placeholderAge: "Tuổi (세)",
        placeholderText: "Vui lòng dán văn bản thư thông báo trường học hoặc tải lên ảnh tại đây.\nVí dụ: 'Chuẩn bị: Mang theo giày đi trong nhà. Xin vui lòng ký và nộp thư thông báo hàng tuần trước ngày 10 tháng 5.'",
        ocrExtractText: "Đang trích xuất văn bản tiếng Hàn từ hình ảnh (OCR)...",
        noMatchMessage: "Hiện tại không có trợ cấp phúc lợi nào phù hợp với điều kiện của bạn.<br>(Vui lòng điều chỉnh lại bộ lọc điều kiện gia đình.)",
        noMatchHelp: "Sau khi thiết lập thông tin gia đình, vui lòng nhấp vào nút 'Mô phỏng đối chiếu trợ cấp phù hợp'.",
        
        // Onboarding Translations
        obTitle0: "Daon, Trợ lý AI ấm áp<br>cho các gia đình đa văn hóa",
        obDesc0: "Daon sẽ là người bạn đồng hành đáng tin cậy trong cuộc sống ở Hàn Quốc, hỗ trợ từ dịch thuật tài liệu khó đến việc tìm kiếm trợ cấp phù hợp nhất cho gia đình bạn.",
        obTitle1: "Vui lòng lựa chọn ngôn ngữ bạn muốn sử dụng",
        obDesc1: "Tất cả thông tin trợ cấp và tài liệu dịch sẽ được hiển thị tự động bằng ngôn ngữ mẹ đẻ của bạn.",
        obTitle2: "Vui lòng nhập thông tin của con bạn",
        obDesc2: "Hệ thống sẽ đối chiếu thông tin giáo dục và trợ cấp phù hợp với số lượng và độ tuổi của trẻ.",
        obTitle3: "Vui lòng nhập thu nhập trung bình hàng tháng của gia đình bạn",
        obDesc3: "Vui lòng viết tổng thu nhập trung bình hàng tháng của gia đình bạn theo đơn vị 10.000 KRW để đối chiếu phúc lợi chính phủ.",
        obAddChild: "Thêm con",
        counterUnit: "trẻ",
        methodPhotoLabel: "Tải ảnh lên",
        methodTextLabel: "Nhập văn bản",
        uploadZoneTitle: "Tải ảnh thư báo lên",
        uploadZoneDesc: "Nhấp để chọn từ thư viện hoặc chụp ảnh"
    },
    zh: {
        // Navigation
        navHome: "首页",
        navAlerts: "福利推荐",
        navProfile: "个人主页",
        
        // General Welcome Panel
        welcomeTitle: "多稳 (Daon)，多文化家庭的<br>贴心 AI 秘书",
        welcomeDesc: "从翻译政府办事文件，到推荐最适合您家庭의福利通知，多稳与您的韩国生活一路相随。",
        
        // Tab Headers & Buttons
        helperSubtitle: "您可以拍摄难以理解 of 政府通知、公文或输入文本。多稳 AI 将结合韩国文化背景，用母语为您通俗易懂地翻译和解读。",
        btnPhoto: "拍摄照片/上传",
        btnAnalyze: "运行 Daon AI RAG 分析",
        alertsSubtitle: "当福利路注册了符合您家庭构成的新福利政策时，系统将以母语发送实时后台推送通知。",
        btnNext: "下一步",
        btnStart: "开始多稳",
        homeFeedTitle: "实时福利路政策推荐",
        homeFeedDesc: "面向全国多文化家庭的实时政府及地方自治团体福利政策列表。",
        modalAgeLabel: "目标年龄",
        modalIncomeLabel: "收入标准",
        modalRegionLabel: "居住地区",
        modalEligTitle: "详细资助条件",
        modalLinkLabel: "前往官方申请网站",
        modalSourceLabel: "来源: 福利路及官方机构",
        
        // Extra localization
        helperTitle: "RAG 文档·行政助手",
        helperInputTitle: "文档分析与翻译",
        ocrLoadingDesc: "正在从图像中提取韩文文本 (OCR)...",
        helperLoadingDesc: "多稳 AI 正在解读文档并分析韩国文化背景...",
        reportTitle: "多稳 (Daon) AI 定制分析报告",
        btnCopy: "复制",
        alertsTitle: "我的专属福利与通知",
        profileSettingTitle: "家庭信息设置 (Profile)",
        profileSettingDesc: "请输入以下筛选条件以进行准确的福利匹配。",
        labelChildAge: "子女年龄 (岁)",
        labelIncome: "收入分位 (基准中位数收入 %)",
        labelRegion: "居住地区",
        btnSimulateMatch: "专属福利匹配模拟",
        pushTitle: "实时模拟新福利注册通知",
        pushDesc: "测试当福利路注册新福利制度时的 **后台推送通知运行** 效果。",
        btnTestPush1: "测试“多文化入学祝贺金”新增通知",
        btnTestPush2: "测试“多文化代金券卡”新增通知",
        matchedBenefitsTitle: "匹配的专属福利列表",
        myprofileTitle: "个人主页 & 账号信息",
        myprofileUsername: "多稳家庭",
        settingGuide: "重新查看入门指南",
        settingSecurity: "安全与隐私管理",
        settingFeedback: "翻译质量反馈与贡献",
        settingApi: "公共数据关联管理 (补助金24 API)",
        
        optInc50: "50% 以下 (最低生活保障/次低收入等)",
        optInc80: "80% 以下 (教育补助金等)",
        optInc120: "120% 以下 (多文化普通支援等)",
        optInc150: "150% 以上 (超出收入限制)",
        optRegMapo: "首尔特别市麻浦区",
        optRegSuwon: "京畿道水原市",
        optRegNamdong: "仁川广域市南东区",
        optRegHaeundae: "釜山广域市海云台区",
        
        metaTarget: "对象",
        metaAgeUnit: "岁",
        metaConditionLabel: "申请条件",
        placeholderAge: "年龄 (岁)",
        placeholderText: "请在此处粘贴学校通知文字或上传照片。\n例如：'准备物：携带室内鞋。请在5月10日之前签字并提交周通知。'",
        ocrExtractText: "正在从图像中提取韩文文本 (OCR)...",
        noMatchMessage: "当前没有符合条件的福利政策。<br>(请调整家庭条件筛选器。)",
        noMatchHelp: "设置家庭信息后，请单击“专属福利匹配模拟”按钮。",
        
        // Onboarding Translations
        obTitle0: "多稳 (Daon)，多文化家庭的<br>贴心 AI 秘书",
        obDesc0: "无论是难懂的政府公文翻译，还是为您家庭精确匹配福利政策，多稳都会是您在韩国生活中的坚实伴侣。",
        obTitle1: "请选择您使用起来最舒服的语言",
        obDesc1: "所有福利政策及翻译公文都将自动以您的母语提供。",
        obTitle2: "请输入您子女的信息",
        obDesc2: "系统将匹配适合孩子年龄的教育信息与抚养福利。",
        obTitle3: "请输入家庭的月平均收入",
        obDesc3: "请填写您家庭的月平均总收入（以万韩元为单位），以便进行政府福利匹配。",
        obAddChild: "添加子女",
        counterUnit: "名",
        methodPhotoLabel: "上传照片",
        methodTextLabel: "直接输入文本",
        uploadZoneTitle: "请上传学校通知书照片",
        uploadZoneDesc: "点击选择相册 or 拍照"
    },
    en: {
        // Navigation
        navHome: "Home",
        navAlerts: "Benefits Feed",
        navProfile: "My Page",
        
        // General Welcome Panel
        welcomeTitle: "Daon, a Warm AI Assistant<br>for Multicultural Families",
        welcomeDesc: "From translating complex administration documents to matching customized benefits just for you, Daon accompanies your life in Korea.",
        
        // Tab Headers & Buttons
        helperSubtitle: "Take a picture of or paste text from government/school notices. Daon AI will translate and summarize them in your mother tongue along with cultural contexts.",
        btnPhoto: "Take Photo/Upload",
        btnAnalyze: "Run Daon AI RAG Analysis",
        alertsSubtitle: "When a new welfare benefit matching your family profile is registered on Bokjiro, a real-time push notification is sent in your native language.",
        btnNext: "Next",
        btnStart: "Start Daon",
        homeFeedTitle: "Real-time Bokjiro Welfare Feed",
        homeFeedDesc: "Real-time government & local municipality welfare policies list for multicultural families.",
        modalAgeLabel: "Target Age",
        modalIncomeLabel: "Income Criteria",
        modalRegionLabel: "Residential Area",
        modalEligTitle: "Detailed Eligibility",
        modalLinkLabel: "Apply on Official Website",
        modalSourceLabel: "Source: Bokjiro & Official Agencies",
        
        // Extra localization
        helperTitle: "RAG Document & Admin Helper",
        helperInputTitle: "Document Analysis & Translation",
        ocrLoadingDesc: "Extracting Korean text from image (OCR)...",
        helperLoadingDesc: "Daon AI is analyzing the document and identifying the Korean cultural context...",
        reportTitle: "Daon AI Custom Analysis Report",
        btnCopy: "Copy",
        alertsTitle: "My Personalized Benefits & Alerts",
        profileSettingTitle: "Household Profile Settings",
        profileSettingDesc: "Please enter the filters below for accurate welfare benefits matching.",
        labelChildAge: "Child Age (yrs)",
        labelIncome: "Income Bracket (Median Income %)",
        labelRegion: "Residential Area",
        btnSimulateMatch: "Simulate Benefits Matching",
        pushTitle: "Real-time Mock New Policy Push Notification",
        pushDesc: "Test the **background push notification functionality** when a new welfare policy is registered on Bokjiro.",
        btnTestPush1: "Test 'Multicultural School Entrance Allowance' Alert",
        btnTestPush2: "Test 'Multicultural Voucher Card' Alert",
        matchedBenefitsTitle: "Matched Personalized Benefits List",
        myprofileTitle: "My Profile & Account Info",
        myprofileUsername: "Daon Family",
        settingGuide: "Restart Onboarding Guide",
        settingSecurity: "Security & Privacy Settings",
        settingFeedback: "Translation Quality Feedback & Contribute",
        settingApi: "Public Data Integration (Bojogum24 API)",
        
        optInc50: "Under 50% (Low-income/Basic, etc.)",
        optInc80: "Under 80% (Education Grant, etc.)",
        optInc120: "Under 120% (Universal Support, etc.)",
        optInc150: "Over 150% (Exceeds Limits)",
        optRegMapo: "Mapo-gu, Seoul",
        optRegSuwon: "Suwon-si, Gyeonggi",
        optRegNamdong: "Namdong-gu, Incheon",
        optRegHaeundae: "Haeundae-gu, Busan",
        
        metaTarget: "Target",
        metaAgeUnit: "yrs old",
        metaConditionLabel: "Eligibility",
        placeholderAge: "Age (yrs)",
        placeholderText: "Please paste the school newsletter text or upload a photo here.\nExample: 'Preparation: Bring indoor shoes. Please sign and submit the weekly newsletter by May 10.'",
        ocrExtractText: "Extracting Korean text from image (OCR)...",
        noMatchMessage: "There are currently no welfare benefits matching your criteria.<br>(Please adjust the household profile filters.)",
        noMatchHelp: "Set household profile and click 'Simulate Benefits Matching' button.",
        
        // Onboarding Translations
        obTitle0: "Daon, a Warm AI Assistant<br>for Multicultural Families",
        obDesc0: "Daon will be a reliable companion for your life in Korea, supporting you from translating complex public documents to matching customized welfare benefits.",
        obTitle1: "Please choose your preferred language",
        obDesc1: "All welfare policies and translation reports will be served automatically in your mother tongue.",
        obTitle2: "Please enter your children's information",
        obDesc2: "We match childcare benefits and education info based on the number and age of your children.",
        obTitle3: "Please enter your family's monthly average income",
        obDesc3: "Please write your family's monthly average income in units of 10,000 KRW for government benefits matching.",
        obAddChild: "Add Child",
        counterUnit: "child"
    }};// Mock RAG Knowledge Base (Vector Database emulation)
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

// Global Welfare Benefits Database
let mockWelfareDatabase = [];

// Fallback hardcoded welfare benefits in case fetch fails
const fallbackWelfareDatabase = [
    {
        id: "w1",
        title: "다문화가정 자녀 입학준비금 지원 (오프라인)",
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
        title: "다문화 아동 발달/바우처 지원 사업 (오프라인)",
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
    }
];

// Fetch real welfare data from API or JSON file fallback
async function loadRealWelfareData() {
    try {
        let response = await fetch('/api/welfare');
        if (!response.ok) {
            console.warn("FastAPI DB fetch failed, falling back to static welfare_data.json");
            response = await fetch('welfare_data.json');
        }
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data && data.length > 0) {
            mockWelfareDatabase = data;
            console.log("Real welfare data loaded successfully. Total policies:", data.length);
        } else {
            mockWelfareDatabase = fallbackWelfareDatabase;
        }
    } catch (error) {
        console.warn("Using offline welfare fallback dataset due to:", error);
        mockWelfareDatabase = fallbackWelfareDatabase;
    }
}

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
        else if (tabId === 'tab-alerts') navIndex = 1;
        else if (tabId === 'tab-profile') navIndex = 2;
        
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

// Localized welfare field helper
function getLocalizedCategory(category, lang) {
    const map = {
        '교육지원': { ko: '교육지원', vi: 'Hỗ trợ giáo dục', zh: '教育支援', en: 'Education Support' },
        '보육/양육': { ko: '보육/양육', vi: 'Chăm sóc trẻ', zh: '托儿/抚养', en: 'Childcare/Rearing' },
        '출산/임신': { ko: '출산/임신', vi: 'Sinh sản/Mang thai', zh: '分娩/怀孕', en: 'Childbirth/Pregnancy' },
        '돌봄/상담': { ko: '돌봄/상담', vi: 'Chăm sóc/Tư vấn', zh: '看护/咨询', en: 'Care/Counseling' },
        '생활/경제': { ko: '생활/경제', vi: 'Đời sống/Kinh tế', zh: '生活/经济', en: 'Living/Economy' },
        '문화/교육': { ko: '문화/교육', vi: 'Văn hóa/Giáo dục', zh: '文化/教育', en: 'Culture/Education' },
        '현금(감면)': { ko: '현금(감면)', vi: 'Tiền mặt (Giảm giá)', zh: '现金 (减免)', en: 'Cash (Reduction)' },
        '현금': { ko: '현금', vi: 'Tiền mặt', zh: '现金', en: 'Cash' }
    };
    return (map[category] && map[category][lang]) ? map[category][lang] : category;
}

function getLocalizedRegion(region, lang) {
    const map = {
        '전국': { ko: '전국', vi: 'Toàn quốc', zh: '全国', en: 'Nationwide' },
        '서울 마포구': { ko: '서울 마포구', vi: 'Mapo-gu, Seoul', zh: '首尔麻浦区', en: 'Mapo-gu, Seoul' },
        '경기 수원시': { ko: '경기 수원시', vi: 'Suwon-si, Gyeonggi', zh: '京畿道水原市', en: 'Suwon-si, Gyeonggi' }
    };
    return (map[region] && map[region][lang]) ? map[region][lang] : region;
}

function changeLanguage(langCode) {
    if (!langCode || !translations[langCode]) {
        langCode = 'ko';
    }
    currentLanguage = langCode;
    
    // Update all text nodes that have corresponding dictionary translations
    const elements = {
        'txt-welcome-title': translations[langCode].welcomeTitle,
        'txt-welcome-desc': translations[langCode].welcomeDesc,
        'txt-helper-subtitle': translations[langCode].helperSubtitle,
        'txt-btn-photo': translations[langCode].btnPhoto,
        'txt-btn-analyze': translations[langCode].btnAnalyze,
        'txt-alerts-subtitle': translations[langCode].alertsSubtitle,
        'nav-txt-home': translations[langCode].navHome,
        'nav-txt-helper': translations[langCode].navHelper,
        'nav-txt-alerts': translations[langCode].navAlerts,
        'nav-txt-profile': translations[langCode].navProfile,
        'txt-home-feed-title': translations[langCode].homeFeedTitle,
        'txt-home-feed-desc': translations[langCode].homeFeedDesc,
        'txt-modal-age-label': translations[langCode].modalAgeLabel,
        'txt-modal-income-label': translations[langCode].modalIncomeLabel,
        'txt-modal-region-label': translations[langCode].modalRegionLabel,
        'txt-modal-elig-title': translations[langCode].modalEligTitle,
        'txt-modal-link-label': translations[langCode].modalLinkLabel,
        'txt-modal-source-label': translations[langCode].modalSourceLabel,
        
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
        'txt-ob-counter-unit': translations[langCode].counterUnit,
        'txt-ob-add-child': translations[langCode].obAddChild,
        
        // Newly added DOM text translations
        'txt-helper-title': translations[langCode].helperTitle,
        'txt-helper-input-title': translations[langCode].helperInputTitle,
        'txt-ocr-loading-desc': translations[langCode].ocrLoadingDesc,
        'txt-helper-loading-desc': translations[langCode].helperLoadingDesc,
        'txt-report-title': translations[langCode].reportTitle,
        'txt-btn-copy': translations[langCode].btnCopy,
        'txt-alerts-title': translations[langCode].alertsTitle,
        'txt-profile-setting-title': translations[langCode].profileSettingTitle,
        'txt-profile-setting-desc': translations[langCode].profileSettingDesc,
        'txt-label-child-age': translations[langCode].labelChildAge,
        'txt-label-income': translations[langCode].labelIncome,
        'txt-label-region': translations[langCode].labelRegion,
        'btn-simulate-match': '<i class="fa-solid fa-arrows-spin"></i> ' + translations[langCode].btnSimulateMatch,
        'txt-push-title': translations[langCode].pushTitle,
        'txt-push-desc': translations[langCode].pushDesc,
        'btn-test-push1': translations[langCode].btnTestPush1,
        'btn-test-push2': translations[langCode].btnTestPush2,
        'txt-matched-benefits-title': translations[langCode].matchedBenefitsTitle,
        'txt-myprofile-title': translations[langCode].myprofileTitle,
        'txt-myprofile-username': translations[langCode].myprofileUsername,
        'txt-setting-guide': '<i class="fa-solid fa-circle-info"></i> ' + translations[langCode].settingGuide,
        'txt-setting-security': '<i class="fa-solid fa-shield-halved"></i> ' + translations[langCode].settingSecurity,
        'txt-setting-feedback': '<i class="fa-solid fa-language"></i> ' + translations[langCode].settingFeedback,
        'txt-setting-api': '<i class="fa-solid fa-circle-nodes"></i> ' + translations[langCode].settingApi,
        'txt-method-photo-label': translations[langCode].methodPhotoLabel,
        'txt-method-text-label': translations[langCode].methodTextLabel,
        'txt-upload-zone-title': translations[langCode].uploadZoneTitle,
        'txt-upload-zone-desc': translations[langCode].uploadZoneDesc
    };
    
    for (const [id, text] of Object.entries(elements)) {
        const el = document.getElementById(id);
        if (el) el.innerHTML = text;
    }
    
    // Update select option translations
    const incomeSelect = document.getElementById('prof-income');
    if (incomeSelect) {
        incomeSelect.options[0].text = translations[langCode].optInc50;
        incomeSelect.options[1].text = translations[langCode].optInc80;
        incomeSelect.options[2].text = translations[langCode].optInc120;
        incomeSelect.options[3].text = translations[langCode].optInc150;
    }
    const regionSelect = document.getElementById('prof-region');
    if (regionSelect) {
        regionSelect.options[0].text = translations[langCode].optRegMapo;
        regionSelect.options[1].text = translations[langCode].optRegSuwon;
        regionSelect.options[2].text = translations[langCode].optRegNamdong;
        regionSelect.options[3].text = translations[langCode].optRegHaeundae;
    }
    
    // Update textarea placeholder
    const textInput = document.getElementById('doc-text-input');
    if (textInput) {
        textInput.placeholder = translations[langCode].placeholderText;
    }
    
    const helperResultCard = document.getElementById('helper-result-card');
    if (helperResultCard && !helperResultCard.classList.contains('hidden')) {
        updateRAGOutputText();
    }
    
    if (document.querySelectorAll('.benefit-card').length > 0) {
        renderMatchingBenefits();
    }
    
    renderWelfareFeed();
}

let currentUploadMethod = "photo"; // "photo" or "text"

function setUploadMethod(method) {
    currentUploadMethod = method;
    
    const btnPhoto = document.getElementById('btn-method-photo');
    const btnText = document.getElementById('btn-method-text');
    const containerPhoto = document.getElementById('method-photo-container');
    const containerText = document.getElementById('method-text-container');
    
    if (!btnPhoto || !btnText || !containerPhoto || !containerText) return;
    
    if (method === 'photo') {
        // Update tab buttons
        btnPhoto.classList.add('active');
        btnPhoto.style.backgroundColor = 'var(--bg-app)';
        btnPhoto.style.color = 'var(--toss-blue)';
        btnPhoto.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
        
        btnText.classList.remove('active');
        btnText.style.backgroundColor = 'transparent';
        btnText.style.color = 'var(--text-sub)';
        btnText.style.boxShadow = 'none';
        
        // Toggle containers
        containerPhoto.classList.remove('hidden');
        containerText.classList.add('hidden');
    } else {
        // Update tab buttons
        btnText.classList.add('active');
        btnText.style.backgroundColor = 'var(--bg-app)';
        btnText.style.color = 'var(--toss-blue)';
        btnText.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
        
        btnPhoto.classList.remove('active');
        btnPhoto.style.backgroundColor = 'transparent';
        btnPhoto.style.color = 'var(--text-sub)';
        btnPhoto.style.boxShadow = 'none';
        
        // Toggle containers
        containerPhoto.classList.add('hidden');
        containerText.classList.remove('hidden');
    }
}


// ==========================================
// 5. RAG DOCUMENT HELPER ENGINE SIMULATION
// ==========================================
let pendingTranslationFile = null;
let latestAnalysisResult = null;

function loadMockData(type) {
    switchTab('tab-home');
    setUploadMethod('text');
    document.getElementById('doc-text-input').value = mockNoticeTemplates[type];
}

function simulateOCR(input) {
    if (input.files && input.files[0]) {
        pendingTranslationFile = input.files[0];
        
        // Show Image Preview on main page upload zone
        const reader = new FileReader();
        reader.onload = function(e) {
            const previewContainer = document.getElementById('image-preview-container');
            const previewImg = document.getElementById('uploaded-image-preview');
            if (previewImg && previewContainer) {
                previewImg.src = e.target.result;
                previewContainer.classList.remove('hidden');
            }
        }
        reader.readAsDataURL(pendingTranslationFile);
        
        // Open confirmation modal
        const confirmModal = document.getElementById('confirm-translate-modal');
        if (confirmModal) {
            confirmModal.classList.remove('hidden');
        }
    }
}

function cancelImageTranslation() {
    pendingTranslationFile = null;
    const fileInput = document.getElementById('doc-file-upload');
    if (fileInput) fileInput.value = "";
    
    // Hide preview
    removeUploadedImage();
    
    const confirmModal = document.getElementById('confirm-translate-modal');
    if (confirmModal) {
        confirmModal.classList.add('hidden');
    }
}

async function proceedImageTranslation() {
    const confirmModal = document.getElementById('confirm-translate-modal');
    if (confirmModal) {
        confirmModal.classList.add('hidden');
    }
    
    if (!pendingTranslationFile) return;
    
    // Open report modal in loading state
    const reportModal = document.getElementById('translation-report-modal');
    const modalLoading = document.getElementById('report-modal-loading');
    const modalContent = document.getElementById('report-modal-content-container');
    
    if (reportModal) reportModal.classList.remove('hidden');
    if (modalLoading) modalLoading.classList.remove('hidden');
    if (modalContent) modalContent.classList.add('hidden');
    
    // Update language tag
    const langLabels = { ko: '한국어', vi: 'Tiếng Việt', zh: '中文', en: 'English' };
    const langTag = document.getElementById('report-modal-lang-tag');
    if (langTag) langTag.textContent = langLabels[currentLanguage];
    
    try {
        // 1. Run real OCR using backend API
        const formData = new FormData();
        formData.append("file", pendingTranslationFile);
        
        const ocrResponse = await fetch('/api/ocr', {
            method: 'POST',
            body: formData
        });
        
        if (!ocrResponse.ok) {
            throw new Error("OCR API failed");
        }
        
        const ocrData = await ocrResponse.json();
        const extractedText = ocrData.text || "";
        
        // Store in input area just in case
        document.getElementById('doc-text-input').value = extractedText;
        
        // 2. Run real RAG Analysis using backend API
        const analyzeFormData = new FormData();
        analyzeFormData.append("file", pendingTranslationFile);
        analyzeFormData.append("text", extractedText);
        analyzeFormData.append("lang", currentLanguage);
        
        const analyzeResponse = await fetch('/api/analyze', {
            method: 'POST',
            body: analyzeFormData
        });
        
        if (!analyzeResponse.ok) {
            throw new Error("RAG API failed");
        }
        
        const data = await analyzeResponse.json();
        latestAnalysisResult = data;
        
        // Render results inside modal content container
        renderReportModalResult(data);
        
        // Hide loading, show content
        if (modalLoading) modalLoading.classList.add('hidden');
        if (modalContent) modalContent.classList.remove('hidden');
        
        const statusDocValEl = document.getElementById('txt-status-doc-val');
        if (statusDocValEl) {
            statusDocValEl.textContent = "분석 완료";
        }
        
    } catch (error) {
        console.error("Image translation workflow failed:", error);
        triggerToast("분석 실패", "AI 분석 도중 서버 오류가 발생하였습니다. 시뮬레이션 결과로 대체합니다.", "error");
        
        // Fallback to simulation
        latestAnalysisResult = null;
        const fallbackData = getFallbackData(currentLanguage);
        renderReportModalResult(fallbackData);
        
        if (modalLoading) modalLoading.classList.add('hidden');
        if (modalContent) modalContent.classList.remove('hidden');
    }
}

function removeUploadedImage() {
    const fileInput = document.getElementById('doc-file-upload');
    if (fileInput) {
        fileInput.value = "";
    }
    
    const previewContainer = document.getElementById('image-preview-container');
    if (previewContainer) {
        previewContainer.classList.add('hidden');
    }
    
    const previewImg = document.getElementById('uploaded-image-preview');
    if (previewImg) {
        previewImg.src = "";
    }
    pendingTranslationFile = null;
}


// Simple text processing RAG pipeline simulation
let latestRetrievedKnowledge = [];
let latestInputText = "";

async function runDocumentRAG() {
    const textInput = document.getElementById('doc-text-input').value.trim();
    if (!textInput) {
        alert("분석할 텍스트를 입력해 주세요.");
        return;
    }
    
    latestInputText = textInput;
    
    // Open report modal in loading state
    const reportModal = document.getElementById('translation-report-modal');
    const modalLoading = document.getElementById('report-modal-loading');
    const modalContent = document.getElementById('report-modal-content-container');
    
    if (reportModal) reportModal.classList.remove('hidden');
    if (modalLoading) modalLoading.classList.remove('hidden');
    if (modalContent) modalContent.classList.add('hidden');
    
    // Update language tag
    const langLabels = { ko: '한국어', vi: 'Tiếng Việt', zh: '中文', en: 'English' };
    const langTag = document.getElementById('report-modal-lang-tag');
    if (langTag) langTag.textContent = langLabels[currentLanguage];
    
    try {
        const formData = new FormData();
        formData.append("text", textInput);
        formData.append("lang", currentLanguage);
        
        const response = await fetch('/api/analyze', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error("RAG API response error");
        }
        
        const data = await response.json();
        latestAnalysisResult = data;
        
        // Render results inside modal content container
        renderReportModalResult(data);
        
        // Hide loading, show content
        if (modalLoading) modalLoading.classList.add('hidden');
        if (modalContent) modalContent.classList.remove('hidden');
        
        const statusDocValEl = document.getElementById('txt-status-doc-val');
        if (statusDocValEl) {
            statusDocValEl.textContent = "분석 완료";
        }
    } catch (error) {
        console.error("Text analysis failed:", error);
        triggerToast("분석 실패", "AI 분석 도중 서버 오류가 발생하였습니다. 시뮬레이션 결과로 대체합니다.", "error");
        
        latestAnalysisResult = null;
        const fallbackData = getFallbackData(currentLanguage);
        renderReportModalResult(fallbackData);
        
        if (modalLoading) modalLoading.classList.add('hidden');
        if (modalContent) modalContent.classList.remove('hidden');
    }
}

function renderReportModalResult(data) {
    const contentBox = document.getElementById('report-modal-content-container');
    if (!contentBox) return;
    
    let outputHTML = "";
    
    // Core Summaries (Ordered: 1. Parent Submissions/Preparations, 2. Child Materials, 3. Key Schedule)
    outputHTML += data.submissions || "";
    outputHTML += data.materials || "";
    outputHTML += data.schedule || "";
    
    // Full Translation
    if (data.full_translation) {
        outputHTML += `
            <div style="margin-top: 10px; padding: 15px; background: rgba(0, 0, 0, 0.03); border-left: 4px solid var(--secondary); border-radius: 12px;">
                <h4 style="margin-top: 0; color: var(--text-main); font-weight: 700;"><i class="fa-solid fa-language"></i> 전체 번역본 (Full Translation)</h4>
                <p style="white-space: pre-wrap; line-height: 1.6; font-size: 0.95rem; margin: 0; color: var(--text-main);">${data.full_translation}</p>
            </div>
        `;
    }
    
    // Culture notes
    if (data.cultural_notes) {
        outputHTML += data.cultural_notes;
    }
    
    contentBox.innerHTML = outputHTML;
}

function closeTranslationReportModal() {
    const reportModal = document.getElementById('translation-report-modal');
    if (reportModal) {
        reportModal.classList.add('hidden');
    }
    
    // Reset file input and preview
    removeUploadedImage();
}

function copyReportText() {
    const data = latestAnalysisResult || getFallbackData(currentLanguage);
    if (!data) return;
    
    const textToCopy = `
[다온 AI 번역 분석 리포트]

1. 부모 제출 및 서명할 것
${stripHtml(data.submissions || "")}

2. 아이가 챙겨야 할 준비물
${stripHtml(data.materials || "")}

3. 핵심 일정 및 안내 사항
${stripHtml(data.schedule || "")}

4. 전체 번역본 (Full Translation)
${data.full_translation || ""}
    `.trim();
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        triggerToast("복사 성공", "번역 리포트 텍스트가 클립보드에 복사되었습니다.");
    }).catch(err => {
        console.error("Copy failed:", err);
        triggerToast("복사 실패", "클립보드 접근에 실패했습니다.", "error");
    });
}

function stripHtml(html) {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
}

function updateRAGOutputText() {
    if (latestAnalysisResult) {
        renderReportModalResult(latestAnalysisResult);
    } else {
        const fallbackData = getFallbackData(currentLanguage);
        renderReportModalResult(fallbackData);
    }
}

function getFallbackData(lang) {
    if (lang === 'vi') {
        return {
            submissions: `
                <div style="padding: 16px; background: rgba(239, 68, 68, 0.05); border-left: 4px solid #ef4444; border-radius: 12px; margin-bottom: 12px;">
                    <h4 style="margin: 0 0 8px 0; color: #ef4444; font-weight: 700;">✍️ Nộp hồ sơ và ký tên (Hạn nộp)</h4>
                    <p style="margin: 0; font-size: 0.95rem; line-height: 1.5;">Hạn nộp đơn đăng ký: ngày 14 tháng 5 (Thứ sáu) nộp lại cho văn phòng hành chính nhà trường.</p>
                </div>
            `,
            materials: `
                <div style="padding: 16px; background: rgba(245, 158, 11, 0.05); border-left: 4px solid #f59e0b; border-radius: 12px; margin-bottom: 12px;">
                    <h4 style="margin: 0 0 8px 0; color: #f59e0b; font-weight: 700;">🎒 Đồ dùng cần chuẩn bị</h4>
                    <ul style="margin: 0; padding-left: 20px; font-size: 0.95rem; line-height: 1.5;">
                        <li>Bình nước cá nhân</li>
                        <li>Giày đi trong lớp học (Sil-nae-hwa)</li>
                    </ul>
                </div>
            `,
            schedule: `
                <div style="padding: 16px; background: rgba(16, 185, 129, 0.05); border-left: 4px solid #10b981; border-radius: 12px; margin-bottom: 12px;">
                    <h4 style="margin: 0 0 8px 0; color: #10b981; font-weight: 700;">📅 Lịch trình chính</h4>
                    <p style="margin: 0; font-size: 0.95rem; line-height: 1.5;">Đăng ký lớp chăm sóc kỳ nghỉ hè và nộp khảo sát nhu cầu ăn trưa.</p>
                </div>
            `,
            full_translation: "Bảng thông báo lớp học - Trường tiểu học Mapo lớp 1\nTiêu đề: Hướng dẫn lớp chăm sóc kỳ nghỉ hè và phát đơn đăng ký\n- Đăng ký ăn trưa: Nộp đơn đồng ý cho văn phòng hành chính trước ngày 14 tháng 5.\n- Chuẩn bị: Mang theo bình nước cá nhân và giày đi trong nhà sạch sẽ mỗi ngày.",
            cultural_notes: `
                <div class="culture-note" style="padding: 16px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; margin-top: 12px;">
                    <h5 style="margin: 0 0 8px 0; color: #15803d; font-weight: 700;"><i class="fa-solid fa-lightbulb"></i> Bối cảnh văn hóa Hàn Quốc</h5>
                    <p style="margin: 0; font-size: 0.9rem; line-height: 1.5;"><strong>Giày đi trong nhà (Sil-nae-hwa - 실내화):</strong> ${mockKnowledgeBase[0].content}</p>
                </div>
            `
        };
    } else if (lang === 'zh') {
        return {
            submissions: `
                <div style="padding: 16px; background: rgba(239, 68, 68, 0.05); border-left: 4px solid #ef4444; border-radius: 12px; margin-bottom: 12px;">
                    <h4 style="margin: 0 0 8px 0; color: #ef4444; font-weight: 700;">✍️ 需要提交和签字的事项</h4>
                    <p style="margin: 0; font-size: 0.95rem; line-height: 1.5;">申请提交截止日期：5月14日（周五）之前交到学校行政室。</p>
                </div>
            `,
            materials: `
                <div style="padding: 16px; background: rgba(245, 158, 11, 0.05); border-left: 4px solid #f59e0b; border-radius: 12px; margin-bottom: 12px;">
                    <h4 style="margin: 0 0 8px 0; color: #f59e0b; font-weight: 700;">🎒 孩子们需要准备的物品</h4>
                    <ul style="margin: 0; padding-left: 20px; font-size: 0.95rem; line-height: 1.5;">
                        <li>个人水杯/水壶</li>
                        <li>干净的室内鞋</li>
                    </ul>
                </div>
            `,
            schedule: `
                <div style="padding: 16px; background: rgba(16, 185, 129, 0.05); border-left: 4px solid #10b981; border-radius: 12px; margin-bottom: 12px;">
                    <h4 style="margin: 0 0 8px 0; color: #10b981; font-weight: 700;">📅 核心日程及内容</h4>
                    <p style="margin: 0; font-size: 0.95rem; line-height: 1.5;">放学后托管班申请及午餐配送意向调查。</p>
                </div>
            `,
            full_translation: "[通知栏 - 麻浦小学 一年级]\n标题：暑期托管班指南及申请表发放\n- 申请午餐：确认同意书后，于5月14日之前提交至行政室。\n- 准备物：携带个人水杯和每天穿的干净室内鞋。",
            cultural_notes: `
                <div class="culture-note" style="padding: 16px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; margin-top: 12px;">
                    <h5 style="margin: 0 0 8px 0; color: #15803d; font-weight: 700;"><i class="fa-solid fa-lightbulb"></i> 韩国文化背景解释</h5>
                    <p style="margin: 0; font-size: 0.9rem; line-height: 1.5;"><strong>室内鞋 (Sil-nae-hwa - 실내화):</strong> ${mockKnowledgeBase[0].content}</p>
                </div>
            `
        };
    } else if (lang === 'en') {
        return {
            submissions: `
                <div style="padding: 16px; background: rgba(239, 68, 68, 0.05); border-left: 4px solid #ef4444; border-radius: 12px; margin-bottom: 12px;">
                    <h4 style="margin: 0 0 8px 0; color: #ef4444; font-weight: 700;">✍️ Submissions & Signatures (Deadlines)</h4>
                    <p style="margin: 0; font-size: 0.95rem; line-height: 1.5;">Consent submission deadline: Submit to the school administration office by May 14 (Friday).</p>
                </div>
            `,
            materials: `
                <div style="padding: 16px; background: rgba(245, 158, 11, 0.05); border-left: 4px solid #f59e0b; border-radius: 12px; margin-bottom: 12px;">
                    <h4 style="margin: 0 0 8px 0; color: #f59e0b; font-weight: 700;">🎒 Preparation Checklist for Kids</h4>
                    <ul style="margin: 0; padding-left: 20px; font-size: 0.95rem; line-height: 1.5;">
                        <li>Personal water bottle</li>
                        <li>Clean indoor shoes (Sil-nae-hwa)</li>
                    </ul>
                </div>
            `,
            schedule: `
                <div style="padding: 16px; background: rgba(16, 185, 129, 0.05); border-left: 4px solid #10b981; border-radius: 12px; margin-bottom: 12px;">
                    <h4 style="margin: 0 0 8px 0; color: #10b981; font-weight: 700;">📅 Key Schedule & Details</h4>
                    <p style="margin: 0; font-size: 0.95rem; line-height: 1.5;">Summer break care class application and meal service survey submission.</p>
                </div>
            `,
            full_translation: "[School Newsletter - Mapo Elementary School Grade 1]\nTitle: Summer Care Class Guide & Application Form Distribution\n- Lunch Application: Submit the consent form to the administration office by May 14.\n- Preparation: Personal water bottle and clean indoor shoes to wear every day.",
            cultural_notes: `
                <div class="culture-note" style="padding: 16px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; margin-top: 12px;">
                    <h5 style="margin: 0 0 8px 0; color: #15803d; font-weight: 700;"><i class="fa-solid fa-lightbulb"></i> Korean Cultural Context</h5>
                    <p style="margin: 0; font-size: 0.9rem; line-height: 1.5;"><strong>Indoor Shoes (Sil-nae-hwa - 실내화):</strong> ${mockKnowledgeBase[0].content}</p>
                </div>
            `
        };
    } else { // ko (Korean)
        return {
            submissions: `
                <div style="padding: 16px; background: rgba(239, 68, 68, 0.05); border-left: 4px solid #ef4444; border-radius: 12px; margin-bottom: 12px;">
                    <h4 style="margin: 0 0 8px 0; color: #ef4444; font-weight: 700;">✍️ 부모 제출 및 서명할 것</h4>
                    <p style="margin: 0; font-size: 0.95rem; line-height: 1.5;">급식 동의서 신청: 5월 14일(금)까지 행정실에 제출해 주세요.</p>
                </div>
            `,
            materials: `
                <div style="padding: 16px; background: rgba(245, 158, 11, 0.05); border-left: 4px solid #f59e0b; border-radius: 12px; margin-bottom: 12px;">
                    <h4 style="margin: 0 0 8px 0; color: #f59e0b; font-weight: 700;">🎒 아이가 챙겨야 할 준비물</h4>
                    <ul style="margin: 0; padding-left: 20px; font-size: 0.95rem; line-height: 1.5;">
                        <li>개인 물통</li>
                        <li>매일 신을 깨끗한 실내화</li>
                    </ul>
                </div>
            `,
            schedule: `
                <div style="padding: 16px; background: rgba(16, 185, 129, 0.05); border-left: 4px solid #10b981; border-radius: 12px; margin-bottom: 12px;">
                    <h4 style="margin: 0 0 8px 0; color: #10b981; font-weight: 700;">📅 핵심 일정 및 안내 사항</h4>
                    <p style="margin: 0; font-size: 0.95rem; line-height: 1.5;">방학 돌봄교실 신청서 안내 및 배부 관련 공지입니다.</p>
                </div>
            `,
            full_translation: "[알림장 - 마포초등학교 1학년]\n제목: 방학 돌봄교실 안내 및 신청서 배부\n- 급식 신청: 동의서 체크 후 5월 14일까지 행정실 제출.\n- 준비물: 개인 물통 및 매일 신을 깨끗한 실내화 지참.",
            cultural_notes: `
                <div class="culture-note" style="padding: 16px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; margin-top: 12px;">
                    <h5 style="margin: 0 0 8px 0; color: #15803d; font-weight: 700;"><i class="fa-solid fa-lightbulb"></i> 한국 학교 문화 팁</h5>
                    <p style="margin: 0; font-size: 0.9rem; line-height: 1.5;"><strong>실내화:</strong> ${mockKnowledgeBase[0].content}</p>
                </div>
            `
        };
    }
});
}

// ==========================================
// 6. WELFARE ALGORITHM & MATCHING SIMULATION
// ==========================================
function simulateBenefitMatch(showToast = true) {
    renderMatchingBenefits();
}

function renderMatchingBenefits() {
    const container = document.getElementById('matching-benefits-list');
    if (!container) return;
    
    const matched = mockWelfareDatabase;
    const lang = translations[currentLanguage] ? currentLanguage : 'ko';
    
    // Update main dashboard status card
    const statusBenefitValEl = document.getElementById('txt-status-benefit-val');
    if (statusBenefitValEl) {
        statusBenefitValEl.textContent = matched.length + " " + (lang === 'ko' ? '건 지원 가능' : (lang === 'vi' ? 'trợ cấp' : (lang === 'zh' ? '项 서비스' : 'benefits')));
    }
    
    if (matched.length === 0) {
        container.innerHTML = `
            <div class="no-data">
                <i class="fa-solid fa-spinner fa-spin"></i>
                <p>혜택 데이터를 불러오고 있습니다...</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = matched.map(benefit => `
        <div class="benefit-card">
            <span class="benefit-cat-tag">${getLocalizedCategory(benefit.category, lang)}</span>
            <h4>${benefit.title}</h4>
            <p class="benefit-desc">${benefit.desc[currentLanguage] || benefit.desc['ko']}</p>
            <div class="benefit-eligibility">
                <strong>상세 조건:</strong> ${benefit.eligibility}
            </div>
            ${benefit.sourceUrl ? `
                <div class="benefit-actions">
                    <a href="${benefit.sourceUrl}" target="_blank" class="btn-source-go">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i> ${translations[lang].modalSourceLabel}
                    </a>
                </div>
            ` : ''
            }
        </div>
    `).join('');
}

// Render real-time welfare policies vertically on the Welfare Feed Tab
function renderWelfareFeed() {
    const container = document.getElementById('welfare-list');
    if (!container) return;
    
    const lang = translations[currentLanguage] ? currentLanguage : 'ko';
    
    container.innerHTML = mockWelfareDatabase.map(benefit => `
        <div class="welfare-list-card" onclick="viewBenefitDetail('${benefit.id}')">
            <div class="card-header">
                <span class="benefit-cat-tag">${getLocalizedCategory(benefit.category, lang)}</span>
                ${benefit.sourceUrl ? `
                    <a href="${benefit.sourceUrl}" target="_blank" class="feed-source-link" onclick="event.stopPropagation();">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>` : ''
                }
            </div>
            <h4>${benefit.title}</h4>
            <p class="desc">${benefit.desc[lang] || benefit.desc['ko']}</p>
            <div class="meta-info">
                <span class="region-tag">${getLocalizedRegion(benefit.region, lang)}</span>
            </div>
        </div>
    `).join('');
}

// Navigate to benefits tab and auto-filter matching results
function viewBenefitDetail(benefitId) {
    const benefit = mockWelfareDatabase.find(b => b.id === benefitId);
    if (!benefit) return;
    
    const modal = document.getElementById('benefit-detail-modal');
    if (!modal) return;
    
    const lang = translations[currentLanguage] ? currentLanguage : 'ko';
    
    // Populate modal content
    document.getElementById('modal-benefit-cat').textContent = benefit.category;
    document.getElementById('modal-benefit-title').textContent = benefit.title;
    document.getElementById('modal-benefit-desc').textContent = benefit.desc[lang] || benefit.desc['ko'];
    

    
    // Region text format
    let regionText = benefit.region;
    if (benefit.region === '전국') {
        if (lang === 'vi') regionText = "Toàn quốc";
        else if (lang === 'zh') regionText = "全国";
        else if (lang === 'en') regionText = "Nationwide";
    }
    document.getElementById('modal-benefit-region').textContent = regionText;
    
    // Eligibility text format
    document.getElementById('modal-benefit-eligibility').textContent = benefit.eligibility;
    
    // Action Link
    const linkEl = document.getElementById('modal-benefit-link');
    const sourceUrlEl = document.getElementById('modal-benefit-source-url');
    const sourceWrapperEl = document.getElementById('modal-benefit-source-wrapper');
    
    if (benefit.sourceUrl) {
        linkEl.href = benefit.sourceUrl;
        linkEl.style.display = 'flex';
        
        sourceUrlEl.href = benefit.sourceUrl;
        sourceUrlEl.textContent = benefit.sourceUrl;
        sourceWrapperEl.style.display = 'flex';
    } else {
        linkEl.style.display = 'none';
        sourceWrapperEl.style.display = 'none';
    }
    
    // Open modal
    modal.classList.remove('hidden');
}

function closeWelfareModal(event = null) {
    const modal = document.getElementById('benefit-detail-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
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
    const childAgeEl = document.getElementById('prof-child-age');
    if (childAgeEl) childAgeEl.value = 8;
    
    const incomeValEl = document.getElementById('prof-income-val');
    if (incomeValEl) incomeValEl.value = 350; // 중위소득 80% 근사치인 350만원 셋팅
    
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
    children: [{ age: 8, gender: 'M' }], // Default 1 child
    income: null,      // Start with no selection
    rawIncome: 300
};

// Wizard progress bar milestones for 4 steps (0, 1, 2, 3)
const progressMilestones = [25, 50, 75, 100];

function updateOnboardProgress() {
    const fill = document.getElementById('onboard-progress-fill');
    if (fill) {
        fill.style.width = `${progressMilestones[onboardStep]}%`;
    }
}

// 2026 Median Income Calculator helper
function getMedianIncomePercent(incomeVal, familyCount) {
    const baseTable = {
        1: 256.4238,
        2: 419.9292,
        3: 535.9036,
        4: 649.4738,
        5: 755.6719,
        6: 855.5952,
        7: 951.5150
    };
    const count = Math.min(7, Math.max(1, familyCount));
    const base100 = baseTable[count];
    if (incomeVal <= base100 * 0.5) return 50;
    if (incomeVal <= base100 * 0.8) return 80;
    if (incomeVal <= base100 * 1.2) return 120;
    return 150;
}

// Calculate real-time onboarding income guide
function calculateOnboardIncomeGuide() {
    const inputEl = document.getElementById('onboard-income-val');
    const guideEl = document.getElementById('txt-ob-income-guide');
    if (!inputEl || !guideEl) return;
    
    const val = parseInt(inputEl.value) || 0;
    if (val <= 0) {
        guideEl.textContent = "";
        return;
    }
    
    const familyCount = 2 + (onboardData.children ? onboardData.children.length : 1);
    const baseTableExact = {
        1: 2564238,
        2: 4199292,
        3: 5359036,
        4: 6494738,
        5: 7556719,
        6: 8555952,
        7: 9515150
    };
    
    const count = Math.min(7, Math.max(1, familyCount));
    const base100Exact = baseTableExact[count];
    const base100TenThousand = base100Exact / 10000;
    const ratio = Math.round((val / base100TenThousand) * 100);
    const lang = currentLanguage || 'ko';
    const formattedIncome = base100Exact.toLocaleString();
    
    let text = "";
    if (lang === 'vi') {
        text = `Mức thu nhập trung bình 100% của hộ gia đình ${count} người là ${formattedIncome} KRW, và thu nhập của bạn tương đương khoảng ${ratio}%.`;
    } else if (lang === 'zh') {
        text = `${count}人家庭的100%基准中位数收入为 ${formattedIncome}韩元，您输入的收入约为 ${ratio}% 水平。`;
    } else if (lang === 'en') {
        text = `The 100% median income for a ${count}-person household is ${formattedIncome} KRW, and your entered income is approximately ${ratio}%.`;
    } else {
        text = `${count}인 가구의 100% 기준 중위소득은 ${formattedIncome}원이며, 입력하신 소득은 약 ${ratio}% 수준입니다.`;
    }
    guideEl.textContent = text;
}

// Keep selectOnboardIncome function for compatibility / fallback
function selectOnboardIncome(bracket) {
    onboardData.income = bracket;
}

// Render dynamic children input forms inside onboarding Step 2
function renderOnboardChildrenInputs() {
    const container = document.getElementById('dynamic-children-inputs');
    if (!container) return;
    
    const lang = currentLanguage || 'ko';
    
    container.innerHTML = onboardData.children.map((child, index) => {
        const isFirst = index === 0;
        
        return `
        <div class="onboard-child-card" data-index="${index}">
            <div class="onboard-child-card-header">
                <span>
                    <i class="fa-solid fa-child"></i> 
                    ${lang === 'vi' ? 'Con thứ ' + (index + 1) : (lang === 'zh' ? '第 ' + (index + 1) + ' 个子女' : (lang === 'en' ? (index + 1) + 'th Child' : (index + 1) + '번째 자녀'))}
                </span>
                ${!isFirst ? `
                    <button type="button" class="btn-delete-child" onclick="removeCustomOnboardChild(${index})">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                ` : ''}
            </div>
            
            <div class="form-group" style="margin-bottom: 8px;">
                <label>${lang === 'vi' ? 'Tuổi của con' : (lang === 'zh' ? '子女年龄' : (lang === 'en' ? 'Child Age' : '자녀 나이'))}</label>
                <div class="onboard-counter-wrapper" style="margin: 0; width: auto; max-width: 200px;">
                    <button type="button" class="btn-counter" onclick="adjustCustomChildAge(${index}, -1)"><i class="fa-solid fa-minus"></i></button>
                    <span class="counter-value">${child.age}</span>
                    <span class="counter-unit">${lang === 'vi' ? 'tuổi' : (lang === 'zh' ? '岁' : (lang === 'en' ? 'yrs' : '세'))}</span>
                    <button type="button" class="btn-counter" onclick="adjustCustomChildAge(${index}, 1)"><i class="fa-solid fa-plus"></i></button>
                </div>
            </div>
            
            <div class="form-group" style="margin-bottom: 0;">
                <label>${lang === 'vi' ? 'Giới tính' : (lang === 'zh' ? '性别' : (lang === 'en' ? 'Gender' : '성별'))}</label>
                <div class="gender-btn-group" style="display: flex; gap: 8px;">
                    <button type="button" class="btn btn-outline gender-btn ${child.gender === 'M' ? 'selected' : ''}" style="flex:1; padding: 8px;" onclick="updateOnboardChildGender(${index}, 'M')">
                        <i class="fa-solid fa-mars"></i> ${lang === 'vi' ? 'Nam' : (lang === 'zh' ? '男' : (lang === 'en' ? 'Boy' : '남아'))}
                    </button>
                    <button type="button" class="btn btn-outline gender-btn ${child.gender === 'F' ? 'selected' : ''}" style="flex:1; padding: 8px;" onclick="updateOnboardChildGender(${index}, 'F')">
                        <i class="fa-solid fa-venus"></i> ${lang === 'vi' ? 'Nữ' : (lang === 'zh' ? '女' : (lang === 'en' ? 'Girl' : '여아'))}
                    </button>
                </div>
            </div>
        </div>
        `;
    }).join('');
}

function adjustCustomChildAge(index, amount) {
    if (!onboardData.children[index]) return;
    let currentAge = onboardData.children[index].age;
    currentAge = Math.min(19, Math.max(0, currentAge + amount));
    onboardData.children[index].age = currentAge;
    renderOnboardChildrenInputs();
}

function updateOnboardChildGender(indexStr, gender) {
    const index = parseInt(indexStr);
    if (!onboardData.children[index]) return;
    onboardData.children[index].gender = gender;
    renderOnboardChildrenInputs();
}

function addCustomOnboardChild() {
    onboardData.children.push({ age: 8, gender: 'M' });
    renderOnboardChildrenInputs();
}

function removeCustomOnboardChild(index) {
    if (index === 0) return; // Cannot remove first child
    onboardData.children.splice(index, 1);
    renderOnboardChildrenInputs();
}

function nextOnboardStep() {
    const currentStepEl = document.getElementById(`onboard-step-${onboardStep}`);
    const nextStepEl = document.getElementById(`onboard-step-${onboardStep + 1}`);
    const nextBtn = document.getElementById('btn-onboarding-next');
    
    // Step Validations
    if (onboardStep === 1) {
        if (!onboardData.lang) {
            alert(currentLanguage === 'ko' ? '사용하실 언어를 선택해 주세요.' : 
                  currentLanguage === 'vi' ? 'Vui lòng chọn ngôn ngữ của bạn.' :
                  currentLanguage === 'zh' ? '请选择您的语言。' : 'Please select your language.');
            return;
        }
    }
    
    if (onboardStep === 2) {
        // Validate children list is non-empty and ages are valid
        if (!onboardData.children || onboardData.children.length === 0) {
            alert(currentLanguage === 'ko' ? '최소 1명 이상의 자녀 정보를 입력해야 합니다.' : 
                  currentLanguage === 'vi' ? 'Vui lòng nhập thông tin của ít nhất một trẻ.' :
                  currentLanguage === 'zh' ? '请至少输入一个孩子的信息。' : 'Please enter info for at least one child.');
            return;
        }
    }
    
    if (onboardStep === 3) {
        // Read raw monthly income input
        const incomeInput = document.getElementById('onboard-income-val');
        const incomeVal = parseInt(incomeInput ? incomeInput.value : "") || 0;
        if (incomeVal <= 0) {
            const warningMsg = currentLanguage === 'vi' ? 'Vui lòng nhập thu nhập hàng tháng.' : (currentLanguage === 'zh' ? '请输入月收入。' : (currentLanguage === 'en' ? 'Please enter monthly income.' : '가구 월평균 소득을 입력해 주세요.'));
            alert(warningMsg);
            return;
        }
        // Save computed bracket
        const familyCount = 2 + (onboardData.children ? onboardData.children.length : 1);
        onboardData.income = getMedianIncomePercent(incomeVal, familyCount);
        onboardData.rawIncome = incomeVal;
        
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
    if (onboardStep === 2) {
        renderOnboardChildrenInputs();
    }
    
    // Footer Button Text controller
    if (onboardStep === 3) {
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
    const incomeValEl = document.getElementById('prof-income-val');
    if (incomeValEl) {
        incomeValEl.value = onboardData.rawIncome || 300;
    }
    
    // Trigger Match & translations
    changeLanguage(onboardData.lang);
    simulateBenefitMatch(false); // Silent calculation initially
    
    // Save to LocalStorage
    localStorage.setItem('daon_onboarded', 'true');
    localStorage.setItem('daon_lang', onboardData.lang);
    localStorage.setItem('daon_child_age', primaryChildAge);
    localStorage.setItem('daon_income', onboardData.income);
    localStorage.setItem('daon_raw_income', onboardData.rawIncome || 300);
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
    onboardData.rawIncome = 300;
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
window.addEventListener('DOMContentLoaded', async () => {
    try {
        // Load real welfare data first
        await loadRealWelfareData();

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
        const savedRawIncome = parseInt(localStorage.getItem('daon_raw_income')) || 300;
        
        currentLanguage = savedLang;
        activeProfile.childAge = savedAge;
        activeProfile.incomeBracket = savedIncome;
        
        const globalLangEl = document.getElementById('global-lang');
        if (globalLangEl) globalLangEl.value = savedLang;
        
        const profChildAgeEl = document.getElementById('prof-child-age');
        if (profChildAgeEl) profChildAgeEl.value = savedAge;
        
        const profIncomeValEl = document.getElementById('prof-income-val');
        if (profIncomeValEl) profIncomeValEl.value = savedRawIncome;
        
        // Initial load setup
        changeLanguage(savedLang);
        simulateBenefitMatch(false);
        renderWelfareFeed();
        setUploadMethod('photo');
        
        // Onboarding Check
        const overlay = document.getElementById('onboarding-overlay');
        if (overlay) {
            overlay.style.display = 'none';
            overlay.classList.add('fade-out');
        }
    } catch (err) {
        console.error("Daon load initialization error:", err);
    }
});

// ==========================================
// 6. ADMIN DASHBOARD & LOGIN CONTROLLER
// ==========================================
let adminToken = "";

function openAdminLoginModal() {
    const modal = document.getElementById("admin-login-modal");
    if (modal) {
        modal.classList.remove("hidden");
        document.getElementById("admin-username").value = "";
        document.getElementById("admin-password").value = "";
        const errEl = document.getElementById("admin-login-error");
        if (errEl) {
            errEl.classList.add("hidden");
            errEl.innerText = "";
        }
    }
}

function closeAdminLoginModal(event) {
    if (event && event.target !== event.currentTarget) return;
    const modal = document.getElementById("admin-login-modal");
    if (modal) {
        modal.classList.add("hidden");
    }
}

async function submitAdminLogin() {
    const usernameEl = document.getElementById("admin-username");
    const passwordEl = document.getElementById("admin-password");
    const errorEl = document.getElementById("admin-login-error");
    
    if (!usernameEl || !passwordEl) return;
    
    const username = usernameEl.value.trim();
    const password = passwordEl.value;
    
    if (!username || !password) {
        if (errorEl) {
            errorEl.innerText = "아이디와 비밀번호를 모두 입력해 주세요.";
            errorEl.classList.remove("hidden");
        }
        return;
    }
    
    try {
        const response = await fetch("/api/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (response.ok && data.status === "success") {
            adminToken = data.token;
            closeAdminLoginModal();
            openAdminDashboardModal();
            await fetchAdminWelfareList();
        } else {
            if (errorEl) {
                errorEl.innerText = data.detail || "로그인 정보가 일치하지 않습니다.";
                errorEl.classList.remove("hidden");
            }
        }
    } catch (err) {
        console.error("Admin login error:", err);
        if (errorEl) {
            errorEl.innerText = "서버 연결에 실패했습니다.";
            errorEl.classList.remove("hidden");
        }
    }
}

function openAdminDashboardModal() {
    const modal = document.getElementById("admin-dashboard-modal");
    if (modal) {
        modal.classList.remove("hidden");
    }
}

function closeAdminDashboardModal(event) {
    if (event && event.target !== event.currentTarget) return;
    const modal = document.getElementById("admin-dashboard-modal");
    if (modal) {
        modal.classList.add("hidden");
    }
}

async function fetchAdminWelfareList() {
    const tbody = document.getElementById("admin-welfare-tbody");
    if (!tbody) return;
    
    tbody.innerHTML = `
        <tr>
            <td colspan="14" style="text-align: center; padding: 30px; color: var(--text-secondary);">
                <i class="fa-solid fa-spinner fa-spin" style="margin-right: 8px;"></i>데이터를 불러오는 중입니다...
            </td>
        </tr>
    `;
    
    try {
        const response = await fetch(`/api/admin/welfare?token=${adminToken}`);
        if (!response.ok) {
            throw new Error("Unauthorized or server error");
        }
        
        const list = await response.json();
        if (list.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="14" style="text-align: center; padding: 30px; color: var(--text-secondary);">
                        조회된 데이터가 없습니다.
                    </td>
                </tr>
            `;
            return;
        }
        
        let html = "";
        list.forEach(item => {
            html += `
                <tr style="border-bottom: 1px solid var(--border-color); white-space: nowrap;">
                    <td style="padding: 14px 16px; font-weight: 500; color: var(--text-secondary); font-family: monospace;">${item.id}</td>
                    <td style="padding: 14px 16px; font-weight: 600; color: var(--text-primary); max-width: 200px; overflow: hidden; text-overflow: ellipsis;" title="${item.title || ''}">${item.title || ''}</td>
                    <td style="padding: 14px 16px;"><span style="background-color: rgba(49, 130, 246, 0.08); color: var(--toss-blue); padding: 4px 8px; border-radius: 6px; font-size: 12px; font-weight: 600;">${item.category}</span></td>
                    <td style="padding: 14px 16px; text-align: center;">
                        <span style="background-color: ${item.onapPsbltYn === 'Y' ? 'rgba(52, 211, 153, 0.15)' : 'rgba(156, 163, 175, 0.15)'}; color: ${item.onapPsbltYn === 'Y' ? '#059669' : '#4b5563'}; padding: 4px 8px; border-radius: 6px; font-size: 12px; font-weight: 600;">
                            ${item.onapPsbltYn === 'Y' ? '온라인 가능' : '방문 신청'}
                        </span>
                    </td>
                    <td style="padding: 14px 16px; text-align: center; max-width: 150px; overflow: hidden; text-overflow: ellipsis;" title="${item.trgterIndvdl || ''}">${item.trgterIndvdl || '-'}</td>
                    <td style="padding: 14px 16px; text-align: center; max-width: 150px; overflow: hidden; text-overflow: ellipsis;" title="${item.lifeArray || ''}">${item.lifeArray || '-'}</td>
                    <td style="padding: 14px 16px;"><i class="fa-solid fa-location-dot" style="color: var(--toss-blue); margin-right: 4px;"></i>${item.region}</td>
                    <td style="padding: 14px 16px; max-width: 250px; overflow: hidden; text-overflow: ellipsis; cursor: help;" title="${item.desc?.ko || ''}">${item.desc?.ko || '-'}</td>
                    <td style="padding: 14px 16px; max-width: 250px; overflow: hidden; text-overflow: ellipsis; cursor: help;" title="${item.desc?.vi || ''}">${item.desc?.vi || '-'}</td>
                    <td style="padding: 14px 16px; max-width: 250px; overflow: hidden; text-overflow: ellipsis; cursor: help;" title="${item.desc?.zh || ''}">${item.desc?.zh || '-'}</td>
                    <td style="padding: 14px 16px; max-width: 250px; overflow: hidden; text-overflow: ellipsis; cursor: help;" title="${item.desc?.en || ''}">${item.desc?.en || '-'}</td>
                    <td style="padding: 14px 16px; max-width: 250px; overflow: hidden; text-overflow: ellipsis; cursor: help;" title="${item.eligibilityDtl || ''}">${item.eligibilityDtl || '-'}</td>
                    <td style="padding: 14px 16px; text-align: center;">
                        ${item.sourceUrl ? `<a href="${item.sourceUrl}" target="_blank" style="color: var(--toss-blue); text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;"><i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 12px;"></i> 바로가기</a>` : '-'}
                    </td>
                    <td style="padding: 14px 16px; color: var(--text-secondary); font-size: 13px;">${item.updatedAt || '-'}</td>
                </tr>
            `;
        });
        tbody.innerHTML = html;
    } catch (err) {
        console.error("Fetch admin welfare list error:", err);
        tbody.innerHTML = `
            <tr>
                <td colspan="14" style="text-align: center; padding: 30px; color: var(--toss-red); font-weight: 500;">
                    <i class="fa-solid fa-circle-exclamation" style="margin-right: 8px;"></i>데이터 로딩 오류: 권한이 없거나 서버와의 통신에 실패했습니다.
                </td>
            </tr>
        `;
    }
}

