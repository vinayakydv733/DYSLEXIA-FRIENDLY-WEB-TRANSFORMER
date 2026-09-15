chrome.runtime.onInstalled.addListener((details) => {
    // Set default settings if not already set
    chrome.storage.sync.get(['bionicEnabled', 'dictEnabled', 'bgColor', 'textColor', 'translateLang', 'onboardingComplete'], (data) => {
        chrome.storage.sync.set({
            bionicEnabled: data.bionicEnabled !== undefined ? data.bionicEnabled : true,
            dictEnabled: data.dictEnabled !== undefined ? data.dictEnabled : true,
            bgColor: data.bgColor || 'default',
            textColor: data.textColor || 'default',
            translateLang: data.translateLang || 'none'
        });
        
    });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'translateWord') {
        const { word, targetLang } = request;
        fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(word)}`)
            .then(res => res.json())
            .then(data => sendResponse({ success: true, data: data }))
            .catch(error => sendResponse({ success: false, error: error.toString() }));
        return true; // Keep message channel open for async response
    } else if (request.action === 'lookupDictionary') {
        const { word, lang } = request;
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/${lang}/${word}`)
            .then(res => {
                if (!res.ok) throw new Error("Not found");
                return res.json();
            })
            .then(data => sendResponse({ success: true, data: data }))
            .catch(error => sendResponse({ success: false, error: error.toString() }));
        return true; // Keep message channel open for async response
    } else if (request.action === 'askAI') {
        const { text, mode, readingLevel, translateLang } = request;
        
        // When deploying, change this to your live Render/Heroku URL!
        const BACKEND_URL = 'https://lexiease-backend-6v2g.onrender.com/api/ai';
        
        fetch(BACKEND_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                operation: mode,
                text: text,
                readingLevel: readingLevel || 'simple',
                language: translateLang || 'en'
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                sendResponse({ success: true, data: data.data });
            } else {
                sendResponse({ success: false, error: data.error || 'Backend returned an error.' });
            }
        })
        .catch(error => {
            console.error("Backend connection failed:", error);
            sendResponse({ success: false, error: "Cannot connect to AI backend. Make sure the backend server is running!" });
        });
        
        return true;
    }
});

chrome.commands.onCommand.addListener((command) => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs[0]) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "keyboardShortcut", command: command }).catch(() => {});
        }
    });
});
