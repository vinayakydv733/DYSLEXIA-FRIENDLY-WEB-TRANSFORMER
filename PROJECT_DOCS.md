# Dyslexia-Friendly Web Transformer

## 📌 Project Overview
The **Dyslexia-Friendly Web Transformer** is a comprehensive Google Chrome Extension designed to make the web more accessible for users with Dyslexia and Visual Impairments (like Color Blindness). By providing on-the-fly transformations to web pages, it empowers users to consume content faster, with better focus, and reduced eye strain.

## 🛠️ Tech Stack
This extension is built using standard web technologies and Chrome Extension Manifest V3.
- **Frontend:** HTML5, Vanilla JavaScript, CSS3
- **Core Engine:** Chrome Extension APIs (Manifest V3)
- **External Integrations:** 
  - **Google Gemini API:** For Agentic AI summarization and text simplification.
  - **Pollinations API:** Fallback free AI for summarization.
  - **Google Translate API:** For on-the-fly word translations.
  - **Free Dictionary API:** For word definitions.
  - **Web Speech API (SpeechSynthesis):** For Text-to-Speech (TTS) capabilities.

---

## ⚙️ Architecture & Data Flow

The extension is modular and follows the standard Manifest V3 architecture:

### 1. Popup (User Interface) - `popup/popup.html` & `popup/popup.js`
- **Role:** The control center where the user can toggle features and customize their preferences.
- **Flow:** When a user changes a setting (e.g., changes the font or toggles the Reading Ruler), `popup.js` saves the state in `chrome.storage.sync` and immediately sends an `updateSettings` message to the active tab's content script to apply the changes in real-time.

### 2. Background Service Worker - `background/background.js`
- **Role:** Acts as the central API proxy and background state manager.
- **Flow:** Content scripts cannot make certain API calls securely (e.g., hiding API keys). Instead, the content script sends messages to `background.js` to perform external network requests (Dictionary lookups, Translations, AI prompts). The background script fetches the data and sends it back to the content script.

### 3. Content Scripts - `content/`
- **Role:** The core engine that manipulates the DOM of the active webpage.
- **Flow:** `content.js` acts as the main controller. It reads settings from `chrome.storage.sync` on page load, listens for live updates from the popup, and delegates tasks to specific feature modules:
  - `bionicEngine.js`
  - `colorBlindness.js`
  - `translationClient.js`
  - `ttsEngine.js`
  - `readingRuler.js`
  - `aiAgent.js`

---

## 🌟 Feature Breakdown

### 1. 📖 Bionic Reading (`bionicEngine.js`)
- **What it is:** Bionic reading highlights the initial letters of words (e.g., **wel**come) to guide the eyes artificially through text, increasing reading speed.
- **How it works:** Uses a highly optimized `TreeWalker` to traverse text nodes on the page safely. It calculates the length of each word and wraps the first ~40% of the word in a bold `<span>` tag.

### 2. 🎨 Color Blindness Filters (`colorBlindness.js`)
- **What it is:** Specialized color palettes for different types of color blindness.
- **How it works:** Injects a dynamic `<style>` tag that overrides the `background-color`, `text-color`, and `border-color` of all elements. It supports modes like:
  - Protanopia (Red-blindness)
  - Deuteranopia (Green-blindness)
  - Tritanopia (Blue-blindness)
  - Achromatopsia (Monochromacy)
  - Mild adjustment

### 3. ✍️ Typography & Styling (`content.js`)
- **What it is:** Customizes the reading environment to reduce visual stress.
- **Features:** 
  - **Fonts:** Overrides website fonts with dyslexia-friendly fonts like *Lexend* or *Comic Sans*.
  - **Spacing:** Increases line spacing (1.5, 1.75, 2.0).
  - **Colors:** Custom Background Colors (Warm Sepia, Soft Blue, High Contrast) and Text Colors.

### 4. 📚 Dictionary & Translate (`translationClient.js`)
- **What it is:** Instant definitions and translations.
- **How it works:** When the user selects a word, the script detects the `mouseup` event. It captures the selected text and communicates with `background.js` to fetch definitions from the Free Dictionary API and translations from Google Translate. It then displays a floating tooltip near the cursor.

### 5. 🔊 Text-To-Speech (TTS) (`ttsEngine.js`)
- **What it is:** Reads selected text aloud.
- **How it works:** Uses the native browser `window.speechSynthesis` API. When enabled, highlighting any text automatically triggers the TTS engine to read it out loud. Clicking away cancels the speech.

### 6. 📏 Reading Ruler / Focus Mode (`readingRuler.js`)
- **What it is:** A visual aid that helps users maintain focus on a single line of text without getting lost.
- **How it works:** Injects a full-width, semi-transparent HTML `<div>` with bordered edges. An event listener tracks `mousemove` and updates the vertical position (`top`) of the ruler so it strictly follows the user's cursor.

### 7. 🤖 Agentic AI Summarizer (`aiAgent.js`)
- **What it is:** An on-page AI assistant that simplifies complex articles into short, easy-to-read summaries.
- **How it works:** 
  - Extracts the main text from the page (ignoring navbars and sidebars).
  - Sends the text to `background.js`, which queries either the user's **Google Gemini API** or a fallback free AI (Pollinations).
  - Displays the simplified summary in a beautifully formatted custom modal injected into the page.
  - Users can even click "Read Aloud" or "Translate" directly inside the AI modal.
