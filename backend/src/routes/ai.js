const express = require('express');
const router = express.Router();
const { generateAIResponse } = require('../services/geminiService');
const { checkRateLimit } = require('../middleware/rateLimit');

// POST /api/ai
router.post('/', checkRateLimit, async (req, res) => {
    try {
        const { operation, text, readingLevel, language } = req.body;
        
        if (!operation || !text) {
            return res.status(400).json({ success: false, error: 'Missing required fields: operation, text' });
        }
        
        // Prevent abuse by limiting the text size to roughly 15000 characters
        if (typeof text !== 'string' || text.length > 20000) {
            return res.status(413).json({ success: false, error: 'Text payload too large. Please select a smaller amount of text.' });
        }

        const aiResponse = await generateAIResponse({ operation, text, readingLevel, language });
        
        res.json({ success: true, data: aiResponse });
    } catch (error) {
        console.error("AI Route Error:", error.message);
        // Do not expose raw errors to the client
        res.status(503).json({ success: false, error: 'AI assistance is temporarily unavailable. Your reading tools are still available.' });
    }
});

module.exports = router;
