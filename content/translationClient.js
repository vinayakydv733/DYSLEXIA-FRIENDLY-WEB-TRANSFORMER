// content/translationClient.js

let dictLoaded = false;
let tooltipElement = null;

function createTooltip() {
    if (tooltipElement) return;
    tooltipElement = document.createElement('div');
    tooltipElement.id = 'dyslexia-dict-tooltip';
    tooltipElement.style.cssText = `
        position: absolute;
        z-index: 1000000;
        background: #1a202c;
        color: white;
        padding: 10px 15px;
        border-radius: 8px;
        font-family: inherit;
        font-size: 14px;
        max-width: 300px;
        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.2);
        display: none;
        pointer-events: none;
        word-wrap: break-word;
    `;
    document.body.appendChild(tooltipElement);
}

function showTooltip(x, y, text) {
    if (!tooltipElement) createTooltip();
    tooltipElement.innerHTML = text;
    tooltipElement.style.left = `${x + 10}px`;
    tooltipElement.style.top = `${y + 15}px`;
    tooltipElement.style.display = 'block';
}

function hideTooltip() {
    if (tooltipElement) {
        tooltipElement.style.display = 'none';
        tooltipElement.innerHTML = '';
    }
}

async function lookupWord(word, x, y) {
    const cleanWord = word.trim();
    if (!cleanWord) return;

    const isSingleWord = cleanWord.trim().split(/\s+/).length === 1;
    const dictWord = isSingleWord ? cleanWord.replace(/[^\p{L}\p{M}\p{N}]/gu, '') : null;

    showTooltip(x, y, `<i>Loading for "${cleanWord.length > 30 ? cleanWord.substring(0, 30) + '...' : cleanWord}"...</i>`);

    let translationText = "";
    if (window.currentSettings && window.currentSettings.translateLang && window.currentSettings.translateLang !== 'none') {
        try {
            const targetLang = window.currentSettings.translateLang;
            const translateData = await new Promise((resolve, reject) => {
                chrome.runtime.sendMessage(
                    { action: 'translateWord', word: cleanWord, targetLang: targetLang },
                    response => {
                        if (chrome.runtime.lastError) {
                            reject(chrome.runtime.lastError);
                        } else if (!response || !response.success) {
                            reject(response ? response.error : 'Unknown error');
                        } else {
                            resolve(response.data);
                        }
                    }
                );
            });
            if (translateData && translateData[0]) {
                translationText = translateData[0].map(part => part[0]).join('');
            }
        } catch(e) {
            console.error("Translation error:", e);
        }
    }

    let englishTranslation = "";
    if (!isSingleWord) {
        try {
            const engData = await new Promise((resolve, reject) => {
                chrome.runtime.sendMessage(
                    { action: 'translateWord', word: cleanWord, targetLang: 'en' },
                    response => {
                        if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
                        else if (!response || !response.success) reject(response ? response.error : 'Unknown error');
                        else resolve(response.data);
                    }
                );
            });
            if (engData && engData[0]) {
                const engText = engData[0].map(part => part[0]).join('');
                if (engText.toLowerCase() !== cleanWord.toLowerCase() && engText.toLowerCase() !== translationText.toLowerCase()) {
                    englishTranslation = engText;
                }
            }
        } catch(e) {}
    }

    let definitionContent = "";
    if (isSingleWord && dictWord) {
        try {
            const isHindi = /[\u0900-\u097F]/.test(dictWord);
            const lang = isHindi ? 'hi' : 'en';
            const data = await new Promise((resolve, reject) => {
                chrome.runtime.sendMessage(
                    { action: 'lookupDictionary', word: dictWord, lang: lang },
                    response => {
                        if (chrome.runtime.lastError) {
                            reject(chrome.runtime.lastError);
                        } else if (!response || !response.success) {
                            reject(response ? response.error : 'Unknown error');
                        } else {
                            resolve(response.data);
                        }
                    }
                );
            });
            
            const firstMeaning = data[0].meanings[0];
            const partOfSpeech = firstMeaning.partOfSpeech;
            const definition = firstMeaning.definitions[0].definition;
            definitionContent = `
                <div style="font-size: 12px; font-style: italic; color: #a0aec0; margin-bottom: 4px;">${partOfSpeech}</div>
                <div>${definition}</div>
            `;
        } catch (e) {
            definitionContent = `<div style="color: #a0aec0;">No definition found.</div>`;
        }
    }

    let translationContent = "";
    if (translationText) {
        translationContent = `<div style="font-size: 14px; margin-bottom: 6px; color: #4299e1;"><b>Translation:</b> <span class="translated-word">${translationText}</span></div>`;
    }

    if (englishTranslation) {
        translationContent += `<div style="font-size: 14px; margin-bottom: 6px; color: #48bb78;"><b>English:</b> <span class="translated-word">${englishTranslation}</span></div>`;
    }

    let content = `
        <div style="font-weight:bold; margin-bottom: 4px; font-size:16px;">${cleanWord}</div>
        ${translationContent}
        ${definitionContent}
    `;

    showTooltip(x, y, content);

    if (window.currentSettings && window.currentSettings.bionicEnabled) {
        if (window.applyBionicReadingToElement && tooltipElement) {
            window.applyBionicReadingToElement(tooltipElement);
        }
    }
}

const handleMouseUp = (e) => {
    setTimeout(() => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;
        
        const text = selection.toString();
        if (text && text.trim().length > 0 && text.trim().length < 300) {
            lookupWord(text, e.pageX, e.pageY);
        }
    }, 10);
};

const handleMouseDown = (e) => {
    if (tooltipElement && tooltipElement.contains(e.target)) return;
    hideTooltip();
};

window.enableDictionary = function() {
    if (dictLoaded) return;
    dictLoaded = true;
    createTooltip();
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousedown', handleMouseDown);
};

window.disableDictionary = function() {
    if (!dictLoaded) return;
    dictLoaded = false;
    hideTooltip();
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mousedown', handleMouseDown);
};
