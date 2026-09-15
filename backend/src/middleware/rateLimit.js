// Rate Limiting and Freemium Plan checking

const rateLimit = require('express-rate-limit');

// Basic Rate Limiter for AI requests
// Limits each IP to 20 requests per 15 minutes.
const checkRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // Limit each IP to 20 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: { 
        success: false, 
        error: "Free AI usage limit reached. Please wait 15 minutes before trying again." 
    },
    handler: (req, res, next, options) => {
        // You could add logging here to track IPs that hit the limit
        console.warn(`Rate limit reached for IP: ${req.ip}`);
        res.status(options.statusCode).json(options.message);
    }
});

module.exports = { checkRateLimit };
