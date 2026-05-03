document.addEventListener('DOMContentLoaded', () => {
    const bionicToggle = document.getElementById('toggle-bionic');
    const dictToggle = document.getElementById('toggle-dict');
    const ttsToggle = document.getElementById('toggle-tts');
    const bgColorSelect = document.getElementById('bg-color');
    const textColorSelect = document.getElementById('text-color');
    const cbModeSelect = document.getElementById('cb-mode');
    const translateLangSelect = document.getElementById('translate-lang');
    const fontFamilySelect = document.getElementById('font-family');
    const fontSizeSelect = document.getElementById('font-size');
    const lineSpacingSelect = document.getElementById('line-spacing');
    const geminiKeyInput = document.getElementById('gemini-key');
    const btnAiSummarize = document.getElementById('btn-ai-summarize');

    // Load saved settings
    chrome.storage.sync.get(['bionicEnabled', 'dictEnabled', 'ttsEnabled', 'bgColor', 'textColor', 'cbMode', 'translateLang', 'fontFamily', 'fontSize', 'lineSpacing', 'geminiKey'], (data) => {
        bionicToggle.checked = data.bionicEnabled !== false; // Default true
        dictToggle.checked = data.dictEnabled !== false; // Default true
        ttsToggle.checked = data.ttsEnabled === true; // Default false
        if (data.bgColor) bgColorSelect.value = data.bgColor;
        if (data.textColor) textColorSelect.value = data.textColor;
        if (data.cbMode) cbModeSelect.value = data.cbMode;
        if (data.translateLang) translateLangSelect.value = data.translateLang;
        if (data.fontFamily) fontFamilySelect.value = data.fontFamily;
        if (data.fontSize) fontSizeSelect.value = data.fontSize;
        if (data.lineSpacing) lineSpacingSelect.value = data.lineSpacing;
        if (data.geminiKey) geminiKeyInput.value = data.geminiKey;
    });

    function saveSettings() {
        const settings = {
            bionicEnabled: bionicToggle.checked,
            dictEnabled: dictToggle.checked,
            ttsEnabled: ttsToggle.checked,
            bgColor: bgColorSelect.value,
            textColor: textColorSelect.value,
            cbMode: cbModeSelect.value,
            translateLang: translateLangSelect.value,
            fontFamily: fontFamilySelect.value,
            fontSize: fontSizeSelect.value,
            lineSpacing: lineSpacingSelect.value
        };
        chrome.storage.sync.set(settings, () => {
            // Tell content script to update live
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                if(tabs[0]) {
                    // Send to the active tab to update live
                    // Will fail on protected pages like chrome:// but that's expected
                    chrome.tabs.sendMessage(tabs[0].id, {action: "updateSettings", settings: settings}).catch(err => {
                        // Ignore errors from tabs that don't have the content script injected
                        console.log("Could not send message to tab");
                    });
                }
            });
        });
    }

    bionicToggle.addEventListener('change', saveSettings);
    bgColorSelect.addEventListener('change', saveSettings);
    textColorSelect.addEventListener('change', saveSettings);
    dictToggle.addEventListener('change', saveSettings);
    ttsToggle.addEventListener('change', saveSettings);
    cbModeSelect.addEventListener('change', saveSettings);
    translateLangSelect.addEventListener('change', saveSettings);
    fontFamilySelect.addEventListener('change', saveSettings);
    fontSizeSelect.addEventListener('change', saveSettings);
    lineSpacingSelect.addEventListener('change', saveSettings);
    
    geminiKeyInput.addEventListener('change', () => {
        chrome.storage.sync.set({ geminiKey: geminiKeyInput.value });
    });

    btnAiSummarize.addEventListener('click', () => {
        btnAiSummarize.innerHTML = '&#8987; Summarizing... Please wait';
        btnAiSummarize.disabled = true;
        btnAiSummarize.style.opacity = '0.7';
        btnAiSummarize.style.cursor = 'wait';

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if(tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, {action: "triggerAISummary"});
            }
        });

        // Close the popup after a brief moment to let user see the on-page AI modal
        setTimeout(() => {
            window.close();
        }, 1200);
    });
});
