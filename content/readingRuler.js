// content/readingRuler.js

let rulerEnabled = false;
let rulerElement = null;

function handleRulerMove(e) {
    if (!rulerElement) return;
    // Center the ruler around the mouse pointer vertically
    rulerElement.style.top = (e.clientY - 20) + 'px';
}

window.enableReadingRuler = function() {
    if (rulerEnabled) return;
    rulerEnabled = true;
    
    if (!rulerElement) {
        rulerElement = document.createElement('div');
        rulerElement.id = 'dyslexia-reading-ruler';
        rulerElement.style.cssText = `
            position: fixed;
            left: 0;
            width: 100vw;
            height: 40px;
            background: rgba(0, 0, 0, 0.1);
            border-top: 2px solid #4299e1;
            border-bottom: 2px solid #4299e1;
            pointer-events: none;
            z-index: 2147483646;
            transition: top 0.05s ease-out;
        `;
        document.body.appendChild(rulerElement);
    }
    
    document.addEventListener('mousemove', handleRulerMove);
};

window.disableReadingRuler = function() {
    if (!rulerEnabled) return;
    rulerEnabled = false;
    
    if (rulerElement) {
        rulerElement.remove();
        rulerElement = null;
    }
    document.removeEventListener('mousemove', handleRulerMove);
};
