const { getPrompt } = require('../prompts/accessibilityPrompts');

async function generateAIResponse({ operation, text, readingLevel, language }) {
    const key = process.env.GEMINI_API_KEY;
    
    // Select the appropriate prompt based on the operation and reading level
    const systemPrompt = getPrompt(operation, readingLevel);

    if (key && key.trim() !== "") {
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    system_instruction: { parts: [{ text: systemPrompt }] },
                    contents: [{ parts: [{ text: text }] }]
                })
            });
            
            const data = await response.json();
            
            if (data.error) {
                console.warn("Gemini API Error, falling back...", data.error.message);
                return await fallbackAI(systemPrompt, text);
            } else if (data.candidates && data.candidates[0]) {
                return data.candidates[0].content.parts[0].text;
            } else {
                return await fallbackAI(systemPrompt, text);
            }
        } catch (error) {
            console.warn("Gemini Network Error, falling back...", error.message);
            return await fallbackAI(systemPrompt, text);
        }
    } else {
        // Fallback directly if no key is set
        return await fallbackAI(systemPrompt, text);
    }
}

async function fallbackAI(systemPrompt, text) {
    // Pollinations Free AI Fallback
    const response = await fetch('https://text.pollinations.ai/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: text }
            ],
            model: 'mistral' // Use mistral to bypass default OpenAI budget limits on free tier
        })
    });

    if (!response.ok) {
        throw new Error("Free AI service is currently busy.");
    }
    
    const data = await response.text();
    const lowerData = data.toLowerCase();
    
    // Check if Pollinations returned an API limit error string
    if (lowerData.includes("budget") || lowerData.includes("api key") || lowerData.includes("limit") || lowerData.includes("error")) {
        throw new Error("Free AI server is out of budget.");
    }
    
    return data;
}

module.exports = { generateAIResponse };
