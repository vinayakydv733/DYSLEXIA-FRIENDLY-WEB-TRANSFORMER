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

window.speakText = speakText;

window.enableTTS = function() {
    ttsEnabled = true;
};

window.disableTTS = function() {
    ttsEnabled = false;
    window.speechSynthesis.cancel();
};
