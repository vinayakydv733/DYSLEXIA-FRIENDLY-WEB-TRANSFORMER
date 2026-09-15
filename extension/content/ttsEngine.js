// content/ttsEngine.js

let ttsEnabled = false;
let currentUtterance = null;
let ttsPlayer = null;

function createTTSPlayer() {
    if (ttsPlayer) return;
    
    ttsPlayer = document.createElement('div');
    ttsPlayer.id = 'dyslexia-tts-player';
    ttsPlayer.style.cssText = `
        position: fixed; bottom: 20px; right: 20px; z-index: 2147483647;
        background: #2d3748; color: white; padding: 10px 15px; border-radius: 8px;
        display: flex; gap: 10px; align-items: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        font-family: 'Segoe UI', Tahoma, sans-serif; font-size: 14px; display: none;
    `;
    
    const pausePlayBtn = document.createElement('button');
    pausePlayBtn.id = 'tts-pause-play';
    pausePlayBtn.innerText = '⏸ Pause';
    pausePlayBtn.style.cssText = 'background: transparent; color: white; border: none; cursor: pointer; font-weight: bold; padding: 5px;';
    
    const stopBtn = document.createElement('button');
    stopBtn.innerText = '⏹ Stop';
    stopBtn.style.cssText = 'background: transparent; color: #fc8181; border: none; cursor: pointer; font-weight: bold; padding: 5px;';
    
    pausePlayBtn.onclick = () => {
        if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
            pausePlayBtn.innerText = '⏸ Pause';
        } else {
            window.speechSynthesis.pause();
            pausePlayBtn.innerText = '▶ Play';
        }
    };
    
    stopBtn.onclick = () => {
        window.speechSynthesis.cancel();
        ttsPlayer.style.display = 'none';
    };
    
    ttsPlayer.appendChild(pausePlayBtn);
    ttsPlayer.appendChild(stopBtn);
    document.body.appendChild(ttsPlayer);
}

function speakText(text) {
    if (!text || !text.trim()) {
        window.speechSynthesis.cancel();
        if (ttsPlayer) ttsPlayer.style.display = 'none';
        return;
    }
    
    window.speechSynthesis.cancel();
    createTTSPlayer();
    
    currentUtterance = new SpeechSynthesisUtterance(text.trim());
    
    const isHindi = /[\u0900-\u097F]/.test(text);
    if (isHindi) {
        currentUtterance.lang = 'hi-IN';
    } else {
        currentUtterance.lang = 'en-US';
    }
    
    if (window.currentSettings && window.currentSettings.ttsSpeed) {
        currentUtterance.rate = parseFloat(window.currentSettings.ttsSpeed);
    }
    
    currentUtterance.onstart = () => {
        ttsPlayer.style.display = 'flex';
        document.getElementById('tts-pause-play').innerText = '⏸ Pause';
    };
    
    currentUtterance.onend = () => {
        ttsPlayer.style.display = 'none';
    };
    
    currentUtterance.onerror = () => {
        ttsPlayer.style.display = 'none';
    };

    window.speechSynthesis.speak(currentUtterance);
}

window.speakText = speakText;

window.enableTTS = function() {
    ttsEnabled = true;
};

window.disableTTS = function() {
    ttsEnabled = false;
    window.speechSynthesis.cancel();
    if (ttsPlayer) ttsPlayer.style.display = 'none';
};
