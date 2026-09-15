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
    } else if (request.action === 'askAI') {
        const { text, key, mode } = request;
        
        let prompt = "";
        if (mode === "summarize") {
            prompt = `You are an AI assistant designed to help a dyslexic user. Read the following text from a webpage. First, provide a very easy-to-read, short summary of the content (maximum 3 paragraphs). Second, identify any complex or difficult words used in the text, list them, and provide simple definitions. Use clear formatting.\n\nText:\n${text}`;
        } else if (mode === "simplify") {
            prompt = `You are an AI accessibility assistant. Please rewrite the following text in very simple, easy-to-understand English without changing the core meaning. Make sentences short and use simple vocabulary.\n\nText:\n${text}`;
        } else if (mode === "explain") {
            prompt = `Explain the following text in simple English. Keep it concise. If helpful, you can provide an optional Hindi or Hinglish translation for difficult terms.\n\nText:\n${text}`;
        } else if (mode === "eli10") {
            prompt = `Explain the following text like I am 10 years old. Use extremely simple analogies and do not lose the core meaning.\n\nText:\n${text}`;
        } else {
            prompt = `You are an AI assistant. Analyze the text:\n\n${text}`;
        }

        const handlePollinationsFallback = () => {
            fetch('https://text.pollinations.ai/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [
                        { role: 'system', content: 'You are an AI assistant designed to help a dyslexic user. Provide very easy-to-read structured outputs.' },
                        { role: 'user', content: prompt }
                    ]
                })
            })
            .then(res => {
                if (!res.ok) throw new Error("Free AI service is currently busy. Please try again later or add an API key.");
                return res.text();
            })
            .then(data => {
                if (data.includes("budget") || data.includes("API key used for this request has reached")) {
                    sendResponse({ success: false, error: "The free AI server is currently overloaded. Please add your own Gemini API Key in preferences for reliable access." });
                } else {
                    sendResponse({ success: true, data: data });
                }
            })
            .catch(error => sendResponse({ success: false, error: error.toString() }));
        };

        if (key && key.trim() !== "") {
            // Use Gemini API
            fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    console.warn("Gemini API Error, falling back...", data.error.message);
                    handlePollinationsFallback();
                } else if (data.candidates && data.candidates[0]) {
                    const aiText = data.candidates[0].content.parts[0].text;
                    sendResponse({ success: true, data: aiText });
                } else {
                    handlePollinationsFallback();
                }
            })
            .catch(error => {
                console.warn("Gemini Network Error, falling back...", error);
                handlePollinationsFallback();
            });
        } else {
            // Use Free No-Key AI API (Pollinations)
            handlePollinationsFallback();
        }
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
