const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const aiRoutes = require('./routes/ai');

const app = express();
const PORT = process.env.PORT || 3000;

// Security Middlewares
app.use(helmet());
app.use(cors({
    // In production, restrict origin to your extension ID, e.g. origin: "chrome-extension://abcdefghijklmnop"
    origin: '*',
    methods: ['POST', 'GET'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '100kb' })); // Limit body payload to prevent massive text attacks

// Routes
app.use('/api/ai', aiRoutes);

// Extension Download Route
app.get('/api/download', (req, res) => {
    const file = path.join(__dirname, '../../extension-v1.0.zip');
    res.download(file, 'dyslexia-friendly-web-transformer.zip');
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Accessibility Backend is running' });
});

// Serve Frontend Website
app.use(express.static(path.join(__dirname, '../../website/dist')));

// Fallback for React Router
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../website/dist/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
