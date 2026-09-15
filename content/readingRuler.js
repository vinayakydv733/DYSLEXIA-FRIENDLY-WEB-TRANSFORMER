// content/readingRuler.js

let rulerEnabled = false;
let rulerTop = null;
let rulerBottom = null;

function handleRulerMove(e) {
    if (!rulerEnabled) return;
    const y = e.clientY;
    
    // Smooth tracking via requestAnimationFrame
    requestAnimationFrame(() => {
        if (rulerTop && rulerBottom) {
            const rulerHeight = 80; // Focused area height
            rulerTop.style.height = `${Math.max(0, y - rulerHeight/2)}px`;
            rulerBottom.style.top = `${y + rulerHeight/2}px`;
            rulerBottom.style.height = `calc(100vh - ${y + rulerHeight/2}px)`;
        }
    });
}

window.enableReadingRuler = function() {
    if (rulerEnabled) return;
    rulerEnabled = true;
    
    if (!rulerTop) {
        rulerTop = document.createElement('div');
        rulerBottom = document.createElement('div');
        
        const commonStyle = `
            position: fixed; left: 0; width: 100vw; background: rgba(0, 0, 0, 0.5);
            pointer-events: none; z-index: 2147483645;
            transition: height 0.08s ease-out, top 0.08s ease-out;
        `;
        
        rulerTop.style.cssText = commonStyle + 'top: 0; border-bottom: 2px solid #4299e1; height: 50vh;';
        rulerBottom.style.cssText = commonStyle + 'top: 50vh; border-top: 2px solid #4299e1; height: 50vh;';
        
        document.body.appendChild(rulerTop);
        document.body.appendChild(rulerBottom);
    }
    
    document.addEventListener('mousemove', handleRulerMove);
};

window.disableReadingRuler = function() {
    if (!rulerEnabled) return;
    rulerEnabled = false;
    
    if (rulerTop) {
        rulerTop.remove();
        rulerBottom.remove();
        rulerTop = null;
        rulerBottom = null;
    }
    document.removeEventListener('mousemove', handleRulerMove);
};
