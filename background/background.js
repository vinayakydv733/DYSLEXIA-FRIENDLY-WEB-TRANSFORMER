chrome.runtime.onInstalled.addListener(() => {
    // Set default settings if not already set
    chrome.storage.sync.get(['bionicEnabled', 'dictEnabled', 'bgColor', 'textColor', 'translateLang'], (data) => {
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
    }
});
