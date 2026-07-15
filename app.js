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
        welcomeTitle: "AI 비서 다온",
        welcomeDesc: "",
        
        // Tab Headers & Buttons
        helperSubtitle: "",
        btnPhoto: "사진 촬영/업로드",
        btnAnalyze: "번역 시작",
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
        helperTitle: "가정통신문 번역하기",
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
        settingCoachmark: "앱 사용 가이드 다시 보기",
        settingSecurity: "보안 및 개인정보 관리",
        settingFeedback: "번역 품질 피드백 및 기여",
        settingApi: "공용 데이터 연동 관리 (보조금24 API)",
        settingAdmin: "관리자 대시보드 (조회)",
        adminLoginTitle: "관리자 로그인",
        adminUsernameLabel: "관리자 아이디",
        adminUsernamePlaceholder: "아이디를 입력하세요",
        adminPasswordLabel: "비밀번호",
        adminPasswordPlaceholder: "비밀번호를 입력하세요",
        adminLoginSubmit: "로그인",
        adminDashboardTitle: "다온 복지 혜택 관리자 대시보드",
        adminDashboardSubtitle: "welfare_benefits 테이블 데이터 실시간 조회 (조회 전용)",
        adminRefresh: "새로고침",
        adminClose: "닫기",
        thId: "ID",
        thTitle: "제목",
        thCategory: "카테고리",
        thOnline: "온라인 신청",
        thTarget: "대상자 분류",
        thLifecycle: "생애주기",
        thRegion: "지역",
        thDescKo: "설명 요약 (국문)",
        thDescVi: "설명 (베트남어)",
        thDescZh: "설명 (중국어)",
        thDescEn: "설명 (영어)",
        thEligKo: "상세 지원 대상 (한글 원문)",
        thLink: "원본 링크",
        thUpdated: "수정일시",
        reportLoadingTitle: "문서를 분석하는 중입니다",
        reportClose: "닫기",
        
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
        uploadZoneTitle: "사진 올리기",
        uploadZoneDesc: "여기를 눌러 사진 선택",
        uploadZoneTitleLoggedOut: "로그인 후 이용 가능합니다",
        uploadZoneDescLoggedOut: "여기를 눌러 로그인하기",
        confirmTitle: "이 이미지를 번역할까요?",
        confirmDesc: "다온 AI가 문서의 내용과 준비물을 파악하여 요약해 드립니다.",
        confirmNo: "아니요",
        confirmYes: "번역하기",
        historyTitle: "최근 기록",
        historyClear: "전체 삭제",
        historyEmpty: "아직 번역 분석 기록이 없습니다.",
        noAccount: "계정이 없으신가요?",
        goRegister: "회원가입",
        haveAccount: "이미 계정이 있으신가요?",
        goLogin: "로그인",
        orLabel: "또는",
        googleLoading: "Google 로그인 준비 중...",
        loginRequiredAlert: "사진 번역 기능을 이용하시려면 먼저 로그인해주세요.",
        privacyAgree: "개인정보 수집 및 이용 동의 [필수]",
        privacyPolicyNotice: "* 서비스 품질 개선 및 성능 측정을 위해 개인을 식별할 수 없는 익명화된 성능 데이터(분석 시간, 파일 크기 등)가 수집될 수 있습니다.",
        btnLogout: "로그아웃",
        btnLoginSubmit: "로그인",
        btnRegisterSubmit: "회원가입 완료",
        phUsername: "아이디 (ID)",
        phPassword: "비밀번호 (Password)",
        phName: "이름 (Full Name)",
        phEmail: "이메일 (Email)",
        phPasswordConfirm: "비밀번호 확인 (Confirm Password)"
    },
    vi: {
        // Navigation
        navHome: "Trang chủ",
        navAlerts: "Bảng tin trợ cấp",
        navProfile: "Trang cá nhân",
        
        // General Welcome Panel
        welcomeTitle: "Trợ lý AI Daon",
        welcomeDesc: "",
        
        // Tab Headers & Buttons
        helperSubtitle: "",
        btnPhoto: "Chụp ảnh/Tải lên",
        btnAnalyze: "Bắt đầu dịch",
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
        helperTitle: "Dịch thông báo trường",
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
        settingCoachmark: "Xem lại hướng dẫn sử dụng ứng dụng",
        settingSecurity: "Quản lý bảo mật & Thông tin cá nhân",
        settingFeedback: "Phản hồi và đóng góp chất lượng dịch",
        settingApi: "Quản lý liên kết dữ liệu công cộng (Bojogum24 API)",
        settingAdmin: "Bảng điều khiển quản trị (Xem)",
        adminLoginTitle: "Đăng nhập quản trị viên",
        adminUsernameLabel: "ID quản trị viên",
        adminUsernamePlaceholder: "Nhập ID",
        adminPasswordLabel: "Mật khẩu",
        adminPasswordPlaceholder: "Nhập mật khẩu",
        adminLoginSubmit: "Đăng nhập",
        adminDashboardTitle: "Bảng điều khiển phúc lợi Daon",
        adminDashboardSubtitle: "Truy vấn dữ liệu bảng welfare_benefits (Chỉ xem)",
        adminRefresh: "Làm mới",
        adminClose: "Đóng",
        thId: "ID",
        thTitle: "Tiêu đề",
        thCategory: "Thể loại",
        thOnline: "Đăng ký Online",
        thTarget: "Phân loại đối tượng",
        thLifecycle: "Vòng đời",
        thRegion: "Khu vực",
        thDescKo: "Tóm tắt (tiếng Hàn)",
        thDescVi: "Mô tả (tiếng Việt)",
        thDescZh: "Mô tả (tiếng Trung)",
        thDescEn: "Mô tả (tiếng Anh)",
        thEligKo: "Đối tượng chi tiết (Gốc)",
        thLink: "Link gốc",
        thUpdated: "Ngày cập nhật",
        reportLoadingTitle: "Đang phân tích tài liệu",
        reportClose: "Đóng",
        
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
        uploadZoneTitle: "Tải ảnh lên",
        uploadZoneDesc: "Nhấn vào đây để chọn ảnh",
        uploadZoneTitleLoggedOut: "Vui lòng đăng nhập để sử dụng",
        uploadZoneDescLoggedOut: "Nhấn vào đây để đăng nhập",
        confirmTitle: "Bạn có muốn dịch hình ảnh này không?",
        confirmDesc: "Daon AI sẽ phân tích nội dung tài liệu và tóm tắt các đồ dùng cần chuẩn bị.",
        confirmNo: "Không",
        confirmYes: "Dịch ngay",
        historyTitle: "Lịch sử gần đây",
        historyClear: "Xóa tất cả",
        historyEmpty: "Chưa có lịch sử dịch và phân tích.",
        noAccount: "Bạn chưa có tài khoản?",
        goRegister: "Đăng ký",
        haveAccount: "Bạn đã có tài khoản?",
        goLogin: "Đăng nhập",
        orLabel: "Hoặc",
        googleLoading: "Đang tải đăng nhập Google...",
        loginRequiredAlert: "Vui lòng đăng nhập trước để sử dụng tính năng dịch ảnh thông báo.",
        privacyAgree: "Đồng ý thu thập và sử dụng thông tin cá nhân [Bắt buộc]",
        privacyPolicyNotice: "* Để cải thiện chất lượng dịch vụ và đo lường hiệu suất, dữ liệu ẩn danh không thể nhận dạng cá nhân (thời gian phân tích, kích thước tệp, v.v.) có thể được thu thập.",
        btnLogout: "Đăng xuất",
        btnLoginSubmit: "Đăng nhập",
        btnRegisterSubmit: "Hoàn tất đăng ký",
        phUsername: "Tên đăng nhập (ID)",
        phPassword: "Mật khẩu (Password)",
        phName: "Họ và tên (Full Name)",
        phEmail: "Email",
        phPasswordConfirm: "Xác nhận mật khẩu (Confirm)"
    },
    zh: {
        // Navigation
        navHome: "首页",
        navAlerts: "福利推荐",
        navProfile: "个人主页",
        
        // General Welcome Panel
        welcomeTitle: "AI 秘书多稳",
        welcomeDesc: "",
        
        // Tab Headers & Buttons
        helperSubtitle: "",
        btnPhoto: "拍摄照片/上传",
        btnAnalyze: "开始翻译",
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
        helperTitle: "学校通知翻译",
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
        settingCoachmark: "重新查看应用使用指南",
        settingSecurity: "安全与隐私管理",
        settingFeedback: "翻译质量反馈与贡献",
        settingApi: "公共数据关联管理 (补助金24 API)",
        settingAdmin: "管理员仪表板 (查看)",
        adminLoginTitle: "管理员登录",
        adminUsernameLabel: "管理员账号",
        adminUsernamePlaceholder: "请输入账号",
        adminPasswordLabel: "密码",
        adminPasswordPlaceholder: "请输入密码",
        adminLoginSubmit: "登录",
        adminDashboardTitle: "多稳福利管理仪表板",
        adminDashboardSubtitle: "welfare_benefits 表数据实时查询 (仅查看)",
        adminRefresh: "刷新",
        adminClose: "关闭",
        thId: "ID",
        thTitle: "标题",
        thCategory: "分类",
        thOnline: "线上申请",
        thTarget: "对象分类",
        thLifecycle: "生命周期",
        thRegion: "地区",
        thDescKo: "摘要 (韩文)",
        thDescVi: "说明 (越南语)",
        thDescZh: "说明 (中文)",
        thDescEn: "说明 (英语)",
        thEligKo: "详细对象 (原文)",
        thLink: "原链接",
        thUpdated: "更新时间",
        reportLoadingTitle: "正在分析文档",
        reportClose: "关闭",
        
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
        uploadZoneTitle: "上传图片",
        uploadZoneTitleLoggedOut: "请先登录后使用",
        uploadZoneDesc: "点击此处选择图片",
        uploadZoneDescLoggedOut: "点击此处进行登录",
        confirmTitle: "是否翻译此图片？",
        confirmDesc: "多稳 AI 将分析文件内容并为您总结所需物品。",
        confirmNo: "取消",
        confirmYes: "翻译",
        historyTitle: "最近记录",
        historyClear: "全部删除",
        historyEmpty: "还没有翻译分析记录。",
        noAccount: "没有账号吗？",
        goRegister: "注册",
        haveAccount: "已经有账号吗？",
        goLogin: "登录",
        orLabel: "或者",
        googleLoading: "Google 登录载入中...",
        loginRequiredAlert: "请先登录以使用通知照片翻译功能。",
        privacyAgree: "同意收集及使用个人信息 [必填]",
        privacyPolicyNotice: "* 为了提高服务质量和测量性能，可能会收集无法识别个人身份的匿名数据（分析时间、文件大小等）。",
        btnLogout: "登出",
        btnLoginSubmit: "登录",
        btnRegisterSubmit: "完成注册",
        phUsername: "账号 (ID)",
        phPassword: "密码 (Password)",
        phName: "姓名 (Full Name)",
        phEmail: "电子邮件 (Email)",
        phPasswordConfirm: "确认密码 (Confirm)"
    },
    en: {
        // Navigation
        navHome: "Home",
        navAlerts: "Benefits Feed",
        navProfile: "My Page",
        
        // General Welcome Panel
        welcomeTitle: "AI Assistant Daon",
        welcomeDesc: "",
        
        // Tab Headers & Buttons
        helperSubtitle: "",
        btnPhoto: "Take Photo/Upload",
        btnAnalyze: "Start Translation",
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
        helperTitle: "Translate Notice",
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
        settingCoachmark: "Replay App Usage Guide",
        settingSecurity: "Security & Privacy Settings",
        settingFeedback: "Translation Quality Feedback & Contribute",
        settingApi: "Public Data Integration (Bojogum24 API)",
        settingAdmin: "Admin Dashboard (Read)",
        adminLoginTitle: "Admin Login",
        adminUsernameLabel: "Admin ID",
        adminUsernamePlaceholder: "Enter ID",
        adminPasswordLabel: "Password",
        adminPasswordPlaceholder: "Enter Password",
        adminLoginSubmit: "Login",
        adminDashboardTitle: "Daon Welfare Admin Dashboard",
        adminDashboardSubtitle: "welfare_benefits table real-time query (Read-only)",
        adminRefresh: "Refresh",
        adminClose: "Close",
        thId: "ID",
        thTitle: "Title",
        thCategory: "Category",
        thOnline: "Online Apply",
        thTarget: "Target Group",
        thLifecycle: "Life Cycle",
        thRegion: "Region",
        thDescKo: "Summary (KO)",
        thDescVi: "Description (VI)",
        thDescZh: "Description (ZH)",
        thDescEn: "Description (EN)",
        thEligKo: "Eligibility (KO)",
        thLink: "Source Link",
        thUpdated: "Updated At",
        reportLoadingTitle: "Analyzing document",
        reportClose: "Close",
        
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
        counterUnit: "child",
        methodPhotoLabel: "Upload Photo",
        methodTextLabel: "Enter Text",
        uploadZoneTitle: "Upload Photo",
        uploadZoneTitleLoggedOut: "Please log in first",
        uploadZoneDesc: "Tap here to select photo",
        uploadZoneDescLoggedOut: "Tap here to log in",
        confirmTitle: "Translate this image?",
        confirmDesc: "Daon AI will analyze the document and summarize the required items for you.",
        confirmNo: "Cancel",
        confirmYes: "Translate",
        historyTitle: "Recent History",
        historyClear: "Clear All",
        historyEmpty: "No translation history yet.",
        noAccount: "Don't have an account?",
        goRegister: "Sign Up",
        haveAccount: "Already have an account?",
        goLogin: "Log In",
        orLabel: "Or",
        googleLoading: "Loading Google Sign-in...",
        loginRequiredAlert: "Please log in first to use the notice photo translation feature.",
        privacyAgree: "Consent to Collection and Use of Personal Information [Required]",
        privacyPolicyNotice: "* To improve service quality and measure performance, anonymized performance data (analysis time, file size, etc.) that cannot identify individuals may be collected.",
        btnLogout: "Log Out",
        btnLoginSubmit: "Log In",
        btnRegisterSubmit: "Complete Sign Up",
        phUsername: "ID",
        phPassword: "Password",
        phName: "Full Name",
        phEmail: "Email",
        phPasswordConfirm: "Confirm Password"
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
        'txt-report-modal-title': translations[langCode].reportTitle,
        'txt-report-loading-title': translations[langCode].reportLoadingTitle,
        'txt-report-loading-desc': translations[langCode].helperLoadingDesc,
        'txt-report-copy': translations[langCode].btnCopy,
        'txt-report-close': translations[langCode].reportClose,
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
        'txt-myprofile-username': localStorage.getItem("daon_user_session")
            ? JSON.parse(localStorage.getItem("daon_user_session")).name
            : translations[langCode].myprofileUsername,
        'txt-setting-guide': '<i class="fa-solid fa-circle-info"></i> ' + translations[langCode].settingGuide,
        'txt-setting-coachmark': '<i class="fa-solid fa-hand-pointer"></i> ' + translations[langCode].settingCoachmark,
        'txt-setting-security': '<i class="fa-solid fa-shield-halved"></i> ' + translations[langCode].settingSecurity,
        'txt-setting-feedback': '<i class="fa-solid fa-language"></i> ' + translations[langCode].settingFeedback,
        'txt-setting-api': '<i class="fa-solid fa-circle-nodes"></i> ' + translations[langCode].settingApi,
        'txt-setting-admin': '<i class="fa-solid fa-user-shield"></i> ' + translations[langCode].settingAdmin,
        'txt-admin-login-title': translations[langCode].adminLoginTitle,
        'txt-admin-username-label': translations[langCode].adminUsernameLabel,
        'txt-admin-password-label': translations[langCode].adminPasswordLabel,
        'btn-admin-login-submit': translations[langCode].adminLoginSubmit,
        'txt-admin-dashboard-title': translations[langCode].adminDashboardTitle,
        'txt-admin-dashboard-subtitle': translations[langCode].adminDashboardSubtitle,
        'txt-admin-refresh': translations[langCode].adminRefresh,
        'btn-admin-close': translations[langCode].adminClose,
        'th-id': translations[langCode].thId,
        'th-title': translations[langCode].thTitle,
        'th-category': translations[langCode].thCategory,
        'th-online': translations[langCode].thOnline,
        'th-target': translations[langCode].thTarget,
        'th-lifecycle': translations[langCode].thLifecycle,
        'th-region': translations[langCode].thRegion,
        'th-desc-ko': translations[langCode].thDescKo,
        'th-desc-vi': translations[langCode].thDescVi,
        'th-desc-zh': translations[langCode].thDescZh,
        'th-desc-en': translations[langCode].thDescEn,
        'th-elig-ko': translations[langCode].thEligKo,
        'th-link': translations[langCode].thLink,
        'th-updated': translations[langCode].thUpdated,
        'txt-method-photo-label': translations[langCode].methodPhotoLabel,
        'txt-method-text-label': translations[langCode].methodTextLabel,
        'txt-upload-zone-title': (localStorage.getItem("daon_user_session") || userSessionToken)
            ? translations[langCode].uploadZoneTitle
            : (translations[langCode].uploadZoneTitleLoggedOut || translations[langCode].uploadZoneTitle),
        'txt-upload-zone-desc': (localStorage.getItem("daon_user_session") || userSessionToken)
            ? translations[langCode].uploadZoneDesc
            : (translations[langCode].uploadZoneDescLoggedOut || translations[langCode].uploadZoneDesc),
        'txt-confirm-title': translations[langCode].confirmTitle,
        'txt-confirm-desc': translations[langCode].confirmDesc,
        'txt-confirm-no': translations[langCode].confirmNo,
        'txt-confirm-yes': translations[langCode].confirmYes,
        'txt-history-title': translations[langCode].historyTitle,
        'txt-history-clear': translations[langCode].historyClear,
        'txt-no-account': translations[langCode].noAccount,
        'txt-go-register': translations[langCode].goRegister,
        'txt-have-account': translations[langCode].haveAccount,
        'txt-go-login': translations[langCode].goLogin,
        'txt-or-label': translations[langCode].orLabel,
        'txt-google-loading': translations[langCode].googleLoading,
        'txt-privacy-policy-notice': translations[langCode].privacyPolicyNotice,
        'btn-logout': translations[langCode].btnLogout,
        'btn-login-submit': translations[langCode].btnLoginSubmit,
        'btn-register-submit': translations[langCode].btnRegisterSubmit
    };
    
    for (const [id, text] of Object.entries(elements)) {
        const el = document.getElementById(id);
        if (el) el.innerHTML = text;
    }

    // Update photo upload zone icon depending on login state
    const isLogged = localStorage.getItem("daon_user_session") || userSessionToken;
    const uploadIcon = document.getElementById('icon-upload-zone');
    if (uploadIcon) {
        if (isLogged) {
            uploadIcon.className = 'fa-solid fa-cloud-arrow-up';
        } else {
            uploadIcon.className = 'fa-solid fa-lock';
        }
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
    
    // Update local auth input placeholders
    const loginUserEl = document.getElementById('auth-login-username');
    if (loginUserEl) loginUserEl.placeholder = translations[langCode].phUsername;
    
    const loginPassEl = document.getElementById('auth-login-password');
    if (loginPassEl) loginPassEl.placeholder = translations[langCode].phPassword;
    
    const regUserEl = document.getElementById('auth-reg-username');
    if (regUserEl) regUserEl.placeholder = translations[langCode].phUsername;
    
    const regNameEl = document.getElementById('auth-reg-name');
    if (regNameEl) regNameEl.placeholder = translations[langCode].phName;
    
    const regEmailEl = document.getElementById('auth-reg-email');
    if (regEmailEl) regEmailEl.placeholder = translations[langCode].phEmail;
    
    const regPassEl = document.getElementById('auth-reg-password');
    if (regPassEl) regPassEl.placeholder = translations[langCode].phPassword;
    
    const regPassConfirmEl = document.getElementById('auth-reg-password-confirm');
    if (regPassConfirmEl) regPassConfirmEl.placeholder = translations[langCode].phPasswordConfirm;

    // Update textarea placeholder
    const textInput = document.getElementById('doc-text-input');
    if (textInput) {
        textInput.placeholder = translations[langCode].placeholderText;
    }

    // Update admin login input placeholders
    const adminUsernameEl = document.getElementById('admin-username');
    if (adminUsernameEl) {
        adminUsernameEl.placeholder = translations[langCode].adminUsernamePlaceholder;
    }
    const adminPasswordEl = document.getElementById('admin-password');
    if (adminPasswordEl) {
        adminPasswordEl.placeholder = translations[langCode].adminPasswordPlaceholder;
    }
    
    const helperResultCard = document.getElementById('helper-result-card');
    if (helperResultCard && !helperResultCard.classList.contains('hidden')) {
        updateRAGOutputText();
    }
    
    if (document.querySelectorAll('.benefit-card').length > 0) {
        renderMatchingBenefits();
    }
    
    renderWelfareFeed();
    renderTranslationHistory();
}

let currentUploadMethod = "photo"; // "photo" or "text"

function setUploadMethod(method) {
    currentUploadMethod = method;
    
    const btnPhoto = document.getElementById('btn-method-photo');
    const btnText = document.getElementById('btn-method-text');
    const containerPhoto = document.getElementById('method-photo-container');
    const containerText = document.getElementById('method-text-container');
    const runBtn = document.getElementById('btn-run-rag-container');
    
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
        if (runBtn) runBtn.classList.add('hidden');
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
        if (runBtn) runBtn.classList.remove('hidden');
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
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const imgData = e.target.result;

            // Show Image Preview on main page upload zone
            const previewContainer = document.getElementById('image-preview-container');
            const previewImg = document.getElementById('uploaded-image-preview');
            if (previewImg && previewContainer) {
                previewImg.src = imgData;
                previewContainer.classList.remove('hidden');
            }

            // Show image inside the confirm modal
            const confirmModalImg = document.getElementById('confirm-modal-image-preview');
            if (confirmModalImg) {
                confirmModalImg.src = imgData;
            }

            // Open confirmation modal
            const confirmModal = document.getElementById('confirm-translate-modal');
            if (confirmModal) {
                confirmModal.classList.remove('hidden');
            }
        };
        reader.readAsDataURL(pendingTranslationFile);
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
    
    // Start step-by-step loading progress text updates
    startLoadingProgress(currentLanguage);
    
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
        
        // 2. Run real RAG Analysis using backend API - Send only text to avoid heavy image token cost
        const analyzeFormData = new FormData();
        analyzeFormData.append("text", extractedText);
        analyzeFormData.append("lang", currentLanguage);
        
        const session = localStorage.getItem("daon_user_session");
        if (session) {
            const userData = JSON.parse(session);
            analyzeFormData.append("username", userData.username || userData.email || "");
        }
        
        const analyzeResponse = await fetch('/api/analyze', {
            method: 'POST',
            body: analyzeFormData
        });
        
        if (!analyzeResponse.ok) {
            throw new Error("RAG API failed");
        }
        
        const data = await analyzeResponse.json();
        latestAnalysisResult = data;
        
        // Stop loading progress text updates
        stopLoadingProgress();
        
        // Render results inside modal content container
        renderReportModalResult(data);
        
        // Save to local storage history
        saveTranslationToHistory(extractedText, data, currentLanguage);
        
        // Hide loading, show content
        if (modalLoading) modalLoading.classList.add('hidden');
        if (modalContent) modalContent.classList.remove('hidden');
        
        const statusDocValEl = document.getElementById('txt-status-doc-val');
        if (statusDocValEl) {
            statusDocValEl.textContent = "분석 완료";
        }
        
    } catch (error) {
        console.error("Image translation workflow failed:", error);
        triggerToast("분석 실패", "AI 분석 도중 서버 오류가 발생하였습니다. API 설정 및 상태를 확인하세요.", "error");
        
        stopLoadingProgress();
        
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
        const msg = {
            ko: "분석할 텍스트를 입력해 주세요.",
            vi: "Vui lòng nhập văn bản cần dịch.",
            zh: "请输入要翻译的文本。",
            en: "Please enter the text to analyze."
        };
        showToast(msg[currentLanguage] || msg['ko']);
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
    
    // Start step-by-step loading progress text updates
    startLoadingProgress(currentLanguage);
    
    try {
        const formData = new FormData();
        formData.append("text", textInput);
        formData.append("lang", currentLanguage);
        
        const session = localStorage.getItem("daon_user_session");
        if (session) {
            const userData = JSON.parse(session);
            formData.append("username", userData.username || userData.email || "");
        }
        
        const response = await fetch('/api/analyze', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error("RAG API response error");
        }
        
        const data = await response.json();
        latestAnalysisResult = data;
        
        // Stop loading progress text updates
        stopLoadingProgress();
        
        // Render results inside modal content container
        renderReportModalResult(data);
        
        // Save to local storage history
        saveTranslationToHistory(textInput, data, currentLanguage);
        
        // Hide loading, show content
        if (modalLoading) modalLoading.classList.add('hidden');
        if (modalContent) modalContent.classList.remove('hidden');
        
        const statusDocValEl = document.getElementById('txt-status-doc-val');
        if (statusDocValEl) {
            statusDocValEl.textContent = "분석 완료";
        }
    } catch (error) {
        console.error("Text analysis failed:", error);
        triggerToast("분석 실패", "AI 분석 도중 서버 오류가 발생하였습니다. API 설정 및 상태를 확인하세요.", "error");
        
        stopLoadingProgress();
        
        latestAnalysisResult = null;
        const fallbackData = getFallbackData(currentLanguage);
        renderReportModalResult(fallbackData);
        
        if (modalLoading) modalLoading.classList.add('hidden');
        if (modalContent) modalContent.classList.remove('hidden');
    }
}

// Loading progress state dynamic messages
let loadingInterval = null;
function startLoadingProgress(lang) {
    const descEl = document.getElementById('txt-report-loading-desc');
    if (!descEl) return;
    
    const messages = {
        ko: [
            "다온 AI가 이미지 글자를 판독하는 중입니다...",
            "문서의 핵심 단어와 강조 사항을 추출하는 중입니다...",
            "RAG 데이터베이스에서 한국 학교/공공기관 문화 배경을 매칭하는 중입니다...",
            "아동 준비물과 부모 제출용 서류를 분류하고 있습니다...",
            "선택한 언어로 요약 리포트를 번역하고 있습니다...",
            "최종 RAG 분석 번역 결과를 조립하는 중입니다..."
        ],
        vi: [
            "Daon AI đang nhận dạng và giải mã văn bản...",
            "Đang trích xuất từ khóa chính và nội dung cần lưu ý...",
            "Đang đối chiếu bối cảnh văn hóa giáo dục Hàn Quốc từ RAG database...",
            "Đang phân loại đồ chuẩn bị của trẻ và hồ sơ nộp của phụ huynh...",
            "Đang dịch báo cáo tóm tắt sang tiếng Việt...",
            "Đang hoàn thiện kết quả phân tích RAG cuối cùng..."
        ],
        zh: [
            "多稳 AI 正在识别并解读文档中的文字...",
            "正在提取文档中的核心关键词及注意事项...",
            "正在从 RAG 知识库检索匹配韩国学校及行政文化背景...",
            "正在分类整理学生的准备物品和家长的提交材料...",
            "正在将总结报告翻译成中文...",
            "正在合成最终的 RAG 定制分析报告..."
        ],
        en: [
            "Daon AI is recognizing and decoding the document characters...",
            "Extracting core keywords and key highlights from the notice...",
            "Matching Korean school/administrative cultural contexts from RAG database...",
            "Sorting out student preparations and parent submission documents...",
            "Translating the summary report into English...",
            "Assembling the final RAG customized analysis results..."
        ]
    };
    
    const langMsgs = messages[lang] || messages['ko'];
    let idx = 0;
    
    descEl.textContent = langMsgs[0];
    
    clearInterval(loadingInterval);
    loadingInterval = setInterval(() => {
        idx = (idx + 1) % langMsgs.length;
        descEl.textContent = langMsgs[idx];
    }, 2500);
}

function stopLoadingProgress() {
    clearInterval(loadingInterval);
}

// Progressive HTML Typewriter Effect (Layout-safe HTML Parser)
function getTextLength(htmlString) {
    let textCount = 0;
    let i = 0;
    while (i < htmlString.length) {
        if (htmlString[i] === '<') {
            let tagEnd = htmlString.indexOf('>', i);
            if (tagEnd !== -1) {
                i = tagEnd + 1;
            } else {
                i++;
            }
        } else {
            textCount++;
            i++;
        }
    }
    return textCount;
}

function getValidHTMLPrefix(htmlString, textCharCount) {
    let output = "";
    let openTags = [];
    let textCount = 0;
    let i = 0;
    const selfClosingTags = ['br', 'hr', 'img', 'input', 'meta', 'link'];
    
    while (i < htmlString.length && textCount < textCharCount) {
        if (htmlString[i] === '<') {
            let tagEnd = htmlString.indexOf('>', i);
            if (tagEnd === -1) {
                output += htmlString.substring(i);
                break;
            }
            let tag = htmlString.substring(i, tagEnd + 1);
            output += tag;
            
            if (tag.startsWith('</')) {
                openTags.pop();
            } else if (tag.endsWith('/>') || tag.startsWith('<!--')) {
                // self closing or comment
            } else {
                let tagNameMatch = tag.match(/<([a-zA-Z0-9]+)/);
                if (tagNameMatch) {
                    const name = tagNameMatch[1].toLowerCase();
                    if (!selfClosingTags.includes(name)) {
                        openTags.push(name);
                    }
                }
            }
            i = tagEnd + 1;
        } else {
            output += htmlString[i];
            textCount++;
            i++;
        }
    }
    
    // Close open tags in reverse
    for (let j = openTags.length - 1; j >= 0; j--) {
        output += `</${openTags[j]}>`;
    }
    
    return output;
}

function typewriteHTML(elementId, htmlString, speed = 8, callback = null) {
    const container = document.getElementById(elementId);
    if (!container) {
        if (callback) callback();
        return;
    }
    container.innerHTML = "";
    
    if (!htmlString) {
        if (callback) callback();
        return;
    }
    
    const totalLength = getTextLength(htmlString);
    let currentLength = 0;
    
    function step() {
        if (currentLength <= totalLength) {
            container.innerHTML = getValidHTMLPrefix(htmlString, currentLength);
            currentLength += 2; // Typewrite 2 characters at a time for smoother/faster flow
            setTimeout(step, speed);
        } else {
            container.innerHTML = htmlString;
            if (callback) callback();
        }
    }
    step();
}

function renderReportModalResult(data) {
    const contentBox = document.getElementById('report-modal-content-container');
    if (!contentBox) return;
    
    // Initialize section boxes
    contentBox.innerHTML = `
        <div id="sec-submissions"></div>
        <div id="sec-materials"></div>
        <div id="sec-schedule"></div>
        <div id="sec-translation"></div>
        <div id="sec-culture"></div>
    `;
    
    const submissionsHTML = data.submissions || "";
    const materialsHTML = data.materials || "";
    const scheduleHTML = data.schedule || "";
    
    let translationHTML = "";
    if (data.full_translation) {
        const titles = {
            ko: "전체 번역본 (Full Translation)",
            vi: "Bản dịch đầy đủ (Full Translation)",
            zh: "全文翻译 (Full Translation)",
            en: "Full Translation"
        };
        const titleText = titles[currentLanguage] || titles['ko'];
        translationHTML = `
            <div style="margin-top: 10px; padding: 15px; background: rgba(0, 0, 0, 0.03); border-left: 4px solid var(--secondary); border-radius: 12px; margin-bottom: 12px;">
                <h4 style="margin-top: 0; color: var(--text-main); font-weight: 700;"><i class="fa-solid fa-language"></i> ${titleText}</h4>
                <p style="white-space: pre-wrap; line-height: 1.6; font-size: 0.95rem; margin: 0; color: var(--text-main);">${data.full_translation}</p>
            </div>
        `;
    }
    
    const cultureHTML = data.cultural_notes || "";
    
    // Run sequential typewriter rendering (Submissions -> Materials -> Schedule -> Translation -> Culture)
    typewriteHTML("sec-submissions", submissionsHTML, 3, () => {
        typewriteHTML("sec-materials", materialsHTML, 3, () => {
            typewriteHTML("sec-schedule", scheduleHTML, 3, () => {
                typewriteHTML("sec-translation", translationHTML, 2, () => {
                    typewriteHTML("sec-culture", cultureHTML, 3, () => {
                        // All sections typed out!
                    });
                });
            });
        });
    });
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
    const errorMessages = {
        ko: {
            submissions: `
                <div style="padding: 16px; background: rgba(239, 68, 68, 0.05); border-left: 4px solid #ef4444; border-radius: 12px; margin-bottom: 12px;">
                    <h4 style="margin: 0 0 8px 0; color: #ef4444; font-weight: 700;">🚨 오류 발생</h4>
                    <p style="margin: 0; font-size: 0.95rem; line-height: 1.5;">AI 분석 및 번역 도중 오류가 발생하여 데이터를 가져올 수 없습니다.</p>
                </div>
            `,
            materials: "",
            schedule: "",
            full_translation: "AI 분석 도중 서버 오류가 발생하였습니다. API 설정 및 네트워크 상태를 확인해 주세요.",
            cultural_notes: ""
        },
        vi: {
            submissions: `
                <div style="padding: 16px; background: rgba(239, 68, 68, 0.05); border-left: 4px solid #ef4444; border-radius: 12px; margin-bottom: 12px;">
                    <h4 style="margin: 0 0 8px 0; color: #ef4444; font-weight: 700;">🚨 Đã xảy ra lỗi</h4>
                    <p style="margin: 0; font-size: 0.95rem; line-height: 1.5;">Đã xảy ra lỗi trong quá trình phân tích và dịch thuật AI, không thể lấy dữ liệu.</p>
                </div>
            `,
            materials: "",
            schedule: "",
            full_translation: "Đã xảy ra lỗi hệ thống trong quá trình phân tích AI. Vui lòng kiểm tra lại thiết lập API hoặc trạng thái mạng.",
            cultural_notes: ""
        },
        zh: {
            submissions: `
                <div style="padding: 16px; background: rgba(239, 68, 68, 0.05); border-left: 4px solid #ef4444; border-radius: 12px; margin-bottom: 12px;">
                    <h4 style="margin: 0 0 8px 0; color: #ef4444; font-weight: 700;">🚨 发生错误</h4>
                    <p style="margin: 0; font-size: 0.95rem; line-height: 1.5;">AI 분석과 번역 도중 서버 에러가 발생하여 데이터를 가져올 수 없습니다.</p>
                </div>
            `,
            materials: "",
            schedule: "",
            full_translation: "AI 분석 중 서버 에러가 발생했습니다. API 설정과 네트워크 상태를 확인해 주세요.",
            cultural_notes: ""
        },
        en: {
            submissions: `
                <div style="padding: 16px; background: rgba(239, 68, 68, 0.05); border-left: 4px solid #ef4444; border-radius: 12px; margin-bottom: 12px;">
                    <h4 style="margin: 0 0 8px 0; color: #ef4444; font-weight: 700;">🚨 Error Occurred</h4>
                    <p style="margin: 0; font-size: 0.95rem; line-height: 1.5;">An error occurred during AI analysis and translation. Could not retrieve data.</p>
                </div>
            `,
            materials: "",
            schedule: "",
            full_translation: "An error occurred during AI analysis and translation. Please check the API configuration and network status.",
            cultural_notes: ""
        }
    };
    
    return errorMessages[lang] || errorMessages['ko'];
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
    
    container.innerHTML = mockWelfareDatabase.map(benefit => {
        const titleText = typeof benefit.title === 'object'
            ? (benefit.title[lang] || benefit.title['ko'] || '')
            : (benefit.title || '');
            
        return `
            <div class="welfare-list-card" onclick="viewBenefitDetail('${benefit.id}')">
                <div class="card-header">
                    <span class="benefit-cat-tag">${getLocalizedCategory(benefit.category, lang)}</span>
                    ${benefit.sourceUrl ? `
                        <a href="${benefit.sourceUrl}" target="_blank" class="feed-source-link" onclick="event.stopPropagation();">
                            <i class="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>` : ''
                    }
                </div>
                <h4>${titleText}</h4>
                <p class="desc">${benefit.desc[lang] || benefit.desc['ko']}</p>
                <div class="meta-info">
                    <span class="region-tag">${getLocalizedRegion(benefit.region, lang)}</span>
                </div>
            </div>
        `;
    }).join('');
}

// Navigate to benefits tab and auto-filter matching results
function viewBenefitDetail(benefitId) {
    const benefit = mockWelfareDatabase.find(b => b.id === benefitId);
    if (!benefit) return;
    
    const modal = document.getElementById('benefit-detail-modal');
    if (!modal) return;
    
    const lang = translations[currentLanguage] ? currentLanguage : 'ko';
    
    // Populate modal content
    const titleText = typeof benefit.title === 'object'
        ? (benefit.title[lang] || benefit.title['ko'] || '')
        : (benefit.title || '');
        
    document.getElementById('modal-benefit-cat').textContent = benefit.category;
    document.getElementById('modal-benefit-title').textContent = titleText;
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
    const sourceWrapperEl = document.getElementById('modal-benefit-source-wrapper');
    
    if (benefit.sourceUrl) {
        linkEl.href = benefit.sourceUrl;
        linkEl.style.display = 'flex';
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
    // Sound disabled by user request
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

// Wizard progress bar milestones for 2 steps (0, 1)
const progressMilestones = [50, 100];

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
            showToast(currentLanguage === 'ko' ? '사용하실 언어를 선택해 주세요.' : 
                      currentLanguage === 'vi' ? 'Vui lòng chọn ngôn ngữ của bạn.' :
                      currentLanguage === 'zh' ? '请选择您的语言。' : 'Please select your language.');
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
    
    // Footer Button Text controller (Step 1 is the final step now)
    nextBtn.textContent = translations[currentLanguage].btnStart || "다온 시작하기";
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
    // Primary child age maps to first child's input
    const primaryChildAge = (onboardData.children && onboardData.children[0]) ? onboardData.children[0].age : 8;
    activeProfile.childAge = primaryChildAge;
    activeProfile.incomeBracket = onboardData.income || 80;
    
    // Synchronize filters
    const globalLangEl = document.getElementById('global-lang');
    if (globalLangEl) globalLangEl.value = onboardData.lang;
    
    const profChildAgeEl = document.getElementById('prof-child-age');
    if (profChildAgeEl) profChildAgeEl.value = primaryChildAge;
    
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
    localStorage.setItem('daon_income', onboardData.income || 80);
    localStorage.setItem('daon_raw_income', onboardData.rawIncome || 300);
    localStorage.setItem('daon_children', JSON.stringify(onboardData.children)); // Stringify child details
    
    overlay.classList.add('fade-out');
    
    setTimeout(() => {
        overlay.style.display = 'none';
        // 온보딩 완료 직후 코치마크 가이드 시작
        startCoachGuide();
    }, 700);
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
        renderTranslationHistory();
        initUsernameCheck();
        
        // Initialize Google Login
        await initGoogleLogin();
        
        // Onboarding Check
        const overlay = document.getElementById('onboarding-overlay');
        if (overlay) {
            if (localStorage.getItem('daon_onboarded') === 'true') {
                overlay.style.display = 'none';
                overlay.classList.add('fade-out');
            } else {
                overlay.style.display = 'flex';
                onboardStep = 0;
                updateOnboardProgress();
                
                const sysLang = navigator.language || navigator.userLanguage;
                let recommended = 'ko';
                if (sysLang.includes('vi')) recommended = 'vi';
                else if (sysLang.includes('zh')) recommended = 'zh';
                else if (sysLang.includes('en')) recommended = 'en';
                
                selectOnboardLanguage(recommended);
            }
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

// ==========================================
// 7. GOOGLE OAUTH LOGIN CONTROLLER
// ==========================================
let googleClientId = "";
let userSessionToken = null;

async function initGoogleLogin() {
    try {
        // Fetch Client ID from backend config
        const res = await fetch("/api/config");
        if (!res.ok) throw new Error("Failed to fetch Google Client ID from backend.");
        const config = await res.json();
        googleClientId = config.googleClientId;
        
        // Check existing user session
        const session = localStorage.getItem("daon_user_session");
        if (session) {
            const userData = JSON.parse(session);
            applyUserSession(userData, false);
        } else {
            resetUserSessionUI();
            renderGoogleLoginButton();
        }
    } catch (err) {
        console.error("Google sign-in initialization failed:", err);
    }
}

function renderGoogleLoginButton() {
    if (typeof google === "undefined" || !googleClientId) {
        // Retry in 500ms if GIS SDK is not loaded yet
        setTimeout(renderGoogleLoginButton, 500);
        return;
    }
    
    google.accounts.id.initialize({
        client_id: googleClientId,
        callback: handleCredentialResponse
    });
    
    const container = document.getElementById("btn-google-login");
    if (container) {
        google.accounts.id.renderButton(container, {
            theme: "outline",
            size: "large",
            shape: "pill",
            width: 240
        });
    }
}

async function handleCredentialResponse(response) {
    const credential = response.credential;
    
    // Show loading notification toast
    triggerToast("로그인 진행 중", "구글 계정을 인증하는 중입니다...");
    
    try {
        const res = await fetch("/api/auth/google", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ credential })
        });
        
        if (!res.ok) throw new Error("Google token validation failed on backend.");
        
        const userData = await res.json();
        if (userData.status === "success") {
            // Cache user data in localStorage
            localStorage.setItem("daon_user_session", JSON.stringify(userData));
            
            // Apply session data to profile card and redirect to home screen
            applyUserSession(userData, true);
            
            triggerToast("로그인 성공", `${userData.name || '사용자'}님, 반갑습니다!`, "success");
        } else {
            triggerToast("로그인 실패", "구글 로그인 처리에 실패했습니다.", "error");
        }
    } catch (err) {
        console.error("Google verify token error:", err);
        triggerToast("로그인 오류", "구글 인증에 실패하였습니다. 다시 시도해 주세요.", "error");
    }
}

function applyUserSession(userData, redirectToHome = false) {
    userSessionToken = userData.token;
    
    // Update Name & Email
    const nameEl = document.getElementById("txt-myprofile-username");
    if (nameEl) nameEl.textContent = userData.name || userData.username;
    
    const emailEl = document.getElementById("txt-myprofile-email");
    if (emailEl) emailEl.textContent = userData.email || userData.username;
    
    // Update Profile Image
    const avatarImg = document.getElementById("user-avatar-img");
    if (avatarImg) {
        avatarImg.src = userData.picture || "assets/basic_profile.png";
        avatarImg.onerror = function() {
            this.src = "assets/basic_profile.png";
            this.onerror = null;
        };
    }
    
    // Hide auth forms and Google login, show logout
    const localAuthContainer = document.getElementById("local-auth-container");
    if (localAuthContainer) localAuthContainer.classList.add("hidden");
    
    const googleBtnContainer = document.getElementById("google-login-container");
    if (googleBtnContainer) googleBtnContainer.classList.add("hidden");
    
    const logoutBtn = document.getElementById("btn-logout");
    if (logoutBtn) logoutBtn.classList.remove("hidden");

    const profileInfo = document.getElementById("user-profile-info");
    if (profileInfo) profileInfo.classList.remove("hidden");

    // Dynamically update UI translations and states (e.g. photo upload zone)
    changeLanguage(currentLanguage);
    
    // Sync translation history from server and render
    syncTranslationHistoryFromServer();
    
    // Redirect to home if requested
    if (redirectToHome) {
        switchTab('tab-home');
    }
}

function resetUserSessionUI() {
    userSessionToken = null;
    
    // Reset Profile Name & Email
    const nameEl = document.getElementById("txt-myprofile-username");
    if (nameEl) nameEl.textContent = translations[currentLanguage].myprofileUsername || "다온 패밀리";
    
    const emailEl = document.getElementById("txt-myprofile-email");
    if (emailEl) emailEl.textContent = "daon_family@example.com";
    
    // Reset Avatar
    const avatarImg = document.getElementById("user-avatar-img");
    if (avatarImg) {
        avatarImg.src = "assets/basic_profile.png";
        avatarImg.onerror = null;
    }
    
    // Show auth forms and Google login, hide logout
    const localAuthContainer = document.getElementById("local-auth-container");
    if (localAuthContainer) localAuthContainer.classList.remove("hidden");
    
    const googleBtnContainer = document.getElementById("google-login-container");
    if (googleBtnContainer) googleBtnContainer.classList.remove("hidden");
    
    const logoutBtn = document.getElementById("btn-logout");
    if (logoutBtn) logoutBtn.classList.add("hidden");

    const profileInfo = document.getElementById("user-profile-info");
    if (profileInfo) profileInfo.classList.add("hidden");

    // Dynamically update UI translations and states (e.g. photo upload zone)
    changeLanguage(currentLanguage);
    
    // Re-render guest translation history
    renderTranslationHistory();
}

function handleLogout() {
    // Clear Session Cache
    localStorage.removeItem("daon_user_session");
    
    // Reset UI Elements
    resetUserSessionUI();
    
    // Re-render Google Sign-in button
    renderGoogleLoginButton();
    
    triggerToast("로그아웃 완료", "성공적으로 로그아웃 되었습니다.", "info");
}

// Local Auth Form Controllers
function toggleAuthForm(mode, event) {
    if (event) event.preventDefault();
    const loginForm = document.getElementById("local-login-form");
    const registerForm = document.getElementById("local-register-form");
    
    // Clear inputs and messages when toggling
    const inputs = document.querySelectorAll("#local-auth-container input");
    inputs.forEach(input => input.value = "");
    
    const messages = ["reg-username-message", "reg-email-message", "reg-password-message"];
    messages.forEach(id => {
        const msgEl = document.getElementById(id);
        if (msgEl) {
            msgEl.style.display = "none";
            msgEl.textContent = "";
        }
    });
    
    if (mode === "register") {
        if (loginForm) loginForm.classList.add("hidden");
        if (registerForm) registerForm.classList.remove("hidden");
    } else {
        if (loginForm) loginForm.classList.remove("hidden");
        if (registerForm) registerForm.classList.add("hidden");
    }
}

async function handleLocalLogin() {
    const usernameInput = document.getElementById("auth-login-username");
    const passwordInput = document.getElementById("auth-login-password");
    
    if (!usernameInput || !passwordInput) return;
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    
    if (!username || !password) {
        triggerToast("입력 오류", "아이디와 비밀번호를 모두 입력해 주세요.", "error");
        return;
    }
    
    try {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
        
        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.detail || "로그인 실패");
        }
        
        const userData = await res.json();
        if (userData.status === "success") {
            localStorage.setItem("daon_user_session", JSON.stringify(userData));
            applyUserSession(userData, true);
            triggerToast("로그인 성공", `${userData.name || username}님, 반갑습니다!`, "success");
            
            // Clear inputs
            usernameInput.value = "";
            passwordInput.value = "";
        }
    } catch (err) {
        console.error("Local login error:", err);
        triggerToast("로그인 실패", err.message || "아이디 또는 비밀번호를 확인하세요.", "error");
    }
}

async function handleLocalRegister() {
    const usernameInput = document.getElementById("auth-reg-username");
    const nameInput = document.getElementById("auth-reg-name");
    const emailInput = document.getElementById("auth-reg-email");
    const passwordInput = document.getElementById("auth-reg-password");
    const passwordConfirmInput = document.getElementById("auth-reg-password-confirm");
    
    if (!usernameInput || !nameInput || !emailInput || !passwordInput || !passwordConfirmInput) return;
    
    const username = usernameInput.value.trim();
    const fullName = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const passwordConfirm = passwordConfirmInput.value;
    
    if (!username || !fullName || !email || !password || !passwordConfirm) {
        triggerToast("입력 오류", "모든 항목을 입력해 주세요.", "error");
        return;
    }
    
    const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
    if (!usernameRegex.test(username)) {
        triggerToast("입력 오류", "아이디 형식이 올바르지 않습니다.", "error");
        return;
    }
    
    const fullNameRegex = /^[a-zA-Z0-9가-힣\s]{2,40}$/;
    if (fullName.length < 2) {
        triggerToast("입력 오류", "이름은 2글자 이상 입력해 주세요.", "error");
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        triggerToast("입력 오류", "유효한 이메일 주소를 입력해 주세요.", "error");
        return;
    }
    
    if (password.length < 6) {
        triggerToast("입력 오류", "비밀번호는 6자 이상이어야 합니다.", "error");
        return;
    }
    
    if (password !== passwordConfirm) {
        triggerToast("입력 오류", "비밀번호가 일치하지 않습니다.", "error");
        return;
    }
    
    try {
        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: username,
                full_name: fullName,
                email: email,
                password: password
            })
        });
        
        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.detail || "회원가입 실패");
        }
        
        triggerToast("회원가입 성공", "회원가입이 완료되었습니다! 로그인해 주세요.", "success");
        
        // Clear inputs
        usernameInput.value = "";
        nameInput.value = "";
        emailInput.value = "";
        passwordInput.value = "";
        passwordConfirmInput.value = "";
        
        // Hide messages
        const msgUsername = document.getElementById("reg-username-message");
        const msgEmail = document.getElementById("reg-email-message");
        const msgPassword = document.getElementById("reg-password-message");
        if (msgUsername) msgUsername.style.display = "none";
        if (msgEmail) msgEmail.style.display = "none";
        if (msgPassword) msgPassword.style.display = "none";
        
        // Switch to login form
        toggleAuthForm("login");
    } catch (err) {
        console.error("Local register error:", err);
        triggerToast("회원가입 실패", err.message || "가입 정보를 다시 확인해 주세요.", "error");
    }
}

// Helper to get user-specific translation history key
function getTranslationHistoryKey() {
    try {
        const session = localStorage.getItem("daon_user_session");
        if (session) {
            const userData = JSON.parse(session);
            if (userData && (userData.username || userData.email)) {
                return `daon_translation_history_${userData.username || userData.email}`;
            }
        }
    } catch (e) {
        console.error("Error parsing user session for history key:", e);
    }
    return "daon_translation_history"; // Default guest key
}

// Helper to get current username/email if logged in
function getCurrentLoggedInUsername() {
    try {
        const session = localStorage.getItem("daon_user_session");
        if (session) {
            const userData = JSON.parse(session);
            if (userData && (userData.username || userData.email)) {
                return userData.username || userData.email;
            }
        }
    } catch (e) {
        console.error("Error parsing user session for username:", e);
    }
    return null;
}

// Sync translation history from server DB to local storage cache
async function syncTranslationHistoryFromServer() {
    const username = getCurrentLoggedInUsername();
    if (!username) return;
    
    try {
        const res = await fetch(`/api/history?username=${encodeURIComponent(username)}`);
        if (!res.ok) throw new Error("Failed to fetch history from server");
        
        const serverHistory = await res.json();
        
        // Overwrite the local user history
        const key = getTranslationHistoryKey();
        localStorage.setItem(key, JSON.stringify(serverHistory));
        
        // Re-render history UI
        renderTranslationHistory();
    } catch (err) {
        console.error("Failed to sync history from server:", err);
    }
}

// Local Translation History (localStorage & DB synced)
function saveTranslationToHistory(sourceText, resultData, langCode) {
    try {
        const key = getTranslationHistoryKey();
        let history = JSON.parse(localStorage.getItem(key) || "[]");
        
        // Create new record
        const newRecord = {
            db_id: resultData.db_id || null,
            timestamp: new Date().toISOString(),
            sourceText: sourceText,
            lang: langCode,
            result: resultData
        };
        
        // Prepend and limit size to 20
        history.unshift(newRecord);
        if (history.length > 20) {
            history = history.slice(0, 20);
        }
        
        localStorage.setItem(key, JSON.stringify(history));
        renderTranslationHistory();
    } catch (e) {
        console.error("Failed to save translation to history:", e);
    }
}

function renderTranslationHistory() {
    const listContainer = document.getElementById("translation-history-list");
    if (!listContainer) return;
    
    try {
        const key = getTranslationHistoryKey();
        const history = JSON.parse(localStorage.getItem(key) || "[]");
        
        if (history.length === 0) {
            const emptyText = (translations[currentLanguage] && translations[currentLanguage].historyEmpty) 
                ? translations[currentLanguage].historyEmpty 
                : "아직 번역 분석 기록이 없습니다.";
            listContainer.innerHTML = `<p style="text-align: center; color: var(--text-sub); font-size: 0.85rem; margin: 10px 0;" id="txt-history-empty">${emptyText}</p>`;
            return;
        }
        
        let html = "";
        const displayedHistory = history.slice(0, 5);
        displayedHistory.forEach((record, index) => {
            const date = new Date(record.timestamp);
            const dateStr = `${date.getMonth() + 1}/${date.getDate()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
            
            let title = record.sourceText.replace(/\n/g, ' ').trim();
            if (title.length > 28) {
                title = title.substring(0, 28) + "...";
            }
            
            const langLabels = { ko: 'KO', vi: 'VI', zh: 'ZH', e: 'EN' };
            const langLabel = langLabels[record.lang] || 'KO';
            
            html += `
                <div class="history-item-card" onclick="loadHistoryItem(${index})" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 14px; background: rgba(0, 0, 0, 0.02); border-radius: 12px; border: 1px solid var(--border-color); cursor: pointer; transition: all 0.2s;">
                    <div style="flex: 1; text-align: left; overflow: hidden; padding-right: 10px;">
                        <div style="font-size: 0.9rem; font-weight: 600; color: var(--text-main); margin-bottom: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${title}</div>
                        <div style="display: flex; align-items: center; gap: 6px; font-size: 0.75rem; color: var(--text-sub);">
                            <span>${dateStr}</span>
                            <span style="background: var(--border-color); width: 1px; height: 8px;"></span>
                            <span style="background: var(--secondary-light); color: var(--secondary); font-weight: 700; padding: 1px 4px; border-radius: 3px; font-size: 0.65rem;">${langLabel}</span>
                        </div>
                    </div>
                    <button onclick="deleteHistoryItem(${index}, event)" style="background: none; border: none; font-size: 1rem; color: var(--text-sub); cursor: pointer; padding: 6px; display: flex; align-items: center; justify-content: center; transition: color 0.2s;" onmouseover="this.style.color='var(--toss-red)'" onmouseout="this.style.color='var(--text-sub)'">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </div>
            `;
        });
        
        listContainer.innerHTML = html;
        
        // Show indicator if there are more history items
        if (history.length > 5) {
            const moreText = currentLanguage === "ko" 
                ? `외 ${history.length - 5}개의 기록이 더 있습니다.` 
                : (currentLanguage === "vi" 
                    ? `và ${history.length - 5} lịch sử khác.` 
                    : (currentLanguage === "zh" 
                        ? `外 还有${history.length - 5}个记录。` 
                        : `and ${history.length - 5} more records.`));
            listContainer.insertAdjacentHTML('beforeend', `
                <div style="text-align: center; font-size: 0.8rem; color: var(--text-sub); margin-top: 8px;" id="txt-history-more-indicator">
                    ${moreText}
                </div>
            `);
        }
    } catch (e) {
        console.error("Failed to render translation history:", e);
    }
}

async function clearTranslationHistory() {
    if (confirm("번역 기록을 모두 삭제하시겠습니까?")) {
        const username = getCurrentLoggedInUsername();
        if (username) {
            try {
                const res = await fetch(`/api/history?username=${encodeURIComponent(username)}`, {
                    method: "DELETE"
                });
                if (!res.ok) throw new Error("Failed to delete history from server");
            } catch (err) {
                console.error("Failed to delete history on server:", err);
                triggerToast("오류", "서버 기록 삭제 중 오류가 발생했습니다.", "error");
                return;
            }
        }
        
        const key = getTranslationHistoryKey();
        localStorage.removeItem(key);
        renderTranslationHistory();
        triggerToast("기록 삭제", "모든 번역 분석 기록이 삭제되었습니다.", "info");
    }
}

async function deleteHistoryItem(index, event) {
    if (event) event.stopPropagation();
    
    try {
        const key = getTranslationHistoryKey();
        let history = JSON.parse(localStorage.getItem(key) || "[]");
        const record = history[index];
        
        const username = getCurrentLoggedInUsername();
        if (username && record && record.db_id) {
            try {
                const res = await fetch(`/api/history?username=${encodeURIComponent(username)}&db_id=${record.db_id}`, {
                    method: "DELETE"
                });
                if (!res.ok) throw new Error("Failed to delete record on server");
            } catch (err) {
                console.error("Failed to delete record on server:", err);
                triggerToast("오류", "서버 기록 삭제 중 오류가 발생했습니다.", "error");
                return;
            }
        }
        
        history.splice(index, 1);
        localStorage.setItem(key, JSON.stringify(history));
        renderTranslationHistory();
        triggerToast("기록 삭제", "해당 번역 기록이 삭제되었습니다.", "info");
    } catch (e) {
        console.error("Failed to delete history item:", e);
    }
}

function loadHistoryItem(index) {
    try {
        const key = getTranslationHistoryKey();
        const history = JSON.parse(localStorage.getItem(key) || "[]");
        const record = history[index];
        if (!record) return;
        
        const reportModal = document.getElementById('translation-report-modal');
        const modalLoading = document.getElementById('report-modal-loading');
        const modalContent = document.getElementById('report-modal-content-container');
        
        if (reportModal) reportModal.classList.remove('hidden');
        if (modalLoading) modalLoading.classList.add('hidden');
        if (modalContent) modalContent.classList.remove('hidden');
        
        const langLabels = { ko: '한국어', vi: 'Tiếng Việt', zh: '中文', en: 'English' };
        const langTag = document.getElementById('report-modal-lang-tag');
        if (langTag) langTag.textContent = langLabels[record.lang];
        
        document.getElementById('doc-text-input').value = record.sourceText;
        renderReportModalResult(record.result);
        triggerToast("기록 로드", "이전 분석 데이터를 불러왔습니다.", "success");
    } catch (e) {
        console.error("Failed to load history item:", e);
        triggerToast("기록 로드 실패", "번역 데이터를 불러오지 못했습니다.", "error");
    }
}

let usernameCheckTimeout = null;
function initUsernameCheck() {
    const inputEl = document.getElementById("auth-reg-username");
    if (!inputEl) return;
    
    inputEl.addEventListener("input", function() {
        const username = this.value.trim();
        const msgEl = document.getElementById("reg-username-message");
        if (!msgEl) return;
        
        if (!username) {
            msgEl.style.display = "none";
            msgEl.textContent = "";
            return;
        }
        
        const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
        if (!usernameRegex.test(username)) {
            msgEl.style.display = "block";
            msgEl.style.color = "#f04452"; // Toss Red
            if (currentLanguage === "ko") {
                msgEl.textContent = "아이디는 3~20자의 영문, 숫자, 밑줄(_), 붙임표(-)만 사용할 수 있습니다.";
            } else if (currentLanguage === "vi") {
                msgEl.textContent = "Tên đăng nhập phải từ 3-20 ký tự, chỉ chứa chữ cái, số, gạch dưới (_) và gạch ngang (-).";
            } else if (currentLanguage === "zh") {
                msgEl.textContent = "用户名必须为3~20个字符，且只能包含英文字母、数字、下划线(_)或连字符(-)。";
            } else {
                msgEl.textContent = "Username must be 3-20 characters, containing only letters, numbers, underscores, and hyphens.";
            }
            return;
        }
        
        clearTimeout(usernameCheckTimeout);
        usernameCheckTimeout = setTimeout(async () => {
            try {
                const res = await fetch(`/api/auth/check-username?username=${encodeURIComponent(username)}`);
                if (!res.ok) throw new Error("Failed to check username");
                const data = await res.json();
                
                msgEl.style.display = "block";
                if (data.available) {
                    msgEl.style.color = "#22bb66"; // Toss Green
                    msgEl.textContent = currentLanguage === "ko" 
                        ? "사용 가능한 아이디입니다." 
                        : (currentLanguage === "vi" ? "Tên đăng nhập khả dụng." : "Username is available.");
                } else {
                    msgEl.style.color = "#f04452"; // Toss Red
                    msgEl.textContent = currentLanguage === "ko" 
                        ? "이미 존재하는 아이디입니다." 
                        : (currentLanguage === "vi" ? "Tên đăng nhập đã tồn tại." : "Username is already taken.");
                }
            } catch (e) {
                console.error(e);
            }
        }, 300);
    });

    // Email Validation Listener
    const emailEl = document.getElementById("auth-reg-email");
    if (emailEl) {
        emailEl.addEventListener("input", function() {
            const email = this.value.trim();
            const msgEl = document.getElementById("reg-email-message");
            if (!msgEl) return;
            
            if (!email) {
                msgEl.style.display = "none";
                msgEl.textContent = "";
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            msgEl.style.display = "block";
            if (emailRegex.test(email)) {
                msgEl.style.color = "#22bb66"; // Toss Green
                msgEl.textContent = currentLanguage === "ko" 
                    ? "올바른 이메일 형식입니다." 
                    : (currentLanguage === "vi" ? "Định dạng email hợp lệ." : "Valid email format.");
            } else {
                msgEl.style.color = "#f04452"; // Toss Red
                msgEl.textContent = currentLanguage === "ko" 
                    ? "이메일 형식이 올바르지 않습니다." 
                    : (currentLanguage === "vi" ? "Định dạng email không hợp lệ." : "Invalid email format.");
            }
        });
    }

    // Password Match Validation Listener
    const pwEl = document.getElementById("auth-reg-password");
    const pwConfirmEl = document.getElementById("auth-reg-password-confirm");
    
    function validatePasswords() {
        if (!pwEl || !pwConfirmEl) return;
        const msgEl = document.getElementById("reg-password-message");
        if (!msgEl) return;
        
        const pw = pwEl.value;
        const pwConfirm = pwConfirmEl.value;
        
        if (!pw && !pwConfirm) {
            msgEl.style.display = "none";
            msgEl.textContent = "";
            return;
        }
        
        msgEl.style.display = "block";
        if (pw.length < 6) {
            msgEl.style.color = "#f04452"; // Toss Red
            msgEl.textContent = currentLanguage === "ko" 
                ? "비밀번호는 6자 이상이어야 합니다." 
                : (currentLanguage === "vi" ? "Mật khẩu phải dài ít nhất 6 ký tự." : "Password must be at least 6 characters.");
            return;
        }
        
        if (pw === pwConfirm) {
            msgEl.style.color = "#22bb66"; // Toss Green
            msgEl.textContent = currentLanguage === "ko" 
                ? "비밀번호가 일치합니다." 
                : (currentLanguage === "vi" ? "Mật khẩu khớp." : "Passwords match.");
        } else {
            msgEl.style.color = "#f04452"; // Toss Red
            msgEl.textContent = currentLanguage === "ko" 
                ? "비밀번호가 일치하지 않습니다." 
                : (currentLanguage === "vi" ? "Mật khẩu không khớp." : "Passwords do not match.");
        }
    }
    
    if (pwEl) pwEl.addEventListener("input", validatePasswords);
    if (pwConfirmEl) pwConfirmEl.addEventListener("input", validatePasswords);
}


// ==========================================
// 9. COACH MARKS GUIDE CONTROLLER
// ==========================================

// 3단계 코치마크 정의
const coachSteps = [
    {
        targetId: 'home-upload-card',
        getText: () => ({
            ko: '📄 가정통신문을 업로드하여 AI 번역을 시작하세요',
            vi: '📄 Tải lên thông báo gia đình để bắt đầu dịch AI',
            zh: '📄 上传家庭通知书，开始AI翻译',
            en: '📄 Upload a school notice to start AI translation'
        }),
        arrow: 'arrow-bottom',
        position: 'above'
    },
    {
        targetId: 'history-section-card',
        getText: () => ({
            ko: '🕐 분석했던 기록을 확인할 수 있습니다',
            vi: '🕐 Bạn có thể xem lại các bản dịch đã phân tích',
            zh: '🕐 您可以查看之前分析过的记录',
            en: '🕐 You can review your previously analyzed records'
        }),
        arrow: 'arrow-bottom',
        position: 'above'
    },
    {
        targetId: 'nav-btn-alerts',
        getText: () => ({
            ko: '🎁 다양한 복지 혜택을 확인해보세요',
            vi: '🎁 Khám phá các phúc lợi đa dạng dành cho bạn',
            zh: '🎁 快来查看各种福利优惠吧',
            en: '🎁 Explore a variety of welfare benefits'
        }),
        arrow: 'arrow-top',
        position: 'above'
    }
];

let currentCoachStep = 0;

function startCoachGuide() {
    // 이미 가이드를 완료한 사용자는 표시하지 않음
    if (localStorage.getItem('daon_guide_completed') === 'true') return;

    currentCoachStep = 0;
    const overlay = document.getElementById('coachmark-overlay');
    if (!overlay) return;

    overlay.style.display = 'block';
    showCoachStep(currentCoachStep);
}

function showCoachStep(stepIndex) {
    const step = coachSteps[stepIndex];
    if (!step) { closeCoachGuide(); return; }

    const targetEl = document.getElementById(step.targetId);
    const spotlight = document.getElementById('coachmark-spotlight');
    const tooltip = document.getElementById('coachmark-tooltip');
    const textEl = document.getElementById('coachmark-text');
    const nextLabel = document.getElementById('coachmark-next-label');
    const skipLabel = document.getElementById('coachmark-skip-label');

    if (!targetEl || !spotlight || !tooltip || !textEl) return;

    // 타겟 요소의 위치 및 크기 계산
    const rect = targetEl.getBoundingClientRect();
    const padding = 8;

    // 스포트라이트 위치 설정
    spotlight.style.top    = `${rect.top - padding}px`;
    spotlight.style.left   = `${rect.left - padding}px`;
    spotlight.style.width  = `${rect.width + padding * 2}px`;
    spotlight.style.height = `${rect.height + padding * 2}px`;

    // 텍스트 설정 (다국어)
    const texts = step.getText();
    textEl.textContent = texts[currentLanguage] || texts['ko'];

    // 마지막 단계 버튼 텍스트
    const isLast = stepIndex === coachSteps.length - 1;
    const finishLabel = { ko: '완료', vi: 'Xong', zh: '完成', en: 'Done' };
    const nextLabelText = { ko: '다음', vi: 'Tiếp', zh: '下一步', en: 'Next' };
    const skipLabelText = { ko: '건너뛰기', vi: 'Bỏ qua', zh: '跳过', en: 'Skip' };

    if (nextLabel) nextLabel.textContent = isLast
        ? (finishLabel[currentLanguage] || '완료')
        : (nextLabelText[currentLanguage] || '다음');
    if (skipLabel) skipLabel.textContent = skipLabelText[currentLanguage] || '건너뛰기';

    // 툴팁 화살표 방향 초기화 후 재설정
    tooltip.className = `coachmark-tooltip ${step.arrow}`;

    // 툴팁 위치: 타겟 위 or 아래
    const tooltipWidth = 280;
    const tooltipHeight = 90;
    let tipTop, tipLeft;

    const viewportW = window.innerWidth;

    if (step.position === 'above') {
        tipTop = rect.top - padding - tooltipHeight - 16;
        if (tipTop < 8) tipTop = rect.bottom + padding + 8; // 화면 위가 잘리면 아래로
    } else {
        tipTop = rect.bottom + padding + 16;
    }

    // 수평 중앙 정렬 (화면 밖 넘침 방지)
    tipLeft = rect.left + rect.width / 2 - tooltipWidth / 2;
    tipLeft = Math.max(10, Math.min(tipLeft, viewportW - tooltipWidth - 10));

    tooltip.style.top  = `${tipTop}px`;
    tooltip.style.left = `${tipLeft}px`;
    tooltip.style.width = `${tooltipWidth}px`;
}

function nextCoachStep() {
    currentCoachStep++;
    if (currentCoachStep >= coachSteps.length) {
        closeCoachGuide();
    } else {
        showCoachStep(currentCoachStep);
    }
}

function closeCoachGuide() {
    const overlay = document.getElementById('coachmark-overlay');
    if (overlay) {
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
            overlay.style.display = 'none';
            overlay.style.opacity = '';
            overlay.style.transition = '';
        }, 300);
    }
    localStorage.setItem('daon_guide_completed', 'true');
}

function resetCoachGuide() {
    localStorage.removeItem('daon_guide_completed');
    currentCoachStep = 0;
    
    const overlay = document.getElementById('coachmark-overlay');
    if (!overlay) return;
    
    // 홈 탭으로 전환 후 가이드 시작 (업로드 카드가 홈 탭에 있으므로)
    switchTab('tab-home');
    
    overlay.style.display = 'block';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
        overlay.style.opacity = '';
        overlay.style.transition = '';
        showCoachStep(0);
    }, 150);
}

function handlePhotoUploadZoneClick() {
    const isLogged = localStorage.getItem("daon_user_session") || userSessionToken;
    if (!isLogged) {
        showToast(translations[currentLanguage].loginRequiredAlert || "사진 번역 기능을 이용하시려면 먼저 로그인해주세요.");
        // 마이페이지 탭으로 전환
        const profileTabBtn = document.querySelector('button[onclick*="tab-profile"]');
        switchTab('tab-profile', profileTabBtn);
        return;
    }
    const fileInput = document.getElementById('doc-file-upload');
    if (fileInput) {
        fileInput.click();
    }
}

function showToast(message) {
    // Remove existing toast if present
    const existing = document.querySelector('.daon-toast');
    if (existing) {
        existing.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = 'daon-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 50);
    
    // Hide and remove
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 2500);
}
