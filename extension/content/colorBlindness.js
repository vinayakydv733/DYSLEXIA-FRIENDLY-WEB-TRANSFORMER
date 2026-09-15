// content/colorBlindness.js
const CB_STYLE_ID = 'dyslexia-color-blindness-style';

const cbPalettes = {
    protanopia: {
        bg: '#F5F0E8',
        text: '#1A1A2E',
        bold: '#0072B2',
        link: '#D55E00',
        border: '#E69F00'
    },
    deuteranopia: {
        bg: '#FFFBF0',
        text: '#1C1C1C',
        bold: '#0072B2',
        link: '#D55E00',
        border: '#56B4E9'
    },
    tritanopia: {
        bg: '#F8F8F8',
        text: '#1A1A1A',
        bold: '#CC2D35',
        link: '#FF6B35',
        border: '#9E2A2B'
    },
    achromatopsia: {
        bg: '#1E1E1E',
        text: '#F0F0F0',
        bold: '#FFFFFF',
        link: '#CCCCCC',
        border: '#888888',
        filter: 'brightness(0.8)'
    },
    mild: {
        bg: '#FFFFFF',
        text: '#000000',
        bold: '#005FA3',
        link: '#B84A00',
        border: '#2E2E2E',
        fontWeight: '500'
    }
};

window.applyColorBlindnessMode = function(mode) {
    let styleEl = document.getElementById(CB_STYLE_ID);
    
    if (!mode || mode === 'none') {
        if (styleEl) styleEl.remove();
        if (document.documentElement.style.getPropertyValue('filter').includes('brightness')) {
            document.documentElement.style.filter = '';
        }
        return false; // Not active
    }

    if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = CB_STYLE_ID;
        document.head.appendChild(styleEl);
    }
    
    const p = cbPalettes[mode];
    if (!p) return false;

    let css = `
        *:not(img):not(video):not(canvas):not(svg) {
            background-color: ${p.bg} !important;
            color: ${p.text} !important;
            border-color: ${p.border} !important;
        }
        a, a * {
            color: ${p.link} !important;
        }
        b, strong, h1, h2, h3, h4, h5, h6 {
            color: ${p.bold} !important;
        }
    `;

    if (p.fontWeight) {
        css += `
            *:not(b):not(strong):not(h1):not(h2):not(h3):not(h4):not(h5):not(h6) {
                font-weight: ${p.fontWeight} !important;
            }
        `;
    }

    styleEl.textContent = css;

    if (p.filter) {
        document.documentElement.style.setProperty('filter', p.filter, 'important');
    } else {
        if (document.documentElement.style.getPropertyValue('filter').includes('brightness')) {
            document.documentElement.style.filter = '';
        }
    }

    return true; // Active
};
