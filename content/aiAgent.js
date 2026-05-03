// content/aiAgent.js

function extractPageText() {
    // Basic text extraction from common content tags
    const paragraphs = Array.from(document.querySelectorAll('p, h1, h2, h3, li, span, article'));
    let text = paragraphs.map(p => p.innerText).filter(t => t && t.trim().length > 10).join('\n\n');
    return text.substring(0, 20000); // Limit character count to avoid overwhelming the model
}

function showAIModal(content, isFinal = false, rawContent = "") {
    let modal = document.getElementById('dyslexia-ai-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'dyslexia-ai-modal';
        modal.style.cssText = `
            position: fixed; top: 20px; right: 20px; width: 400px; max-height: 85vh; overflow-y: auto;
            background: #ffffff; color: #1a202c; z-index: 2147483647; padding: 25px;
            border-radius: 12px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        `;
        document.body.appendChild(modal);
    }
    
    // Parse simple markdown into HTML
    let formattedContent = content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n\n/g, '</p><p style="margin-top:10px;">')
        .replace(/\n/g, '<br>');

    let buttonsHtml = '';
    if (isFinal) {
        buttonsHtml = `
            <div style="display:flex; gap:10px; margin-top:15px; padding-top:15px; border-top:1px solid #e2e8f0;">
                <button id="ai-btn-read" style="flex:1; background:#edf2f7; color:#2d3748; border:1px solid #cbd5e0; padding:8px; border-radius:6px; cursor:pointer; font-weight:600; transition:all 0.2s; display:flex; justify-content:center; align-items:center; gap:5px;">🔊 Read Aloud</button>
                <button id="ai-btn-translate" style="flex:1; background:#edf2f7; color:#2d3748; border:1px solid #cbd5e0; padding:8px; border-radius:6px; cursor:pointer; font-weight:600; transition:all 0.2s; display:flex; justify-content:center; align-items:center; gap:5px;">🌐 Translate</button>
            </div>
        `;
    }

    modal.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #e2e8f0; padding-bottom:12px; margin-bottom:15px;">
            <h3 style="margin:0; font-size:18px; color:#2c5282; display:flex; align-items:center; gap:8px;">
                <span style="font-size:24px;">🤖</span> AI Reading Assistant
            </h3>
            <button id="dyslexia-ai-close" style="background:#e2e8f0; color:#4a5568; border:none; border-radius:50%; width:30px; height:30px; font-size:18px; font-weight:bold; cursor:pointer; display:flex; justify-content:center; align-items:center; transition:background 0.2s;">&times;</button>
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
    
    document.getElementById('dyslexia-ai-close').addEventListener('mouseenter', function() {
        this.style.background = '#cbd5e0';
    });
    document.getElementById('dyslexia-ai-close').addEventListener('mouseleave', function() {
        this.style.background = '#e2e8f0';
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
                const isHindi = /[\u0900-\u097F]/.test(currentText);
                utterance.lang = isHindi ? 'hi-IN' : 'en-US';
                
                utterance.onend = () => {
                    isReading = false;
                    this.innerHTML = "🔊 Read Aloud";
                    this.style.background = "#edf2f7";
                };
                
                window.speechSynthesis.speak(utterance);
                isReading = true;
                this.innerHTML = "⏹ Stop Reading";
                this.style.background = "#e2e8f0";
            }
        });

        document.getElementById('ai-btn-translate').addEventListener('click', function() {
            const lang = window.currentSettings ? window.currentSettings.translateLang : 'none';
            if (!lang || lang === 'none') {
                alert("Please select a 'Translate To' language in the extension popup first!");
                return;
            }

            this.innerHTML = "⏳ Translating...";
            this.disabled = true;
            this.style.opacity = "0.7";

            chrome.runtime.sendMessage({
                action: 'translateWord', 
                word: rawContent, 
                targetLang: lang
            }, (response) => {
                if (response && response.success && response.data && response.data[0]) {
                    const translatedText = response.data[0].map(part => part[0]).join('');
                    
                    let newFormatted = translatedText
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em>$1</em>')
                        .replace(/\n\n/g, '</p><p style="margin-top:10px;">')
                        .replace(/\n/g, '<br>');

                    document.getElementById('dyslexia-ai-text').innerHTML = `<p style="color:#4299e1; font-weight:600; margin-bottom:10px;">Translated:</p><p>${newFormatted}</p><hr style="margin:15px 0; border:0; border-top:1px dashed #cbd5e0;"><p style="color:#718096; font-size:12px; font-weight:bold;">Original:</p>` + document.getElementById('dyslexia-ai-text').innerHTML;
                    
                    if (window.currentSettings && window.currentSettings.bionicEnabled && window.applyBionicReadingToElement) {
                        window.applyBionicReadingToElement(document.getElementById('dyslexia-ai-text'));
                    }
                } else {
                    alert("Translation failed. Please try again.");
                }
                this.innerHTML = "✅ Translated";
            });
        });
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "triggerAISummary") {
        showAIModal("<i>Scanning webpage and contacting AI... Please wait...</i>");
        
        chrome.storage.sync.get(['geminiKey'], (data) => {
            const pageText = extractPageText();
            if (!pageText || pageText.trim().length === 0) {
                 showAIModal("<div style='color:#e53e3e;'><b>Error:</b> Could not find readable text on this page.</div>");
                 return;
            }

            chrome.runtime.sendMessage({
                action: 'askAI', 
                text: pageText, 
                key: data.geminiKey || ''
            }, (response) => {
                if (response && response.success) {
                    showAIModal(response.data, true, response.data);
                    
                    // Apply bionic reading to AI output if currently enabled
                    if (window.currentSettings && window.currentSettings.bionicEnabled && window.applyBionicReadingToElement) {
                        const modalContent = document.getElementById('dyslexia-ai-text');
                        window.applyBionicReadingToElement(modalContent);
                    }
                } else {
                    showAIModal(`<div style='color:#e53e3e;'><b>AI Error:</b> ${response ? response.error : 'Failed to connect to AI.'}</div>`, false);
                }
            });
        });
    }
});
