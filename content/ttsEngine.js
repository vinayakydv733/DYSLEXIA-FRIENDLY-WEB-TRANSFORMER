// content/ttsEngine.js

let ttsEnabled = false;
let currentUtterance = null; // Store globally to prevent immediate garbage collection

function speakText(text) {
    if (!text || !text.trim()) {
        window.speechSynthesis.cancel();
        return;
    }
    
    console.log("TTS reading:", text);
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    currentUtterance = new SpeechSynthesisUtterance(text.trim());
    
    // Use heuristic to guess if text contains Hindi characters
    const isHindi = /[\u0900-\u097F]/.test(text);
    if (isHindi) {
        currentUtterance.lang = 'hi-IN';
    } else {
        currentUtterance.lang = 'en-US';
    }

    // Play speech
    window.speechSynthesis.speak(currentUtterance);
}

const handleSelectionForTTS = (e) => {
    if (!ttsEnabled) return;
    
    // Tiny delay to let selection complete naturally on mouse up
    setTimeout(() => {
        const selection = window.getSelection();
        const text = selection ? selection.toString().trim() : '';
        
        if (text) {
            speakText(text);
        } else {
            window.speechSynthesis.cancel();
        }
    }, 50);
};

window.enableTTS = function() {
    if (ttsEnabled) return;
    console.log("TTS Enabled");
    ttsEnabled = true;
    document.addEventListener('mouseup', handleSelectionForTTS);
};

window.disableTTS = function() {
    if (!ttsEnabled) return;
    console.log("TTS Disabled");
    ttsEnabled = false;
    document.removeEventListener('mouseup', handleSelectionForTTS);
    window.speechSynthesis.cancel();
};
