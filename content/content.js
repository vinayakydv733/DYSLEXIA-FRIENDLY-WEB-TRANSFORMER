// content/content.js
window.currentSettings = {
    bionicEnabled: false,
    dictEnabled: false,
    ttsEnabled: false,
    bgColor: 'default',
    textColor: 'default',
    cbMode: 'none'
};

const COLOR_STYLE_ID = 'dyslexia-friendly-colors';

function applyColors(bgColor, textColor) {
    let styleEl = document.getElementById(COLOR_STYLE_ID);
    
    if (bgColor === 'default' && textColor === 'default') {
        if (styleEl) styleEl.remove();
        return;
    }

    if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = COLOR_STYLE_ID;
        document.head.appendChild(styleEl);
    }
    
    let bgRule = bgColor !== 'default' ? `background-color: ${bgColor} !important;` : '';
    let textRule = textColor !== 'default' ? `color: ${textColor} !important;` : '';

    styleEl.textContent = `
        *:not(img):not(video):not(canvas):not(svg) {
            ${bgRule}
            ${textRule}
        }
    `;
}

function processSettings(settings) {
    window.currentSettings = settings;

    // 1. Accessibility Colors
    let isCbActive = false;
    if (window.applyColorBlindnessMode) {
        isCbActive = window.applyColorBlindnessMode(settings.cbMode);
    }
    
    if (!isCbActive) {
        applyColors(settings.bgColor, settings.textColor);
    } else {
        let styleEl = document.getElementById(COLOR_STYLE_ID);
        if (styleEl) styleEl.remove();
    }

    // 2. Bionic Engine
    if (settings.bionicEnabled) {
        if (window.applyBionicReading) window.applyBionicReading();
    } else {
        if (window.removeBionicReading) window.removeBionicReading();
    }

    // 3. Translation Client
    if (settings.dictEnabled) {
        if (window.enableDictionary) window.enableDictionary();
    } else {
        if (window.disableDictionary) window.disableDictionary();
    }

    // 4. TTS Engine
    if (settings.ttsEnabled) {
        if (window.enableTTS) window.enableTTS();
    } else {
        if (window.disableTTS) window.disableTTS();
    }
}

// Initial Load
chrome.storage.sync.get(['bionicEnabled', 'dictEnabled', 'ttsEnabled', 'bgColor', 'textColor', 'cbMode'], (data) => {
    let settings = {
        bionicEnabled: data.bionicEnabled !== false,
        dictEnabled: data.dictEnabled !== false,
        ttsEnabled: data.ttsEnabled === true,
        bgColor: data.bgColor || 'default',
        textColor: data.textColor || 'default',
        cbMode: data.cbMode || 'none'
    };
    processSettings(settings);
});

// Listen for updates from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "updateSettings") {
        processSettings(request.settings);
    }
});
