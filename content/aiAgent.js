// content/aiAgent.js

function extractPageText() {
    let mainNode = document.querySelector('article') || document.querySelector('main') || document.querySelector('[role="main"]');
    let rootNode = mainNode || document.body;

    // Create a clone to avoid mutating the live DOM
    let clone = rootNode.cloneNode(true);
    
    const selectorsToRemove = [
        'nav', 'footer', 'header', 'aside', '.sidebar', '.menu', '#menu',
        'script', 'style', 'noscript', 'iframe', 'svg', 'canvas', 'form',
        '.ad', '.ads', '.advertisement', '[role="banner"]', '[role="navigation"]',
        '.comments', '#comments'
    ];
    
    selectorsToRemove.forEach(sel => {
        clone.querySelectorAll(sel).forEach(el => el.remove());
    });

    const paragraphs = Array.from(clone.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li'));
    let text = paragraphs.map(p => p.innerText).filter(t => t && t.trim().length > 20).join('\n\n');
    
    if (text.length < 200) {
        text = clone.innerText || "";
    }
    
    return text.substring(0, 15000); // Limit to avoid massive payloads
}

function formatAIOutput(text) {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/## (.*?)\n/g, '<h3 style="color:#2b6cb0; margin-top:10px; margin-bottom:5px; font-size:16px;">$1</h3>')
        .replace(/# (.*?)\n/g, '<h2 style="color:#2c5282; margin-top:12px; margin-bottom:6px; font-size:18px; border-bottom:1px solid #e2e8f0;">$1</h2>')
        .replace(/\n- (.*?)/g, '<li style="margin-left:15px; margin-bottom:4px;">$1</li>')
        .replace(/\n\* (.*?)/g, '<li style="margin-left:15px; margin-bottom:4px;">$1</li>')
        .replace(/\n\n/g, '</p><p style="margin-top:8px;">')
        .replace(/\n/g, '<br>');
}

function showAIModal(content, isFinal = false, rawContent = "") {
    let modal = document.getElementById('dyslexia-ai-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'dyslexia-ai-modal';
        modal.style.cssText = `
            position: fixed; top: 20px; right: 20px; width: 420px; max-height: 85vh; overflow-y: auto;
            background: #ffffff; color: #1a202c; z-index: 2147483647; padding: 25px;
            border-radius: 12px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; border: 1px solid #e2e8f0;
        `;
        document.body.appendChild(modal);
    }
    
    let formattedContent = formatAIOutput(content);

    let buttonsHtml = '';
    if (isFinal) {
        buttonsHtml = `
            <div style="display:flex; gap:10px; margin-top:15px; padding-top:15px; border-top:1px solid #e2e8f0;">
                <button id="ai-btn-read" style="flex:1; background:#edf2f7; color:#2d3748; border:1px solid #cbd5e0; padding:8px; border-radius:6px; cursor:pointer; font-weight:600; display:flex; justify-content:center; align-items:center; gap:5px;">🔊 Read Aloud</button>
                <button id="ai-btn-translate" style="flex:1; background:#edf2f7; color:#2d3748; border:1px solid #cbd5e0; padding:8px; border-radius:6px; cursor:pointer; font-weight:600; display:flex; justify-content:center; align-items:center; gap:5px;">🌐 Translate</button>
            </div>
        `;
    }

    modal.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #e2e8f0; padding-bottom:12px; margin-bottom:15px;">
            <h3 style="margin:0; font-size:18px; color:#2c5282; display:flex; align-items:center; gap:8px;">
                <span style="font-size:24px;">🤖</span> AI Assistant
            </h3>
            <button id="dyslexia-ai-close" style="background:#e2e8f0; color:#4a5568; border:none; border-radius:50%; width:30px; height:30px; font-size:18px; font-weight:bold; cursor:pointer; display:flex; justify-content:center; align-items:center;" aria-label="Close">&times;</button>
        </div>
        <div style="font-size: 15px; line-height: 1.6; color: #2d3748;" id="dyslexia-ai-text">
            <p>${formattedContent}</p>
        </div>
        ${buttonsHtml}
    `;
    
    document.getElementById('dyslexia-ai-close').addEventListener('click', () => {
        if (window.speechSynthesis) window.speechSynthesis.cancel();
        modal.remove();
    });

    if (isFinal) {
        let isReading = false;
        
        document.getElementById('ai-btn-read').addEventListener('click', function() {
            const currentText = document.getElementById('dyslexia-ai-text').innerText;
            if (isReading) {
                window.speechSynthesis.cancel();
                isReading = false;
                this.innerHTML = "🔊 Read Aloud";
                this.style.background = "#edf2f7";
            } else {
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(currentText);
                utterance.lang = /[\u0900-\u097F]/.test(currentText) ? 'hi-IN' : 'en-US';
                if(window.currentSettings && window.currentSettings.ttsSpeed) {
                    utterance.rate = parseFloat(window.currentSettings.ttsSpeed);
                }
                
                utterance.onend = () => {
                    isReading = false;
                    if(document.getElementById('ai-btn-read')) {
                        document.getElementById('ai-btn-read').innerHTML = "🔊 Read Aloud";
                        document.getElementById('ai-btn-read').style.background = "#edf2f7";
                    }
                };
                
                window.speechSynthesis.speak(utterance);
                isReading = true;
                this.innerHTML = "⏹ Stop";
                this.style.background = "#e2e8f0";
            }
        });

        document.getElementById('ai-btn-translate').addEventListener('click', function() {
            const lang = window.currentSettings ? window.currentSettings.translateLang : 'none';
            if (!lang || lang === 'none') {
                alert("Please select a 'Translate To' language in the extension preferences.");
                return;
            }
            this.innerHTML = "⏳ Translating...";
            this.disabled = true;

            chrome.runtime.sendMessage({ action: 'translateWord', word: rawContent, targetLang: lang }, (response) => {
                if (response && response.success && response.data && response.data[0]) {
                    const translatedText = response.data[0].map(part => part[0]).join('');
                    const newFormatted = formatAIOutput(translatedText);
                    document.getElementById('dyslexia-ai-text').innerHTML = `<p style="color:#2b6cb0; font-weight:600; margin-bottom:10px;">Translated:</p><p>${newFormatted}</p><hr style="margin:15px 0; border:0; border-top:1px dashed #cbd5e0;"><p style="color:#718096; font-size:12px; font-weight:bold;">Original:</p>` + document.getElementById('dyslexia-ai-text').innerHTML;
                    
                    if (window.currentSettings && window.currentSettings.bionicEnabled && window.applyBionicReadingToElement) {
                        window.applyBionicReadingToElement(document.getElementById('dyslexia-ai-text'));
                    }
                } else {
                    alert("Translation failed.");
                }
                this.innerHTML = "✅ Translated";
            });
        });
        
        // Apply bionic reading to AI output if currently enabled
        if (window.currentSettings && window.currentSettings.bionicEnabled && window.applyBionicReadingToElement) {
            window.applyBionicReadingToElement(document.getElementById('dyslexia-ai-text'));
        }
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "triggerAIAction") {
        showAIModal("<i>Analyzing webpage... Please wait...</i>");
        
        chrome.storage.sync.get(['geminiKey'], (data) => {
            const pageText = extractPageText();
            if (!pageText || pageText.trim().length === 0) {
                 showAIModal("<div style='color:#e53e3e;'><b>Error:</b> Could not find readable main content on this page.</div>", true);
                 return;
            }

            chrome.runtime.sendMessage({
                action: 'askAI', 
                text: pageText, 
                mode: request.mode, // 'summarize' or 'simplify'
                key: data.geminiKey || ''
            }, (response) => {
                if (response && response.success) {
                    showAIModal(response.data, true, response.data);
                } else {
                    showAIModal(`<div style='color:#e53e3e;'><b>AI Error:</b> ${response ? response.error : 'Failed to connect to AI.'}</div>`, true);
                }
            });
        });
    }
});

// ---------------------------------------------------------
// SELECTED TEXT ACTION MENU
// ---------------------------------------------------------
let actionMenu = null;

function createActionMenu() {
    if (actionMenu) return;
    actionMenu = document.createElement('div');
    actionMenu.id = 'dyslexia-action-menu';
    actionMenu.style.cssText = `
        position: absolute; z-index: 2147483647; background: #2d3748; color: white;
        padding: 5px; border-radius: 8px; display: none; gap: 5px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        font-family: 'Segoe UI', Tahoma, sans-serif; font-size: 13px; align-items: center;
    `;
    
    const actions = [
        { id: 'am-explain', text: '💡 Explain' },
        { id: 'am-eli10', text: '🧸 ELI10' },
        { id: 'am-read', text: '🔊 Read' },
        { id: 'am-dict', text: '📖 Define' }
    ];
    
    actions.forEach(act => {
        const btn = document.createElement('button');
        btn.id = act.id;
        btn.innerText = act.text;
        btn.style.cssText = `
            background: transparent; color: white; border: none; padding: 6px 10px;
            cursor: pointer; border-radius: 4px; font-weight: 600; white-space: nowrap;
        `;
        btn.onmouseover = () => btn.style.background = '#4a5568';
        btn.onmouseout = () => btn.style.background = 'transparent';
        actionMenu.appendChild(btn);
    });
    
    document.body.appendChild(actionMenu);

    document.getElementById('am-explain').onclick = () => triggerSelectionAI('explain');
    document.getElementById('am-eli10').onclick = () => triggerSelectionAI('eli10');
    document.getElementById('am-read').onclick = () => {
        if(window.speakText) window.speakText(window.getSelection().toString());
        hideActionMenu();
    };
    document.getElementById('am-dict').onclick = () => {
        const sel = window.getSelection();
        if(!sel || sel.rangeCount === 0) return;
        const rect = sel.getRangeAt(0).getBoundingClientRect();
        if(window.lookupWord) window.lookupWord(sel.toString(), rect.left + window.scrollX, rect.bottom + window.scrollY);
        hideActionMenu();
    };
}

function hideActionMenu() {
    if (actionMenu) actionMenu.style.display = 'none';
}

function triggerSelectionAI(mode) {
    const text = window.getSelection().toString().trim();
    if (!text) return;
    hideActionMenu();
    
    showAIModal("<i>Analyzing selected text...</i>");
    chrome.storage.sync.get(['geminiKey'], (data) => {
        chrome.runtime.sendMessage({
            action: 'askAI', 
            text: text, 
            mode: mode,
            key: data.geminiKey || ''
        }, (response) => {
            if (response && response.success) {
                showAIModal(response.data, true, response.data);
            } else {
                showAIModal(`<div style='color:#e53e3e;'><b>Error:</b> ${response ? response.error : 'AI failed.'}</div>`, true);
            }
        });
    });
}

window.triggerSelectionAI = triggerSelectionAI;

document.addEventListener('mouseup', (e) => {
    // If dict is not enabled in settings, don't show the menu
    if (!window.currentSettings || !window.currentSettings.dictEnabled) {
        hideActionMenu();
        return;
    }
    
    setTimeout(() => {
        const selection = window.getSelection();
        const text = selection.toString().trim();
        
        // Ensure clicking inside the menu doesn't hide it
        if (actionMenu && actionMenu.contains(e.target)) return;

        if (text.length > 0 && text.length < 3000) {
            createActionMenu();
            const rect = selection.getRangeAt(0).getBoundingClientRect();
            actionMenu.style.left = `${rect.left + window.scrollX + (rect.width/2) - (actionMenu.offsetWidth/2)}px`;
            actionMenu.style.top = `${rect.top + window.scrollY - 45}px`;
            actionMenu.style.display = 'flex';
        } else {
            hideActionMenu();
        }
    }, 10);
});

document.addEventListener('mousedown', (e) => {
    if (actionMenu && actionMenu.contains(e.target)) return;
    if (document.getElementById('dyslexia-dict-tooltip') && document.getElementById('dyslexia-dict-tooltip').contains(e.target)) return;
    hideActionMenu();
    if(window.hideTooltip) window.hideTooltip();
});
