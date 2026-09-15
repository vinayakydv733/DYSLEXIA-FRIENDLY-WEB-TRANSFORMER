document.addEventListener('DOMContentLoaded', () => {
    // UI Elements
    const presetMode = document.getElementById('preset-mode');
    
    const bionicToggle = document.getElementById('toggle-bionic');
    
    const fontFamilySelect = document.getElementById('font-family');
    const fontSizeSelect = document.getElementById('font-size');
    const lineSpacingSelect = document.getElementById('line-spacing');
    const bgColorSelect = document.getElementById('bg-color');
    const textColorSelect = document.getElementById('text-color');
    const cbModeSelect = document.getElementById('cb-mode');
    
    const ttsToggle = document.getElementById('toggle-tts');
    const ttsSpeedSelect = document.getElementById('tts-speed');
    
    const dictToggle = document.getElementById('toggle-dict');
    const readingLevelSelect = document.getElementById('reading-level');
    const translateLangSelect = document.getElementById('translate-lang');
    
    const btnAiSummarize = document.getElementById('btn-ai-summarize');
    const btnAiSimplify = document.getElementById('btn-ai-simplify');

    // Default settings
    const defaultSettings = {
        bionicEnabled: true,
        fontFamily: 'default',
        fontSize: 'default',
        bgColor: 'default',
        textColor: 'default',
        cbMode: 'none',
        ttsEnabled: true,
        ttsSpeed: '1.0',
        dictEnabled: true,
        readingLevel: 'simple',
        translateLang: 'none',
        presetMode: 'custom'
    };

    let userCustomSettings = {};

    // Load saved settings
    chrome.storage.sync.get(Object.keys(defaultSettings), (data) => {
        const settings = { ...defaultSettings, ...data };
        
        // Populate UI
        if(presetMode) presetMode.value = settings.presetMode;
        
        if(bionicToggle) bionicToggle.checked = settings.bionicEnabled;
        if(fontFamilySelect) fontFamilySelect.value = settings.fontFamily;
        if(fontSizeSelect) fontSizeSelect.value = settings.fontSize;
        if(bgColorSelect) bgColorSelect.value = settings.bgColor;
        if(textColorSelect) textColorSelect.value = settings.textColor;
        if(cbModeSelect) cbModeSelect.value = settings.cbMode;
        
        if(ttsToggle) ttsToggle.checked = settings.ttsEnabled;
        if(ttsSpeedSelect) ttsSpeedSelect.value = settings.ttsSpeed || '1.0';
        
        if(dictToggle) dictToggle.checked = settings.dictEnabled;
        if(readingLevelSelect) readingLevelSelect.value = settings.readingLevel || 'simple';
        if(translateLangSelect) translateLangSelect.value = settings.translateLang;

        // Backup custom settings if current mode is custom
        if (settings.presetMode === 'custom') {
            userCustomSettings = { ...settings };
        }
    });

    function saveSettings(skipPresetUpdate = false) {
        if (!skipPresetUpdate && presetMode && presetMode.value !== 'custom') {
            presetMode.value = 'custom';
        }

        const settings = {
            presetMode: presetMode ? presetMode.value : 'custom',
            bionicEnabled: bionicToggle ? bionicToggle.checked : true,
            fontFamily: fontFamilySelect ? fontFamilySelect.value : 'default',
            fontSize: fontSizeSelect ? fontSizeSelect.value : 'default',
            bgColor: bgColorSelect ? bgColorSelect.value : 'default',
            textColor: textColorSelect ? textColorSelect.value : 'default',
            cbMode: cbModeSelect ? cbModeSelect.value : 'none',
            ttsEnabled: ttsToggle ? ttsToggle.checked : true,
            ttsSpeed: ttsSpeedSelect ? ttsSpeedSelect.value : '1.0',
            dictEnabled: dictToggle ? dictToggle.checked : true,
            readingLevel: readingLevelSelect ? readingLevelSelect.value : 'simple',
            translateLang: translateLangSelect ? translateLangSelect.value : 'none'
        };

        if (presetMode && presetMode.value === 'custom') {
            userCustomSettings = { ...settings };
        }

        chrome.storage.sync.set(settings, () => {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                if(tabs[0]) {
                    chrome.tabs.sendMessage(tabs[0].id, {action: "updateSettings", settings: settings}).catch(() => {});
                }
            });
        });
    }

    // Presets Logic
    if (presetMode) {
        presetMode.addEventListener('change', () => {
            const mode = presetMode.value;
            if (mode === 'focus') {
                if(bionicToggle) bionicToggle.checked = true;
                if(bgColorSelect) bgColorSelect.value = "#E0F4FF";
                if(fontSizeSelect) fontSizeSelect.value = "default";
                if(fontFamilySelect) fontFamilySelect.value = "'Lexend', sans-serif";
                if(textColorSelect) textColorSelect.value = "default";
            } else if (mode === 'easier') {
                if(fontFamilySelect) fontFamilySelect.value = "Arial, sans-serif";
                if(fontSizeSelect) fontSizeSelect.value = "22px";
                if(bionicToggle) bionicToggle.checked = false;
                if(bgColorSelect) bgColorSelect.value = "#FDF6E3";
                if(textColorSelect) textColorSelect.value = "#1A202C";
            } else if (mode === 'listen') {
                if(ttsToggle) ttsToggle.checked = true;
                if(ttsSpeedSelect) ttsSpeedSelect.value = "0.7";
            } else if (mode === 'indic') {
                if(fontFamilySelect) fontFamilySelect.value = "default";
                if(fontSizeSelect) fontSizeSelect.value = "18px";
                if(translateLangSelect) translateLangSelect.value = "hi";
                if(ttsToggle) ttsToggle.checked = true;
            } else if (mode === 'custom') {
                if (Object.keys(userCustomSettings).length > 0) {
                    if(bionicToggle) bionicToggle.checked = userCustomSettings.bionicEnabled !== false;
                    if(fontFamilySelect) fontFamilySelect.value = userCustomSettings.fontFamily || 'default';
                    if(fontSizeSelect) fontSizeSelect.value = userCustomSettings.fontSize || 'default';
                    if(bgColorSelect) bgColorSelect.value = userCustomSettings.bgColor || 'default';
                    if(textColorSelect) textColorSelect.value = userCustomSettings.textColor || 'default';
                    if(cbModeSelect) cbModeSelect.value = userCustomSettings.cbMode || 'none';
                }
            }
            
            saveSettings(true);
        });
    }

    // Event Listeners for all controls
    const controls = [
        bionicToggle, fontFamilySelect, fontSizeSelect,
        bgColorSelect, textColorSelect, cbModeSelect, ttsToggle, ttsSpeedSelect,
        dictToggle, translateLangSelect
    ];
    if (readingLevelSelect) controls.push(readingLevelSelect);
    
    controls.forEach(ctrl => {
        if(ctrl) ctrl.addEventListener('change', () => saveSettings(false));
    });

    function triggerAIAction(btn, mode) {
        const originalText = btn.innerHTML;
        btn.innerHTML = '⏳ Processing...';
        btn.disabled = true;
        btn.style.opacity = '0.7';

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if(tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, {action: "triggerAIAction", mode: mode}).catch(() => {});
            }
        });

        setTimeout(() => { window.close(); }, 800);
    }

    btnAiSummarize.addEventListener('click', () => triggerAIAction(btnAiSummarize, 'summarize'));
    btnAiSimplify.addEventListener('click', () => triggerAIAction(btnAiSimplify, 'simplify'));
});
