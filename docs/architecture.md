# Project Documentation & Architecture

## Overview
Dyslexia-Friendly Web Transformer has been upgraded from a client-side API model to a production-ready client-server architecture using Node.js and Express.

## Business Model
- **Freemium Approach:**
  - Free Tier: Local features (Bionic Reading, Ruler, Typography) + limited AI usage.
  - Premium Tier: Unlimited AI summaries, simplification, and advanced reading levels.

## Privacy & Security
- **No API Keys Required on Client:** Users no longer need to provide their own Gemini API keys.
- **Secure Backend:** All AI calls are routed through `http://localhost:3000/api/ai`.
- **Zero Logging:** Page content is processed in memory and immediately discarded.

## Next Launch Steps
1. Deploy the Node.js backend to a cloud provider (e.g., Render, Heroku, Vercel).
2. Update the Extension's `background.js` fetch URL to point to the live server.
3. Publish to Chrome Web Store.
