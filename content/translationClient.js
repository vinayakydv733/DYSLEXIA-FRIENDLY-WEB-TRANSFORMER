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
    tooltipElement.style.left = \`\${x + 10}px\`;
    tooltipElement.style.top = \`\${y + 15}px\`;
    tooltipElement.style.display = 'block';
}

function hideTooltip() {
    if (tooltipElement) {
        tooltipElement.style.display = 'none';
        tooltipElement.innerHTML = '';
    }
}

async function lookupWord(word, x, y) {
    const cleanWord = word.trim().replace(/[^a-zA-Z]/g, '');
    if (!cleanWord) return;

    showTooltip(x, y, \`<i>Loading definition for "\${cleanWord}"...</i>\`);

    try {
        const res = await fetch(\`https://api.dictionaryapi.dev/api/v2/entries/en/\${cleanWord}\`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        
        const firstMeaning = data[0].meanings[0];
        const partOfSpeech = firstMeaning.partOfSpeech;
        const definition = firstMeaning.definitions[0].definition;

        let content = \`
            <div style="font-weight:bold; margin-bottom: 4px; font-size:16px;">\${cleanWord}</div>
            <div style="font-size: 12px; font-style: italic; color: #a0aec0; margin-bottom: 4px;">\${partOfSpeech}</div>
            <div>\${definition}</div>
        \`;
        showTooltip(x, y, content);
    } catch (e) {
        showTooltip(x, y, \`No definition found for "\${cleanWord}".\`);
    }
}

const handleDoubleClick = (e) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    
    const text = selection.toString();
    if (text && text.trim().length > 0 && text.trim().split(/\\s+/).length === 1) {
        lookupWord(text, e.pageX, e.pageY);
    }
};

const handleDocumentClick = (e) => {
    // Hide tooltip if clicking anywhere else
    hideTooltip();
};

window.enableDictionary = function() {
    if (dictLoaded) return;
    dictLoaded = true;
    createTooltip();
    document.addEventListener('dblclick', handleDoubleClick);
    document.addEventListener('click', handleDocumentClick);
};

window.disableDictionary = function() {
    if (!dictLoaded) return;
    dictLoaded = false;
    hideTooltip();
    document.removeEventListener('dblclick', handleDoubleClick);
    document.removeEventListener('click', handleDocumentClick);
};
