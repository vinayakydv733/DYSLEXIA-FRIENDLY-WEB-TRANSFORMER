// content/content.js
window.currentSettings = {
    bionicEnabled: false,
    dictEnabled: false,
    ttsEnabled: false,
    bgColor: 'default',
    textColor: 'default',
    cbMode: 'none',
    translateLang: 'none',
    fontFamily: 'default',
    fontSize: 'default',
    lineSpacing: 'default'
};

const COLOR_STYLE_ID = 'dyslexia-friendly-colors';
const TYPOGRAPHY_STYLE_ID = 'dyslexia-friendly-typography';

function applyTypography(settings) {
    let styleEl = document.getElementById(TYPOGRAPHY_STYLE_ID);
    
    if (settings.fontFamily === 'default' && settings.fontSize === 'default' && settings.lineSpacing === 'default') {
        if (styleEl) styleEl.remove();
        return;
    }

    if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = TYPOGRAPHY_STYLE_ID;
        document.head.appendChild(styleEl);
    }
    
    let css = '';
    const allTags = 'body, p, h1, h2, h3, h4, h5, h6, li, a, span, div, td, th, label, input, button, textarea';
    const textTags = 'p, li, a, span, td, th, label, input, button, textarea';

    if (settings.fontFamily !== 'default') {
        css += `${allTags} { font-family: ${settings.fontFamily} !important; }\n`;
    }
    if (settings.fontSize !== 'default') {
        css += `${textTags} { font-size: ${settings.fontSize} !important; }\n`;
    }
    if (settings.lineSpacing !== 'default') {
        css += `${allTags} { line-height: ${settings.lineSpacing} !important; }\n`;
    }

    styleEl.textContent = css;
}

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

    // 1.5 Typography
    applyTypography(settings);

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
chrome.storage.sync.get(['bionicEnabled', 'dictEnabled', 'ttsEnabled', 'bgColor', 'textColor', 'cbMode', 'translateLang', 'fontFamily', 'fontSize', 'lineSpacing'], (data) => {
    let settings = {
        bionicEnabled: data.bionicEnabled !== false,
        dictEnabled: data.dictEnabled !== false,
        ttsEnabled: data.ttsEnabled === true,
        bgColor: data.bgColor || 'default',
        textColor: data.textColor || 'default',
        cbMode: data.cbMode || 'none',
        translateLang: data.translateLang || 'none',
        fontFamily: data.fontFamily || 'default',
        fontSize: data.fontSize || 'default',
        lineSpacing: data.lineSpacing || 'default'
    };
    processSettings(settings);
});

// Listen for updates from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "updateSettings") {
        processSettings(request.settings);
    }
});
