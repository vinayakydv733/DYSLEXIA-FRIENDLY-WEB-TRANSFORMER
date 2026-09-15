# Dyslexia-Friendly Web Transformer (Hackathon Edition)

## 📌 Project Overview
The **Dyslexia-Friendly Web Transformer** is an AI-powered browser-level accessibility layer designed to help users SEE, READ, LISTEN TO, and UNDERSTAND the web more comfortably. It offers on-the-fly transformations for users with Dyslexia, Visual Impairments, and anyone who benefits from distraction-free reading.

## 🛠️ Tech Stack
- **Frontend:** HTML5, Vanilla JavaScript, CSS3
- **Core Engine:** Chrome Extension APIs (Manifest V3)
- **External Integrations:** 
  - **Google Gemini API:** For intelligent Summarization, Simplification, and Explanations.
  - **Pollinations API:** Fallback free AI (gracefully handled).
  - **Google Translate API:** For on-the-fly word translations.
  - **Free Dictionary API:** For word definitions.
  - **Web Speech API (SpeechSynthesis):** For Text-to-Speech (TTS) capabilities.

---

## ⚙️ Architecture & Data Flow

### 1. Popup (User Interface) - `popup/popup.html` & `popup/popup.js`
- **Role:** The control center organized into logical accessibility groups (👁 Visual, 📖 Reading, 🔊 Listen, 🧠 Understand, ⚙️ Preferences).
- **Presets System:** Includes 1-click profiles (Dyslexia Focus, Low Vision, Focus Reading). Switching to a preset preserves custom settings for later.

### 2. Background Service Worker - `background/background.js`
- **Role:** Central API proxy and AI fallback manager.
- **Resilience:** Implements a graceful `Gemini -> Pollinations -> Friendly Error` fallback to ensure the extension never crashes due to API limits.

### 3. Content Scripts - `content/`
- **Role:** The core engine that manipulates the DOM securely and efficiently.
- **Modules:** `bionicEngine.js`, `colorBlindness.js`, `translationClient.js`, `ttsEngine.js`, `readingRuler.js`, `aiAgent.js`, `content.js`.
- **Dynamic Content:** Uses a debounced `MutationObserver` to efficiently apply Bionic Reading to newly loaded elements (e.g., infinite scrolls) without performance hits.

---

## 🌟 Feature Breakdown

### 1. 📖 Bionic Reading (`bionicEngine.js`)
- Highly optimized using `TreeWalker`.
- Safely ignores inputs, textareas, code blocks, and contenteditable elements to prevent breaking rich web apps.

### 2. 🤖 Smart AI Agent (`aiAgent.js`)
- **Semantic Content Extraction:** Intelligently parses only `<article>`, `<main>`, `<p>`, and headings while ignoring navigation, ads, and footers for high-accuracy AI processing.
- **AI Modes:** 
  - `📝 Summarize Page`: Short, structured bullet points of the main article.
  - `🧩 Simplify Page`: Rewrites the page in plain, easy-to-read English.
- **Selected Text Action Menu:** Highlighting text spawns a floating, unobtrusive menu offering:
  - `💡 Explain`
  - `🧸 ELI10 (Explain Like I'm 10)`
  - `🔊 Read Aloud`
  - `📖 Define`

### 3. 📏 Focus Mode Reading Ruler (`readingRuler.js`)
- A horizontal focus slit that follows the mouse cursor smoothly using `requestAnimationFrame`.
- Dims the rest of the webpage above and below the cursor to eliminate peripheral distractions.

### 4. 🎨 Visual & Typography (`content.js` & `colorBlindness.js`)
- Supports dyslexia-friendly fonts (Lexend, Comic Sans).
- Fully customizable text sizes, line spacing, background colors, and color blindness filters (Protanopia, Deuteranopia, Tritanopia, Monochromacy).

### 5. 🔊 Advanced TTS (`ttsEngine.js`)
- Integrated tightly with the Action Menu and AI Modal.
- Supports adjustable reading speeds (0.7x to 1.7x) synced directly from the popup preferences.
