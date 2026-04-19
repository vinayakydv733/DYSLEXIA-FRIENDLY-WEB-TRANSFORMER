# Dyslexia-Friendly Web Transformer

A Google Chrome Extension that integrates advanced accessibility standards to provide a seamless, inclusive web browsing experience specifically targeted at reading and print disabilities like dyslexia. It incorporates robust multi-modal design logic to help minimize cognitive load and visual strain.

## 🌟 Key Features

### 1. Bionic Reading
Transforms text on any web page to highlight the initial letters of words, creating artificial fixation points. This guides the eyes through text more smoothly, allowing users to focus on comprehension rather than getting lost in visual "noise".

### 2. Multi-Modal Text-to-Speech (TTS)
Addresses print disabilities by providing audible alternatives for text content. By offering dual-channel (visual and auditory) information delivery, it drastically enhances comprehension and attention retention for users with dyslexia or visual impairments.

### 3. Advanced Color Blindness Modes
Intelligently re-colors the web page using sophisticated matrix filters. Features five specific clinically-researched color palettes:
- **Protanopia** (Red-Blind)
- **Deuteranopia** (Green-Blind)
- **Tritanopia** (Blue-Blind)
- **Achromatopsia** (Complete Color Blindness)
- **Anomalous Trichromacy**

### 4. Integrated Dictionary (with Hindi Support)
A built-in look-up engine enabling users to quickly select words and see their definitions or translations without losing the page's context. Includes comprehensive support for Latin and Hindi text rendering.

## 🧰 Tech Stack

- **Core Languages**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **Dependencies**: None. Pure Vanilla JS for maximum security, privacy, and lightweight performance.
- **Browser APIs Used**:
  - **Chrome Extension API** (Manifest V3)
  - **Web Speech API** (SpeechSynthesis for Text-to-Speech rendering)
  - **DOM MutationObserver API** (For highly efficient, non-blocking DOM text processing)
  - **SVG Matrix Filters** (To apply accurate color-blindness manipulations)
  - **Chrome Storage API** (For saving and syncing user accessibility preferences)
- **Design/Styling**: Custom CSS focused on visually stunning but highly readable and accessible UI/UX.

## 🛠️ Architecture

Built on modern **Manifest V3** standards with modularly separated business logic to guarantee performance:
- **Popup UI (`popup/`)**: The main control panel to toggle and configure accessibility modes.
- **Background Worker (`background/`)**: Service worker that coordinates background tasks.
- **Content Scripts (`content/`)**: 
  - `bionicEngine.js`: Custom DOM walker to handle safe text mutation for bionic rendering.
  - `ttsEngine.js`: Connects to SpeechSynthesis API for on-page text reading.
  - `colorBlindness.js`: Injects SVG-based color matrix filters securely onto the active page.
  - `translationClient.js`: Captures user text selection to serve contextual definitions.

## 🚀 Installation & Setup

1. Clone or download this repository to your local machine.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Turn on the **Developer mode** toggle in the top right corner.
4. Click the **Load unpacked** button and select the `DYSLEXIA-FRIENDLY-WEB-TRANSFORMER` folder.
5. The extension will install! Pin it to your browser toolbar for quick access.

## ⚙️ Usage

Click the extension icon in your browser toolbar to open the control panel. From there, you can turn features on or off as needed. 

Settings are automatically synchronized—when you toggle Bionic Reading or a Color Blindness filter, it persists seamlessly and applies dynamically to your browsing session without lag or jitter.
