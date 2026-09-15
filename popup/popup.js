document.addEventListener('DOMContentLoaded', () => {
    // UI Elements
    const presetMode = document.getElementById('preset-mode');
    
    const bionicToggle = document.getElementById('toggle-bionic');
    const rulerToggle = document.getElementById('toggle-ruler');
    
    const fontFamilySelect = document.getElementById('font-family');
    const fontSizeSelect = document.getElementById('font-size');
    const lineSpacingSelect = document.getElementById('line-spacing');
    const bgColorSelect = document.getElementById('bg-color');
    const textColorSelect = document.getElementById('text-color');
    const cbModeSelect = document.getElementById('cb-mode');
    
    const ttsToggle = document.getElementById('toggle-tts');
    const ttsSpeedSelect = document.getElementById('tts-speed');
    
    const dictToggle = document.getElementById('toggle-dict');
    const translateLangSelect = document.getElementById('translate-lang');
    
    const geminiKeyInput = document.getElementById('gemini-key');
    const btnAiSummarize = document.getElementById('btn-ai-summarize');
    const btnAiSimplify = document.getElementById('btn-ai-simplify');

    // Default settings
    const defaultSettings = {
        bionicEnabled: true,
        rulerEnabled: false,
        fontFamily: 'default',
        fontSize: 'default',
        lineSpacing: 'default',
        bgColor: 'default',
        textColor: 'default',
        cbMode: 'none',
        ttsEnabled: true,
        ttsSpeed: '1.0',
        dictEnabled: true,
        translateLang: 'none',
        geminiKey: '',
        presetMode: 'custom'
    };

    let userCustomSettings = {};

    // Load saved settings
    chrome.storage.sync.get(Object.keys(defaultSettings), (data) => {
        const settings = { ...defaultSettings, ...data };
        
        // Populate UI
        presetMode.value = settings.presetMode;
        
        bionicToggle.checked = settings.bionicEnabled;
        rulerToggle.checked = settings.rulerEnabled;
        fontFamilySelect.value = settings.fontFamily;
        fontSizeSelect.value = settings.fontSize;
        lineSpacingSelect.value = settings.lineSpacing;
        bgColorSelect.value = settings.bgColor;
        textColorSelect.value = settings.textColor;
        cbModeSelect.value = settings.cbMode;
        
        ttsToggle.checked = settings.ttsEnabled;
        ttsSpeedSelect.value = settings.ttsSpeed || '1.0';
        
        dictToggle.checked = settings.dictEnabled;
        translateLangSelect.value = settings.translateLang;
        geminiKeyInput.value = settings.geminiKey;

        // Backup custom settings if current mode is custom
        if (settings.presetMode === 'custom') {
            userCustomSettings = { ...settings };
        }
    });

    function saveSettings(skipPresetUpdate = false) {
        if (!skipPresetUpdate && presetMode.value !== 'custom') {
            // User manually changed a setting while a preset was active.
            // Move to custom mode automatically.
            presetMode.value = 'custom';
        }

        const settings = {
            presetMode: presetMode.value,
            bionicEnabled: bionicToggle.checked,
            rulerEnabled: rulerToggle.checked,
            fontFamily: fontFamilySelect.value,
            fontSize: fontSizeSelect.value,
            lineSpacing: lineSpacingSelect.value,
            bgColor: bgColorSelect.value,
            textColor: textColorSelect.value,
            cbMode: cbModeSelect.value,
            ttsEnabled: ttsToggle.checked,
            ttsSpeed: ttsSpeedSelect.value,
            dictEnabled: dictToggle.checked,
            translateLang: translateLangSelect.value
        };

        if (presetMode.value === 'custom') {
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
    presetMode.addEventListener('change', () => {
        const mode = presetMode.value;
        if (mode === 'dyslexia') {
            fontFamilySelect.value = "'Lexend', sans-serif";
            lineSpacingSelect.value = "1.8";
            bionicToggle.checked = true;
            rulerToggle.checked = true;
            bgColorSelect.value = "#FDF6E3"; // Warm Sepia
            textColorSelect.value = "#1A202C"; // Dark Navy
            fontSizeSelect.value = "18px";
        } else if (mode === 'low_vision') {
            fontFamilySelect.value = "Arial, sans-serif";
            fontSizeSelect.value = "26px"; // Huge
            lineSpacingSelect.value = "1.8";
            bgColorSelect.value = "#1A202C"; // Dark Mode
            textColorSelect.value = "#FFFFFF"; // White
            bionicToggle.checked = false;
            rulerToggle.checked = false;
        } else if (mode === 'focus') {
            rulerToggle.checked = true;
            bionicToggle.checked = false;
            lineSpacingSelect.value = "2.0";
            bgColorSelect.value = "#E0F4FF"; // Soft blue
            fontSizeSelect.value = "18px";
            fontFamilySelect.value = "default";
            textColorSelect.value = "default";
        } else if (mode === 'custom') {
            // Restore custom settings
            if (Object.keys(userCustomSettings).length > 0) {
                bionicToggle.checked = userCustomSettings.bionicEnabled !== false;
                rulerToggle.checked = userCustomSettings.rulerEnabled === true;
                fontFamilySelect.value = userCustomSettings.fontFamily || 'default';
                fontSizeSelect.value = userCustomSettings.fontSize || 'default';
                lineSpacingSelect.value = userCustomSettings.lineSpacing || 'default';
                bgColorSelect.value = userCustomSettings.bgColor || 'default';
                textColorSelect.value = userCustomSettings.textColor || 'default';
                cbModeSelect.value = userCustomSettings.cbMode || 'none';
            }
        }
        
        saveSettings(true); // Save without triggering preset override
    });

    // Event Listeners for all controls
    const controls = [
        bionicToggle, rulerToggle, fontFamilySelect, fontSizeSelect, lineSpacingSelect,
        bgColorSelect, textColorSelect, cbModeSelect, ttsToggle, ttsSpeedSelect,
        dictToggle, translateLangSelect
    ];
    
    controls.forEach(ctrl => {
        ctrl.addEventListener('change', () => saveSettings(false));
    });

    geminiKeyInput.addEventListener('change', () => {
        chrome.storage.sync.set({ geminiKey: geminiKeyInput.value });
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
