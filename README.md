<div align="center">
  
# 🏆 Dyslexia-Friendly Web Transformer
**An Agentic AI-Powered Accessibility Tool for a More Inclusive Web**

[![Manifest](https://img.shields.io/badge/Manifest-V3-blue.svg)](https://developer.chrome.com/docs/extensions/mv3/)
[![Vanilla JS](https://img.shields.io/badge/JavaScript-Vanilla-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

</div>

---

## 🚀 Overview

The **Dyslexia-Friendly Web Transformer** is a cutting-edge Google Chrome Extension designed to dismantle digital barriers. It integrates advanced accessibility standards, intelligent typography controls, and **Agentic AI** to provide a seamless, inclusive web browsing experience specifically targeted at users with reading and print disabilities like dyslexia, as well as elderly and non-technical users. 

Built with robust multi-modal design logic, it minimizes cognitive load and visual strain, empowering everyone to browse the web with confidence.

---

## ✨ Key Features

### 🧠 Agentic AI Page Summarization & Simplification
Powered by Gemini AI, the extension can analyze, summarize, and simplify complex web pages at the click of a button. 
* **Zero-Setup Experience**: Works out of the box with a free, built-in AI fallback, ensuring non-technical users never have to configure anything.
* **Pro Mode**: Supports optional user-provided Gemini API keys for power users who want advanced functionality.

### 👁️ Bionic Reading Engine
Transforms text on any web page to dynamically highlight the initial letters of words. This creates artificial fixation points, guiding the eyes through text more smoothly and allowing users to focus on comprehension rather than getting lost in visual noise.

### 🗣️ Multi-Modal Text-to-Speech (TTS)
Select any text to hear it spoken aloud! By offering dual-channel (visual and auditory) information delivery, it drastically enhances comprehension and attention retention for users with dyslexia, ADHD, or visual impairments.

### 🌍 Integrated Multi-Language Translation & Dictionary
A built-in look-up engine enabling users to quickly double-click words and see their definitions or translations without losing context. Includes comprehensive support for multiple languages including Hindi, Spanish, French, German, Chinese, Japanese, Arabic, Russian, Portuguese, and Italian.

### 🎨 Advanced Color Blindness Matrix Filters
Intelligently re-colors the web page using sophisticated, secure SVG matrix filters. Features specific clinically-researched color palettes:
- **Protanopia** (Red-Blind)
- **Deuteranopia** (Green-Blind)
- **Tritanopia** (Blue-Blind)
- **Achromatopsia** (Complete Color Blindness)
- **Anomalous Trichromacy** (Mild)

### 🔤 Comprehensive Typographic & Theme Controls
Personalize your reading environment exactly how you need it:
- **Fonts**: Dyslexia-friendly options like Lexend and Comic Sans.
- **Scaling & Spacing**: Adjust font sizes and line spacing (relaxed, loose, double) for ultimate readability.
- **Contrast Themes**: High contrast dark mode, warm sepia, soft blue, and custom text coloring to reduce glare and eye strain.

---

## 🧰 Tech Stack & Architecture

Built purely on modern **Manifest V3** standards with modularly separated business logic to guarantee lightning-fast performance and maximum security.

- **Core**: Vanilla JavaScript (ES6+), HTML5, CSS3. **Zero external bloat or dependencies.**
- **AI Integration**: Gemini API for advanced NLP capabilities.
- **Browser APIs Used**:
  - **Chrome Extension API** (Manifest V3)
  - **Web Speech API** (SpeechSynthesis for Text-to-Speech)
  - **DOM MutationObserver API** (For highly efficient, non-blocking text processing)
  - **SVG Matrix Filters** (For zero-lag color blindness manipulations)
  - **Chrome Storage API** (For real-time syncing of user preferences)

---

## 🚀 Installation & Setup

1. Clone or download this repository to your local machine.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Turn on the **Developer mode** toggle in the top right corner.
4. Click the **Load unpacked** button and select the `DYSLEXIA-FRIENDLY-WEB-TRANSFORMER` folder.
5. The extension will install instantly! Pin it to your browser toolbar for quick access.

---

## ⚙️ Usage

Click the extension icon in your browser toolbar to open the control panel. From there, you can toggle features on or off as needed. 

Settings are automatically synchronized—when you toggle Bionic Reading, change the font to Lexend, or select a Color Blindness filter, it persists seamlessly and applies dynamically to your browsing session without lag or jitter.

For the **AI Features**, simply click the "Summarize & Simplify Page" button. You can optionally paste your own Gemini API key for uncapped usage, or leave it blank to use the built-in free tier!

---

<div align="center">
  <i>Built with ❤️ for a more accessible web.</i>
</div>
