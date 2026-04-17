// content/content.js
let currentSettings = {
    bionicEnabled: false,
    stylingEnabled: false,
    dictEnabled: false
};

const STYLE_ID = 'dyslexia-friendly-styles';

function applyStyles(enabled) {
    let styleEl = document.getElementById(STYLE_ID);
    if (enabled) {
        if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = STYLE_ID;
            // Increased line height, letter spacing, word spacing, and a clean sans-serif font stack
            styleEl.textContent = `
                body {
                    font-family: 'Comic Sans MS', 'OpenDyslexic', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
                    line-height: 1.6 !important;
                    letter-spacing: 0.05em !important;
                    word-spacing: 0.15em !important;
                    background-color: #fcfcfc !important; 
                    color: #111 !important;
                }
                p, h1, h2, h3, h4, h5, h6, span, div, a, li, td, th {
                    font-family: inherit !important;
                    line-height: inherit !important;
                    letter-spacing: inherit !important;
                    word-spacing: inherit !important;
                }
            `;
            document.head.appendChild(styleEl);
        }
    } else {
        if (styleEl) {
            styleEl.remove();
        }
    }
}

function processSettings(settings) {
    currentSettings = settings;

    // 1. Accessibility Styling
    applyStyles(settings.stylingEnabled);

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
}

// Initial Load
chrome.storage.sync.get(['bionicEnabled', 'stylingEnabled', 'dictEnabled'], (data) => {
    // defaults true if not explicitly false
    let settings = {
        bionicEnabled: data.bionicEnabled !== false,
        stylingEnabled: data.stylingEnabled !== false,
        dictEnabled: data.dictEnabled !== false
    };
    processSettings(settings);
});

// Listen for updates from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "updateSettings") {
        processSettings(request.settings);
    }
});
