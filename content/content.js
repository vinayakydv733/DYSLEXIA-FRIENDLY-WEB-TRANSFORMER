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
    lineSpacing: 'default',
    rulerEnabled: false
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

    // 5. Reading Ruler
    if (settings.rulerEnabled) {
        if (window.enableReadingRuler) window.enableReadingRuler();
    } else {
        if (window.disableReadingRuler) window.disableReadingRuler();
    }
}

// Initial Load
chrome.storage.sync.get(['bionicEnabled', 'dictEnabled', 'ttsEnabled', 'bgColor', 'textColor', 'cbMode', 'translateLang', 'fontFamily', 'fontSize', 'lineSpacing', 'rulerEnabled'], (data) => {
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
        lineSpacing: data.lineSpacing || 'default',
        rulerEnabled: data.rulerEnabled === true
    };
    processSettings(settings);
});

// Listen for updates from popup and background shortcuts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "updateSettings") {
        processSettings(request.settings);
    } else if (request.action === "keyboardShortcut") {
        const cmd = request.command;
        if (cmd === 'toggle-ruler') {
            const newVal = !window.currentSettings.rulerEnabled;
            chrome.storage.sync.set({ rulerEnabled: newVal });
            // Settings update will be handled by the storage listener in popup if open, 
            // but we must manually process it here for immediate effect
            window.currentSettings.rulerEnabled = newVal;
            processSettings(window.currentSettings);
        } else if (cmd === 'simplify-text') {
            if (window.triggerSelectionAI) window.triggerSelectionAI('simplify');
        } else if (cmd === 'read-text') {
            const sel = window.getSelection().toString().trim();
            if (sel && window.speakText) window.speakText(sel);
        }
    }
});

// Dynamic content processing (MutationObserver)
let debounceTimer = null;
const observer = new MutationObserver((mutations) => {
    if (!window.currentSettings.bionicEnabled) return;
    
    // Check if any added nodes are text or contain text
    let hasNewText = false;
    for (let m of mutations) {
        if (m.addedNodes.length > 0) {
            for (let node of m.addedNodes) {
                if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim().length > 0) {
                    hasNewText = true; break;
                }
                if (node.nodeType === Node.ELEMENT_NODE && node.innerText && node.innerText.trim().length > 0) {
                    // Ignore our own injected elements
                    if (node.id === 'dyslexia-ai-modal' || node.id === 'dyslexia-action-menu' || node.id === 'dyslexia-reading-ruler') {
                        continue;
                    }
                    if (node.classList && (node.classList.contains('bionic-word') || node.classList.contains('bionic-bold'))) {
                        continue;
                    }
                    hasNewText = true; break;
                }
            }
        }
        if (hasNewText) break;
    }

    if (hasNewText) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            if (window.applyBionicReadingToElement) {
                // To be safe and efficient, we just run it on the whole body, 
                // the tree walker will skip already processed nodes quickly.
                window.applyBionicReadingToElement(document.body);
            }
        }, 800); // 800ms debounce
    }
});

observer.observe(document.body, { childList: true, subtree: true });
