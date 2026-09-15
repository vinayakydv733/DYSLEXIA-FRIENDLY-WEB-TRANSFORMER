# Dyslexia-Friendly Web Transformer (Production Ready)

## 📌 Project Overview
The **Dyslexia-Friendly Web Transformer** is an AI-powered accessibility platform designed to help users SEE, READ, LISTEN TO, and UNDERSTAND the web more comfortably. It consists of a **Browser Extension**, a secure **Backend**, and a modern **SaaS Website**.

It offers on-the-fly transformations for users with Dyslexia, Visual Impairments, and anyone who benefits from distraction-free reading, right inside their browser.

---

## 🚀 Key Features

### 👁 Visual & Typography (Local)
- **Bionic Reading:** Highlights the start of words to guide your eyes effortlessly.
- **Reading Ruler / Focus Mode:** Dims the screen and highlights the specific lines you are reading, with adjustable opacity and height.
- **Color Blindness Filters:** Protanopia, Deuteranopia, Tritanopia, and Achromatopsia simulators and correctors.
- **Custom Typography:** Dyslexia-friendly fonts (Lexend, Comic Sans), adjustable sizes, line spacing, and high-contrast color palettes.

### 🔊 Listen (Local)
- **Intelligent Text-to-Speech:** Select any text and click 'Read' to hear it spoken aloud. Features a floating mini-player with Play/Pause/Stop controls and adjustable reading speed.

### 🧠 Understand & AI (Backend Powered)
- **AI Simplification:** Rewrite complex articles into simple, easy-to-understand English.
- **Reading Levels:** Choose between Simple (Default), School Level, College Level, or Detailed explanations.
- **Summarization:** Condense long articles into bite-sized bullet points.
- **Instant Translation:** Translate difficult words or entire sentences into 10+ languages on the fly.

---

## 🛠️ Architecture

This project is divided into three core components:

### 1. `extension/` (The Browser Extension)
- Built using pure HTML5, CSS3, and Vanilla JavaScript (Manifest V3).
- Fast, secure, and privacy-focused content scripts that do not require external frameworks.
- Interacts directly with the DOM to transform webpage text in real-time.

### 2. `backend/` (Node.js Express API)
- A secure proxy for Google Gemini AI integrations.
- Protects API keys and rate-limits users.
- Connects the extension to the powerful AI processing required for simplification and summarization.

### 3. `website/` (React SaaS Platform)
- A modern, premium landing page and user dashboard built with React and Vite.
- Includes installation guides, pricing models (Freemium), and account dashboards.
- Helps onboard users and offers the extension for download.

---

## 🔧 Installation & Setup

### 1. Start the Backend API
```bash
cd backend
npm install
# Create a .env file based on .env.example and add your GEMINI_API_KEY
npm run dev
```
*The backend will run on `http://localhost:3000`.*

### 2. Start the Website (Frontend)
```bash
cd website
npm install
npm run dev
```
*The website will run on `http://localhost:5173`.*

### 3. Load the Extension into Chrome
1. Open Google Chrome and go to `chrome://extensions/`.
2. Enable **Developer mode** in the top right corner.
3. Click **Load unpacked**.
4. Select the `extension/` directory from this project.
5. The extension is now active on all websites!

---

## 🔐 Privacy by Design
- No user passwords or API keys are required on the client side.
- Page text is only sent to the backend when explicitly triggering an AI feature (Summarize/Simplify/Explain).
- Local visual features (Bionic, Ruler, TTS) work 100% offline.

---
*Built with ❤️ for a more accessible web.*
