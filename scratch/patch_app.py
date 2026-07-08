import os

app_path = "/home/ubuntu/K-AI-Award/app.js"

with open(app_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add translations in translations object
ko_target = 'obAddChild: "자녀 추가하기",\n        counterUnit: "명"\n    },'
ko_replace = 'obAddChild: "자녀 추가하기",\n        counterUnit: "명",\n        methodPhotoLabel: "사진 업로드",\n        methodTextLabel: "텍스트 직접 입력",\n        uploadZoneTitle: "가정통신문 사진을 올려주세요",\n        uploadZoneDesc: "클릭하여 앨범에서 선택하거나 카메라 촬영"\n    },'
content = content.replace(ko_target, ko_replace)

vi_target = 'obAddChild: "Thêm con",\n        counterUnit: "trẻ"\n    },'
vi_replace = 'obAddChild: "Thêm con",\n        counterUnit: "trẻ",\n        methodPhotoLabel: "Tải ảnh lên",\n        methodTextLabel: "Nhập văn bản",\n        uploadZoneTitle: "Tải ảnh thư báo lên",\n        uploadZoneDesc: "Nhấp để chọn từ thư viện hoặc chụp ảnh"\n    },'
content = content.replace(vi_target, vi_replace)

zh_target = 'obAddChild: "添加子女",\n        counterUnit: "名"\n    },'
zh_replace = 'obAddChild: "添加子女",\n        counterUnit: "名",\n        methodPhotoLabel: "上传照片",\n        methodTextLabel: "直接输入文本",\n        uploadZoneTitle: "请上传学校通知书照片",\n        uploadZoneDesc: "点击选择相册 or 拍照"\n    },'
content = content.replace(zh_target, zh_replace)

en_target = 'obAddChild: "Add Child",\n        counterUnit: "child"\n    };'
en_replace = 'obAddChild: "Add Child",\n        counterUnit: "child",\n        methodPhotoLabel: "Upload Photo",\n        methodTextLabel: "Enter Text Manually",\n        uploadZoneTitle: "Please upload a photo of the school notice",\n        uploadZoneDesc: "Click to select from gallery or capture photo"\n    };'
content = content.replace(en_target, en_replace)

# 2. Add bindings in changeLanguage
bindings_target = '\'txt-setting-feedback\': \'<i class="fa-solid fa-language"></i> \' + translations[langCode].settingFeedback,\n        \'txt-setting-api\': \'<i class="fa-solid fa-circle-nodes"></i> \' + translations[langCode].settingApi\n    };'
bindings_replace = '\'txt-setting-feedback\': \'<i class="fa-solid fa-language"></i> \' + translations[langCode].settingFeedback,\n        \'txt-setting-api\': \'<i class="fa-solid fa-circle-nodes"></i> \' + translations[langCode].settingApi,\n        \'txt-method-photo-label\': translations[langCode].methodPhotoLabel,\n        \'txt-method-text-label\': translations[langCode].methodTextLabel,\n        \'txt-upload-zone-title\': translations[langCode].uploadZoneTitle,\n        \'txt-upload-zone-desc\': translations[langCode].uploadZoneDesc\n    };'
content = content.replace(bindings_target, bindings_replace)

# 3. Add setUploadMethod function below changeLanguage
end_change_lang = 'renderWelfareFeed();\n}'
set_upload_replace = '''renderWelfareFeed();
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
}'''
content = content.replace(end_change_lang, set_upload_replace, 1) # Only first occurrence

# 4. Replace the old RAG Document Helper Engine block entirely
# We'll identify the block starting with loadMockData and ending with copyResultText
helper_engine_start_target = 'function loadMockData(type) {'
# We'll find the index of this start
start_idx = content.find(helper_engine_start_target)
if start_idx == -1:
    raise Exception("Could not find start of helper engine block")

# Find the end function `copyResultText`
copy_result_target = 'function copyResultText() {'
copy_idx = content.find(copy_result_target, start_idx)
if copy_idx == -1:
    raise Exception("Could not find copyResultText function")

# Find the closing brace of copyResultText
closing_brace_idx = content.find('}', copy_idx)
if closing_brace_idx == -1:
    raise Exception("Could not find closing brace of copyResultText")
end_idx = closing_brace_idx + 1

# Prepare the new helper engine content
new_helper_engine = '''let pendingTranslationFile = null;
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
            full_translation: "Bảng thông báo lớp học - Trường tiểu học Mapo lớp 1\\nTiêu đề: Hướng dẫn lớp chăm sóc kỳ nghỉ hè và phát đơn đăng ký\\n- Đăng ký ăn trưa: Nộp đơn đồng ý cho văn phòng hành chính trước ngày 14 tháng 5.\\n- Chuẩn bị: Mang theo bình nước cá nhân và giày đi trong nhà sạch sẽ mỗi ngày.",
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
            full_translation: "[通知栏 - 麻浦小学 一年级]\\n标题：暑期托管班指南及申请表发放\\n- 申请午餐：确认同意书后，于5月14日之前提交至行政室。\\n- 准备物：携带个人水杯和每天穿的干净室内鞋。",
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
            full_translation: "[School Newsletter - Mapo Elementary School Grade 1]\\nTitle: Summer Care Class Guide & Application Form Distribution\\n- Lunch Application: Submit the consent form to the administration office by May 14.\\n- Preparation: Personal water bottle and clean indoor shoes to wear every day.",
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
            full_translation: "[알림장 - 마포초등학교 1학년]\\n제목: 방학 돌봄교실 안내 및 신청서 배부\\n- 급식 신청: 동의서 체크 후 5월 14일까지 행정실 제출.\\n- 준비물: 개인 물통 및 매일 신을 깨끗한 실내화 지참.",
            cultural_notes: `
                <div class="culture-note" style="padding: 16px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; margin-top: 12px;">
                    <h5 style="margin: 0 0 8px 0; color: #15803d; font-weight: 700;"><i class="fa-solid fa-lightbulb"></i> 한국 학교 문화 팁</h5>
                    <p style="margin: 0; font-size: 0.9rem; line-height: 1.5;"><strong>실내화:</strong> ${mockKnowledgeBase[0].content}</p>
                </div>
            `
        };
    }
}'''

# Replace the block
content = content[:start_idx] + new_helper_engine + content[end_idx:]

# 5. Initialize setUploadMethod('photo') in DOMContentLoaded
init_target = 'changeLanguage(savedLang);\n        simulateBenefitMatch(false);\n        renderWelfareFeed();'
init_replace = 'changeLanguage(savedLang);\n        simulateBenefitMatch(false);\n        renderWelfareFeed();\n        setUploadMethod(\'photo\');'
content = content.replace(init_target, init_replace)

with open(app_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Patch applied successfully!")
