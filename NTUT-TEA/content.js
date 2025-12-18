const bodyText = document.body.innerText;
const isPE = bodyText.includes('體育課程') || bodyText.includes('自行運動時間');
const isGE = bodyText.includes('通識課程') || bodyText.includes('關心與本課程有關的議題');

let currentLang = 'zh';

const i18n = {
    zh: {
        title: '一般課程評量',
        titlePE: '體育課程評量',
        titleGE: '通識課程評量',
        tabAuto: '自動填寫',
        tabManual: '手動微調',
        btnFill: '一鍵填寫表單',
        btnFillCustom: '填寫自訂內容',
        completed: '填寫完成',
        saved: '已儲存',
        exists: '已存在清單中',
        manualNote: '選擇題部分將依照「自動填寫」頁籤的設定值進行填寫。',
        saveBtn: '存入常用清單',
        loadPlaceholder: '載入常用範本...',
        q1: isPE ? '1. 每週運動時數' : '1. 每週投入時數',
        q2: '2. 課程理解程度',
        q3: isPE ? '3. 養成運動習慣' : (isGE ? '3. 課程相關議題' : '3. 遇到困難解決方式 (多選)'),
        q12: isPE ? '12. 體育獲益 (多選)' : '12. 核心素養 (多選)',
        q16: '16. 教學方式 (多選)',
        teacherRating: '老師教學評分',
        qLabels: {
            time: isPE ? ["從不", "<1小時", "1-2小時", "2-3小時", ">3小時"] : ["<1小時", "1-3小時", "3-6小時", "6-9小時", ">9小時"],
            degree: ["非常低", "低", "普通", "高", "非常高"],
            agree: ["非常不同意", "不同意", "普通", "同意", "非常同意"],
            yesno: ["是", "否"],
            prob: isPE ? [{l:'是',v:'yes'},{l:'否',v:'no'}] : (isGE ? [{l:'是 (自動填寫)',v:'yes'},{l:'否 (自動填寫)',v:'no'}] : [
                {l:'自行研讀',v:'self'}, {l:'同學討論',v:'peer'}, {l:'請教老師',v:'teacher'},
                {l:'問AI (ChatGPT)',v:'ChatGPT'}, {l:'問Gemini',v:'Gemini'}, {l:'看Youtube',v:'youtube'},
                {l:'放棄',v:'no_hard'}, {l:'沒興趣',v:'no_interest'}
            ]),
            benefitsPE: [{l:'興趣',v:'A'},{l:'知識',v:'B'},{l:'健康',v:'C'},{l:'習慣',v:'D'},{l:'團隊合作',v:'E'},{l:'態度',v:'F'}],
            benefitsGE: [{l:'邏輯',v:'A'},{l:'問題解決',v:'B'},{l:'批判思考',v:'C'},{l:'團隊合作',v:'D'},{l:'美感',v:'E'},{l:'社會關懷',v:'F'},{l:'自然環境',v:'G'},{l:'國際視野',v:'H'}],
            methods: [{l:'講述',v:'A'},{l:'影片',v:'B'},{l:'分組',v:'C'},{l:'簡報',v:'D'},{l:'電腦',v:'E'},{l:'實驗',v:'F'},{l:'實作',v:'G'},{l:'參訪',v:'H'}]
        },
        comments: {
            pros: ["課程內容充實，老師講解清晰。", "教學方式生動有趣。", "老師非常用心。", "獲益良多，謝謝老師。", "老師很有耐心指導。"],
            sugg: ["目前沒有其他建議事項。", "希望能維持這樣的教學風格。", "建議多提供練習題。", "一切都很好。", "無特別建議。"],
            attend: ["老師整學期皆親自授課。", "老師準時出席。", "出席狀況良好。", "皆親自授課。"],
            ge_issues: ["課程相關的社會時事", "相關新聞報導", "課堂討論的延伸議題", "生活中的相關應用", "文化相關議題"]
        },
        secTitles: {
            pros: 'Q13. 收穫與優點',
            sugg: 'Q14. 建議事項',
            attend: 'Q15. 出席狀況'
        }
    },
    en: {
        title: 'Evaluation Helper',
        titlePE: 'Evaluation (PE)',
        titleGE: 'Evaluation (GE)',
        tabAuto: 'Auto',
        tabManual: 'Manual',
        btnFill: 'Fill Form',
        btnFillCustom: 'Fill Custom Content',
        completed: 'Completed',
        saved: 'Saved to list',
        exists: 'Already exists',
        manualNote: 'Selection questions follow settings in the "Auto" tab.',
        saveBtn: 'Save to Storage',
        loadPlaceholder: 'Load saved...',
        q1: isPE ? '1. Weekly Exercise' : '1. Weekly Hours',
        q2: '2. Understanding',
        q3: isPE ? '3. Active Habit' : (isGE ? '3. Course Issues' : '3. Problem Solving (Multi)'),
        q12: isPE ? '12. Benefits (Multi)' : '12. Cultivation (Multi)',
        q16: '16. Teaching Method (Multi)',
        teacherRating: 'Teacher Rating',
        qLabels: {
            time: isPE ? ["Never", "<1hr", "1-2hr", "2-3hr", ">3hr"] : ["<1hr", "1-3hr", "3-6hr", "6-9hr", ">9hr"],
            degree: ["Very Low", "Low", "Average", "High", "Very High"],
            agree: ["Strongly Disagree", "Disagree", "Average", "Agree", "Strongly Agree"],
            yesno: ["Yes", "No"],
            prob: isPE ? [{l:'Yes',v:'yes'},{l:'No',v:'no'}] : (isGE ? [{l:'Yes (Auto)',v:'yes'},{l:'No (Auto)',v:'no'}] : [
                {l:'Self-study',v:'self'}, {l:'Peers',v:'peer'}, {l:'Teacher',v:'teacher'},
                {l:'AI (ChatGPT)',v:'ChatGPT'}, {l:'Gemini',v:'Gemini'}, {l:'Youtube',v:'youtube'},
                {l:'Give up',v:'no_hard'}, {l:'No interest',v:'no_interest'}
            ]),
            benefitsPE: [{l:'Interest',v:'A'},{l:'Knowledge',v:'B'},{l:'Health',v:'C'},{l:'Habit',v:'D'},{l:'Teamwork',v:'E'},{l:'Attitude',v:'F'}],
            benefitsGE: [{l:'Logic',v:'A'},{l:'Solving',v:'B'},{l:'Thinking',v:'C'},{l:'Teamwork',v:'D'},{l:'Aesthetics',v:'E'},{l:'Social',v:'F'},{l:'Nature',v:'G'},{l:'Global',v:'H'}],
            methods: [{l:'Lecture',v:'A'},{l:'Video',v:'B'},{l:'Group',v:'C'},{l:'Presentation',v:'D'},{l:'Computer',v:'E'},{l:'Experiment',v:'F'},{l:'Practical',v:'G'},{l:'Visit',v:'H'}]
        },
        comments: {
            pros: ["The course content is substantial and clear.", "Teaching style is interesting.", "The teacher is very dedicated.", "Learned a lot, thanks.", "Teacher guides with patience."],
            sugg: ["No other suggestions at the moment.", "Hope to maintain this style.", "Suggest providing more exercises.", "Everything is good.", "No special suggestions."],
            attend: ["The teacher attended all classes in person.", "Teacher is punctual.", "Attendance is good.", "In-person teaching."],
            ge_issues: ["Social issues related to the course", "Related news reports", "Extended topics from discussion", "Applications in daily life", "Cultural issues"]
        },
        secTitles: {
            pros: 'Q13. Gains/Pros',
            sugg: 'Q14. Suggestions',
            attend: 'Q15. Attendance'
        }
    }
};

let userComments = { pros: [], sugg: [], attend: [] };
let currentMode = 'auto'; 

let formState = { 
    time: 3, 
    und: 3, 
    prob: (isPE || isGE) ? ['yes'] : ['self'], 
    teacher: 5,
    benefits: isPE ? ['A', 'B', 'C', 'D', 'F'] : (isGE ? ['B', 'C', 'D', 'E'] : []),
    methods: ['A'] 
};

let manualText = { pros: i18n.zh.comments.pros[0], sugg: i18n.zh.comments.sugg[0], attend: i18n.zh.comments.attend[0] };

function t(key) {
    if (key.includes('.')) {
        const parts = key.split('.');
        return i18n[currentLang][parts[0]][parts[1]];
    }
    return i18n[currentLang][key];
}

function loadUserComments(callback) {
    chrome.storage.local.get(['ntut_comments'], function(result) {
        if (result.ntut_comments) userComments = result.ntut_comments;
        else userComments = { pros: [], sugg: [], attend: [] };
        if (callback) callback();
    });
}

function saveUserComment(type, text) {
    if (!text || text.trim() === "") return;
    if (!userComments[type].includes(text)) {
        userComments[type].unshift(text);
        chrome.storage.local.set({ 'ntut_comments': userComments }, function() {
            renderSavedList(type);
            alert(t('saved'));
        });
    } else {
        alert(t('exists'));
    }
}

function getRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function map5toA(score) { return String.fromCharCode(65 + (5 - score)); }
function mapColor(score) { return score >= 4 ? '#1d6f42' : (score === 3 ? '#5e5e5e' : '#b3261e'); }

function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
        #ntut-eval-helper {
            --md-sys-color-primary: #6750a4;
            --md-sys-color-on-primary: #ffffff;
            --md-sys-color-primary-container: #eaddff;
            --md-sys-color-on-primary-container: #21005d;
            --md-sys-color-secondary-container: #e8def8;
            --md-sys-color-on-secondary-container: #1d192b;
            --md-sys-color-surface: #fef7ff;
            --md-sys-color-surface-container: #f3edf7;
            --md-sys-color-on-surface: #1d1b20;
            --md-sys-color-outline: #79747e;
            
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            position: fixed;
            top: 24px;
            right: 24px;
            z-index: 2147483647;
            background-color: var(--md-sys-color-surface-container);
            border-radius: 28px;
            box-shadow: 0 4px 8px 3px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.3);
            width: 360px;
            max-height: 85vh;
            color: var(--md-sys-color-on-surface);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            transition: opacity 0.2s ease;
        }

        .md3-header {
            padding: 24px 24px 16px 24px;
            background: var(--md-sys-color-surface-container);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .md3-title-row {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .md3-title {
            font-size: 20px;
            line-height: 28px;
            font-weight: 500;
            color: var(--md-sys-color-on-surface);
        }

        .md3-actions {
            display: flex;
            align-items: center;
            gap: 4px;
        }

        .md3-icon-btn {
            cursor: pointer;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            font-size: 14px;
            font-weight: 600;
            color: var(--md-sys-color-on-surface-variant);
            border: 1px solid var(--md-sys-color-outline);
            transition: background 0.2s;
            user-select: none;
        }
        .md3-icon-btn:hover { background: rgba(29, 27, 32, 0.08); }
        .md3-icon-btn.close { border: none; font-size: 18px; }

        .md3-tabs {
            display: flex;
            margin: 0 16px;
            background: var(--md-sys-color-surface);
            border-radius: 24px;
            padding: 4px;
            border: 1px solid rgba(121, 116, 126, 0.2);
        }

        .md3-tab {
            flex: 1;
            text-align: center;
            padding: 10px 0;
            border-radius: 20px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);
            color: var(--md-sys-color-on-surface);
        }

        .md3-tab.active {
            background-color: var(--md-sys-color-secondary-container);
            color: var(--md-sys-color-on-secondary-container);
        }

        .md3-content {
            padding: 24px;
            overflow-y: auto;
            flex: 1;
        }

        .md3-slider-group {
            margin-bottom: 24px;
        }
        
        .md3-label-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            font-size: 14px;
            font-weight: 500;
            color: var(--md-sys-color-primary);
        }

        input[type=range] {
            width: 100%;
            height: 20px;
            background: #e0e0e0;
            border-radius: 20px;
            outline: none;
            -webkit-appearance: none;
        }
        input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 4px;
            height: 30px;
            background: var(--md-sys-color-primary);
            cursor: pointer;
            border-radius: 4px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.3);
            transition: transform 0.1s;
        }
        input[type=range]::-webkit-slider-thumb:hover { transform: scale(1.2); }

        .md3-checkbox-group {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
        }

        .md3-checkbox-label {
            display: flex;
            align-items: center;
            font-size: 14px;
            cursor: pointer;
            color: var(--md-sys-color-on-surface);
        }
        
        .md3-checkbox-label input {
            accent-color: var(--md-sys-color-primary);
            margin-right: 12px;
            width: 18px;
            height: 18px;
        }

        .md3-section-title {
            font-size: 14px;
            font-weight: 500;
            color: var(--md-sys-color-primary);
            margin-bottom: 12px;
            display: block;
        }

        .md3-divider {
            height: 1px;
            background-color: var(--md-sys-color-outline);
            opacity: 0.2;
            margin: 16px 0;
            width: 100%;
        }

        .md3-footer {
            padding: 16px 24px 24px 24px;
            background: var(--md-sys-color-surface-container);
        }

        .md3-btn-primary {
            width: 100%;
            padding: 0 24px;
            height: 40px;
            background-color: var(--md-sys-color-primary);
            color: var(--md-sys-color-on-primary);
            border: none;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 500;
            letter-spacing: 0.1px;
            cursor: pointer;
            transition: box-shadow 0.2s cubic-bezier(0.2, 0, 0, 1);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .md3-btn-primary:hover {
            box-shadow: 0 1px 2px rgba(0,0,0,0.3), 0 1px 3px 1px rgba(0,0,0,0.15);
        }

        .md3-input-block {
            background: var(--md-sys-color-surface);
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 16px;
            border: 1px solid rgba(121, 116, 126, 0.2);
        }
        
        .md3-select {
            width: 100%;
            padding: 8px 12px;
            margin-bottom: 8px;
            border-radius: 8px;
            border: 1px solid var(--md-sys-color-outline);
            background: transparent;
            font-size: 14px;
        }

        .md3-textarea {
            width: 100%;
            padding: 12px;
            border-radius: 8px;
            border: 1px solid var(--md-sys-color-outline);
            background: transparent;
            font-size: 14px;
            font-family: inherit;
            resize: vertical;
            box-sizing: border-box;
        }
        
        .md3-btn-small {
            background-color: var(--md-sys-color-secondary-container);
            color: var(--md-sys-color-on-secondary-container);
            border: none;
            padding: 6px 16px;
            border-radius: 16px;
            font-size: 12px;
            font-weight: 500;
            cursor: pointer;
            margin-top: 8px;
        }
    `;
    document.head.appendChild(style);
}

function createUI() {
    if (document.getElementById('ntut-eval-helper')) return;
    if (!document.forms['FormG'] && window.self !== window.top) return;

    injectStyles();

    const container = document.createElement('div');
    container.id = 'ntut-eval-helper';

    const header = document.createElement('div');
    header.className = 'md3-header';
    header.innerHTML = `
        <span id="helper-title" class="md3-title"></span>
        <div class="md3-actions">
            <div id="lang-switch" class="md3-icon-btn">文</div>
            <div id="close-helper" class="md3-icon-btn close">✕</div>
        </div>
    `;
    container.appendChild(header);

    const tabs = document.createElement('div');
    tabs.className = 'md3-tabs';
    tabs.innerHTML = `
        <div id="tab-auto" class="md3-tab active"></div>
        <div id="tab-manual" class="md3-tab"></div>
    `;
    container.appendChild(tabs);

    const contentBody = document.createElement('div');
    contentBody.className = 'md3-content';
    container.appendChild(contentBody);

    header.querySelector('#close-helper').onclick = () => container.remove();
    header.querySelector('#lang-switch').onclick = toggleLanguage;

    const tabAuto = tabs.querySelector('#tab-auto');
    const tabManual = tabs.querySelector('#tab-manual');

    function switchTab(mode) {
        currentMode = mode;
        if (mode === 'auto') {
            tabAuto.classList.add('active');
            tabManual.classList.remove('active');
            renderAutoView(contentBody);
        } else {
            tabManual.classList.add('active');
            tabAuto.classList.remove('active');
            renderManualView(contentBody);
        }
    }
    tabAuto.onclick = () => switchTab('auto');
    tabManual.onclick = () => switchTab('manual');

    updateUIText();
    renderAutoView(contentBody);

    const footer = document.createElement('div');
    footer.className = 'md3-footer';
    const btnApply = document.createElement('button');
    btnApply.id = 'btn-apply';
    btnApply.className = 'md3-btn-primary';
    btnApply.onclick = (e) => { e.preventDefault(); applyForm(); };
    footer.appendChild(btnApply);
    container.appendChild(footer);

    document.body.appendChild(container);
    updateUIText(); 
}

function toggleLanguage() {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    
    // Update default manual text if it matches the default from previous lang
    const oldComments = i18n[currentLang === 'zh' ? 'en' : 'zh'].comments;
    const newComments = i18n[currentLang].comments;
    if (manualText.pros === oldComments.pros[0]) manualText.pros = newComments.pros[0];
    if (manualText.sugg === oldComments.sugg[0]) manualText.sugg = newComments.sugg[0];
    if (manualText.attend === oldComments.attend[0]) manualText.attend = newComments.attend[0];

    updateUIText();
    const contentBody = document.querySelector('#ntut-eval-helper .md3-content');
    if (contentBody) {
        if (currentMode === 'auto') renderAutoView(contentBody);
        else renderManualView(contentBody);
    }
}

function updateUIText() {
    const titleEl = document.getElementById('helper-title');
    if (titleEl) {
        if (isPE) titleEl.innerText = t('titlePE');
        else if (isGE) titleEl.innerText = t('titleGE');
        else titleEl.innerText = t('title');
    }
    
    const tabAuto = document.getElementById('tab-auto');
    const tabManual = document.getElementById('tab-manual');
    if (tabAuto) tabAuto.innerText = t('tabAuto');
    if (tabManual) tabManual.innerText = t('tabManual');

    const btn = document.getElementById('btn-apply');
    if (btn) btn.innerText = currentMode === 'auto' ? t('btnFill') : t('btnFillCustom');

    const langBtn = document.getElementById('lang-switch');
    if(langBtn) langBtn.innerText = currentLang === 'zh' ? '文' : 'EN';
}

function renderAutoView(container) {
    container.innerHTML = '';
    
    function addSlider(label, key, options) {
        const wrap = document.createElement('div');
        wrap.className = 'md3-slider-group';
        wrap.innerHTML = `
            <div class="md3-label-row">
                <span>${label}</span>
                <span id="val-${key}" style="color:${mapColor(formState[key])}">${options[formState[key]-1]}</span>
            </div>
            <input type="range" min="1" max="5" step="1" value="${formState[key]}">
        `;
        const input = wrap.querySelector('input');
        input.oninput = function() {
            const val = parseInt(this.value);
            formState[key] = val;
            const display = wrap.querySelector(`#val-${key}`);
            display.innerText = options[val-1];
            display.style.color = mapColor(val);
        };
        container.appendChild(wrap);
    }

    addSlider(t('q1'), 'time', t('qLabels.time'));
    addSlider(t('q2'), 'und', t('qLabels.degree'));

    const q3Wrap = document.createElement('div');
    q3Wrap.className = 'md3-slider-group';
    q3Wrap.innerHTML = `<span class="md3-section-title">${t('q3')}</span>`;
    
    const q3Opts = t('qLabels.prob');
    if (isPE || isGE) {
        q3Opts.forEach(opt => {
            const label = document.createElement('label'); 
            label.className = 'md3-checkbox-label';
            label.style.marginBottom = '8px';
            const radio = document.createElement('input'); radio.type = 'radio'; radio.name = 'ui_q3'; radio.value = opt.v;
            if (formState.prob.includes(opt.v)) radio.checked = true;
            radio.onchange = function() { formState.prob = [this.value]; };
            label.prepend(radio); label.appendChild(document.createTextNode(opt.l)); q3Wrap.appendChild(label);
        });
    } else {
        const grid = document.createElement('div');
        grid.className = 'md3-checkbox-group';
        q3Opts.forEach(opt => {
            const label = document.createElement('label'); 
            label.className = 'md3-checkbox-label';
            const checkbox = document.createElement('input'); checkbox.type = 'checkbox'; checkbox.value = opt.v;
            if (formState.prob.includes(opt.v)) checkbox.checked = true;
            checkbox.onchange = function() {
                const isChecked = this.checked; const val = this.value;
                if (isChecked) {
                    if (!['no_hard', 'no_interest'].includes(val)) formState.prob = formState.prob.filter(v => !['no_hard', 'no_interest'].includes(v));
                    else formState.prob = [val]; 
                    if (!formState.prob.includes(val)) formState.prob.push(val);
                } else formState.prob = formState.prob.filter(v => v !== val);
                q3Wrap.querySelectorAll('input').forEach(ck => ck.checked = formState.prob.includes(ck.value));
            };
            label.appendChild(checkbox); label.appendChild(document.createTextNode(opt.l)); grid.appendChild(label);
        });
        q3Wrap.appendChild(grid);
    }
    container.appendChild(q3Wrap);
    
    const divider1 = document.createElement('div'); divider1.className = 'md3-divider'; container.appendChild(divider1);

    if (isPE || isGE) {
        const q12Wrap = document.createElement('div');
        q12Wrap.className = 'md3-slider-group';
        q12Wrap.innerHTML = `<span class="md3-section-title">${t('q12')}</span>`;
        
        const q12Opts = isPE ? t('qLabels.benefitsPE') : t('qLabels.benefitsGE');
        const grid12 = document.createElement('div');
        grid12.className = 'md3-checkbox-group';
        q12Opts.forEach(opt => {
            const label = document.createElement('label'); 
            label.className = 'md3-checkbox-label';
            const checkbox = document.createElement('input'); checkbox.type = 'checkbox'; checkbox.value = opt.v;
            if (formState.benefits.includes(opt.v)) checkbox.checked = true;
            checkbox.onchange = function() {
                if(this.checked) { if(!formState.benefits.includes(this.value)) formState.benefits.push(this.value); }
                else { formState.benefits = formState.benefits.filter(v => v !== this.value); }
            };
            label.appendChild(checkbox); label.appendChild(document.createTextNode(opt.l)); grid12.appendChild(label);
        });
        q12Wrap.appendChild(grid12); container.appendChild(q12Wrap);
        
        const divider2 = document.createElement('div'); divider2.className = 'md3-divider'; container.appendChild(divider2);
    }
    
    const q16Wrap = document.createElement('div');
    q16Wrap.className = 'md3-slider-group';
    q16Wrap.innerHTML = `<span class="md3-section-title">${t('q16')}</span>`;
    const q16Opts = t('qLabels.methods');
    const grid16 = document.createElement('div');
    grid16.className = 'md3-checkbox-group';
    q16Opts.forEach(opt => {
        const label = document.createElement('label'); 
        label.className = 'md3-checkbox-label';
        const checkbox = document.createElement('input'); checkbox.type = 'checkbox'; checkbox.value = opt.v;
        if (formState.methods.includes(opt.v)) checkbox.checked = true;
        checkbox.onchange = function() {
            if(this.checked) { if(!formState.methods.includes(this.value)) formState.methods.push(this.value); }
            else { formState.methods = formState.methods.filter(v => v !== this.value); }
        };
        label.appendChild(checkbox); label.appendChild(document.createTextNode(opt.l)); grid16.appendChild(label);
    });
    q16Wrap.appendChild(grid16); container.appendChild(q16Wrap);

    const divider3 = document.createElement('div'); divider3.className = 'md3-divider'; container.appendChild(divider3);

    addSlider(t('teacherRating'), 'teacher', t('qLabels.agree'));
    updateUIText();
}

function renderManualView(container) {
    container.innerHTML = `<div style="font-size:13px; color:var(--md-sys-color-on-surface-variant); margin-bottom:16px;">${t('manualNote')}</div>`;
    
    function createInputBlock(title, key, secKey) {
        const block = document.createElement('div');
        block.className = 'md3-input-block';
        
        const tools = document.createElement('div');
        tools.style.display = 'flex'; tools.style.justifyContent = 'space-between'; tools.style.marginBottom = '8px';
        tools.innerHTML = `<span style="font-weight:500; font-size:14px; color:var(--md-sys-color-primary)">${title}</span>`;
        
        const select = document.createElement('select');
        select.className = 'md3-select';
        select.innerHTML = `<option value="">${t('loadPlaceholder')}</option>`;
        
        const currentComments = i18n[currentLang].comments[secKey];
        [...userComments[secKey], ...currentComments].forEach(opt => {
            const opTag = document.createElement('option'); opTag.value = opt; opTag.innerText = opt.substring(0, 25) + '...'; select.appendChild(opTag);
        });
        select.onchange = function() { if(this.value) { textarea.value = this.value; manualText[secKey] = this.value; } };
        
        block.appendChild(tools);
        block.appendChild(select);
        
        const textarea = document.createElement('textarea');
        textarea.className = 'md3-textarea';
        textarea.value = manualText[secKey]; textarea.rows = 3; 
        textarea.oninput = function() { manualText[secKey] = this.value; };
        block.appendChild(textarea);
        
        const btnSave = document.createElement('button');
        btnSave.className = 'md3-btn-small';
        btnSave.innerText = t('saveBtn');
        btnSave.onclick = () => saveUserComment(secKey, textarea.value);
        block.appendChild(btnSave); container.appendChild(block);
    }
    createInputBlock(t('secTitles.pros'), t('secTitles.pros'), 'pros'); 
    createInputBlock(t('secTitles.sugg'), t('secTitles.sugg'), 'sugg'); 
    createInputBlock(t('secTitles.attend'), t('secTitles.attend'), 'attend');
    updateUIText();
}

function renderSavedList(key) {
    if (currentMode !== 'manual') return;
    const body = document.querySelector('#ntut-eval-helper .md3-content');
    if(body) renderManualView(body);
}

function applyForm() {
    const form = document.forms['FormG'];
    if (!form) return alert('FormG not found');
    const dec = form.querySelector('input[name="dec"]'); if(dec) dec.checked = true;

    checkInput(form, 'ANS1', map5toA(formState.time));
    checkInput(form, 'ANS2', map5toA(formState.und));

    clearInputs(form, ['ANS3', 'ANS3A']);
    const q3Vals = formState.prob;

    if (isPE) {
        const val = q3Vals[0] === 'yes' ? 'A' : 'B';
        checkInput(form, 'ANS3', val);
    } else if (isGE) {
        const val = q3Vals[0] === 'yes' ? 'A' : 'B';
        checkInput(form, 'ANS3', val);
        if (val === 'A') {
            const issueInput = form.querySelector('input[name="ANS3A"]');
            if (issueInput) issueInput.value = getRandom(i18n[currentLang].comments.ge_issues);
        } else {
            const reasonInput = form.querySelector('input[name="ANS3BA"]');
            if (reasonInput) reasonInput.value = currentLang === 'zh' ? "無" : "None";
        }
    } else {
        const isBad = q3Vals.includes('no_hard') || q3Vals.includes('no_interest');
        if (isBad || q3Vals.length === 0) {
            checkInput(form, 'ANS3', 'B');
            const reason = form.querySelector('input[name="ANS3BA"]');
            if (reason) reason.value = q3Vals.includes('no_interest') ? (currentLang === 'zh' ? "沒興趣深入" : "No interest") : (currentLang === 'zh' ? "課程難度太高" : "Too difficult");
        } else {
            checkInput(form, 'ANS3', 'A');
            if (q3Vals.includes('teacher')) checkInput(form, 'ANS3A', 'A', true);
            if (q3Vals.includes('self'))    checkInput(form, 'ANS3A', 'B', true);
            if (q3Vals.includes('peer'))    checkInput(form, 'ANS3A', 'C', true);
            let otherTexts = [];
            if (q3Vals.includes('ChatGPT')) otherTexts.push('ChatGPT');
            if (q3Vals.includes('Gemini')) otherTexts.push('Gemini');
            if (q3Vals.includes('youtube')) otherTexts.push('Youtube');
            if (otherTexts.length > 0) {
                checkInput(form, 'ANS3A', 'D', true);
                const otherInput = form.querySelector('input[name="ANS3AD"]');
                if (otherInput) otherInput.value = otherTexts.join(', ');
            }
        }
    }

    const teacherOption = map5toA(formState.teacher);
    const maxRatingQ = (isPE || isGE) ? 11 : 12; 
    for (let i = 4; i <= maxRatingQ; i++) checkInput(form, 'ANS' + i, teacherOption);

    if (isPE || isGE) {
        clearInputs(form, ['ANS12']);
        formState.benefits.forEach(val => checkInput(form, 'ANS12', val, true));
    }

    clearInputs(form, ['ANS16']);
    formState.methods.forEach(val => checkInput(form, 'ANS16', val, true));

    const cmt = i18n[currentLang].comments;
    if (currentMode === 'auto') {
        if (formState.teacher <= 2) {
            fillText(form, 'ANS13', currentLang === 'zh' ? "課程內容較鬆散。" : "Content is loose."); 
            fillText(form, 'ANS14', currentLang === 'zh' ? "建議加強備課。" : "Suggest better preparation."); 
            fillText(form, 'ANS15', currentLang === 'zh' ? "老師出席狀況尚可。" : "Attendance is average.");
        } else {
            fillText(form, 'ANS13', getRandom(cmt.pros)); fillText(form, 'ANS14', getRandom(cmt.sugg)); fillText(form, 'ANS15', getRandom(cmt.attend));
        }
    } else {
        fillText(form, 'ANS13', manualText.pros); fillText(form, 'ANS14', manualText.sugg); fillText(form, 'ANS15', manualText.attend);
    }

    const btn = document.querySelector('#btn-apply');
    const originalText = btn.innerText;
    btn.innerText = t('completed');
    setTimeout(() => btn.innerText = originalText, 1500);
}

function checkInput(form, name, value, append = false) {
    const inputs = form.querySelectorAll(`input[name="${name}"]`);
    if (!append && inputs.length > 0 && (inputs[0].type === 'radio' || inputs[0].type === 'checkbox')) {}
    for (let input of inputs) {
        if (input.value === value) input.checked = true;
    }
}
function clearInputs(form, names) {
    names.forEach(name => {
        const inputs = form.querySelectorAll(`input[name="${name}"]`);
        inputs.forEach(i => i.checked = false);
    });
    if(names.includes('ANS3')) {
         const r = form.querySelector('input[name="ANS3BA"]'); if(r) r.value = '';
         const o = form.querySelector('input[name="ANS3AD"]'); if(o) o.value = '';
         const g = form.querySelector('input[name="ANS3A"]'); if(g && g.type=='text') g.value = ''; 
    }
}
function fillText(form, name, text) {
    const input = form.querySelector(`textarea[name="${name}"]`);
    if (input) input.value = text;
}

if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', () => loadUserComments(createUI)); } 
else { loadUserComments(createUI); }