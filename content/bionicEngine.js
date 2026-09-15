// content/bionicEngine.js

let bionicApplied = false;

// We use classes to easily find our modifications to strip them out when toggled off
const BIONIC_CLASS = 'bionic-word';
const BIONIC_BOLD_CLASS = 'bionic-bold';

function shouldProcessNode(node) {
    if (!node.parentNode) return false;
    const parentTag = node.parentNode.tagName ? node.parentNode.tagName.toLowerCase() : '';
    // Skip scripts, styles, textareas, inputs, codes, pres, and already processed nodes
    const skipTags = ['script', 'style', 'textarea', 'input', 'code', 'pre', 'noscript'];
    if (skipTags.includes(parentTag)) return false;
    
    // Skip if parent is already our bionic wrapper
    if (node.parentNode.classList && node.parentNode.classList.contains(BIONIC_CLASS)) return false;
    if (node.parentNode.classList && node.parentNode.classList.contains(BIONIC_BOLD_CLASS)) return false;

    return true;
}

function processTextNode(node) {
    const text = node.nodeValue;
    // Don't process empty strings or purely whitespace
    if (!text.trim()) return node;

    // Split text keeping spaces intact
    const parts = text.split(/(\s+)/);
    
    const fragment = document.createDocumentFragment();
    let hasChanges = false;

    parts.forEach(part => {
        // If it's pure whitespace or very short, just append a text node
        if (/^\s+$/.test(part) || part.length <= 1) {
            fragment.appendChild(document.createTextNode(part));
            return;
        }

        // Apply algorithm: Bolding first ~40% of the word
        const letterCount = part.replace(/[^\p{L}\p{M}\p{N}]/gu, '').length;
        if (letterCount <= 1) {
            fragment.appendChild(document.createTextNode(part));
            return;
        }

        hasChanges = true;
        let boldLen = Math.ceil(part.length * 0.4);
        if (part.length === 3) boldLen = 1;
        if (part.length === 4) boldLen = 2;

        const boldPart = part.substring(0, boldLen);
        const normalPart = part.substring(boldLen);

        const span = document.createElement('span');
        span.className = BIONIC_CLASS;
        span.style.color = "inherit";

        const b = document.createElement('b');
        b.className = BIONIC_BOLD_CLASS;
        b.textContent = boldPart;
        b.style.fontWeight = 'bold';
        b.style.color = "inherit";

        span.appendChild(b);
        if (normalPart) {
            span.appendChild(document.createTextNode(normalPart));
        }

        fragment.appendChild(span);
    });

    if (hasChanges) {
        return fragment;
    }
    return node;
}

function runBionicOnElement(element) {
    if (!element) return;
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
        acceptNode: function(node) {
            if (!node.parentNode) return NodeFilter.FILTER_REJECT;
            const parentTag = node.parentNode.tagName ? node.parentNode.tagName.toLowerCase() : '';
            const skipTags = ['script', 'style', 'textarea', 'input', 'code', 'pre', 'noscript', 'button', 'select'];
            if (skipTags.includes(parentTag)) return NodeFilter.FILTER_REJECT;
            
            // Ignore contenteditable fields to prevent breaking rich text editors
            if (node.parentNode.closest && node.parentNode.closest('[contenteditable="true"]')) {
                return NodeFilter.FILTER_REJECT;
            }
            
            if (node.parentNode.classList && (node.parentNode.classList.contains(BIONIC_CLASS) || node.parentNode.classList.contains(BIONIC_BOLD_CLASS))) {
                return NodeFilter.FILTER_REJECT;
            }
            if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
            return NodeFilter.FILTER_ACCEPT;
        }
    });

    const nodes = [];
    while (walker.nextNode()) {
        nodes.push(walker.currentNode);
    }

    nodes.forEach(node => {
        let newNode = processTextNode(node);
        if (newNode !== node && node.parentNode) {
            node.parentNode.replaceChild(newNode, node);
        }
    });
}

window.applyBionicReading = function() {
    if (bionicApplied) return;
    bionicApplied = true;
    runBionicOnElement(document.body);
};

window.applyBionicReadingToElement = function(element) {
    runBionicOnElement(element);
};

window.removeBionicReading = function() {
    if (!bionicApplied) return;
    bionicApplied = false;

    // Find all our bionic wrappers and convert them back to pure text
    const elements = document.querySelectorAll('.' + BIONIC_CLASS);
    elements.forEach(el => {
        const text = el.textContent;
        const textNode = document.createTextNode(text);
        el.parentNode.replaceChild(textNode, el);
    });
};
