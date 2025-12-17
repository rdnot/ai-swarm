# AI Swarm

![Popup Interface](screenshot.png)

A browser extension that opens 5 AI sites quickly (grok.com, gemini.google.com/app, chatgpt.com, www.perplexity.ai/search, claude.ai/new). It passes a question via URL parameter (/?q=) if possible and copies the question to the clipboard for manual pasting.

## About
AI Swarm is a simple yet powerful browser extension designed to streamline access to multiple AI chat interfaces. With one click, it opens new tabs for Grok, Gemini, ChatGPT, Perplexity, and Claude. It supports passing a user-entered question directly via URL parameters where supported by the sites, and always copies the question to your clipboard for easy pasting. Ideal for quick AI queries, research, or comparing responses across platforms. No data collection or tracking—everything happens client-side.

## Features
- Opens five popular AI sites in new tabs: Grok (grok.com), Gemini (gemini.google.com/app), ChatGPT (chatgpt.com), Perplexity (www.perplexity.ai/search), and Claude (claude.ai/new).
- Automatically passes a question via `/?q=` URL parameter (if the site supports it).
- Copies the entered question to the clipboard for manual pasting on sites that don't support URL parameters.

## Installation

### Chrome
https://chromewebstore.google.com/detail/ai-swarm/bladhchobceafiihhegbnlkkelljhhcn
1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable "Developer mode" in the top right.
4. Click "Load unpacked" and select the `chrome/` folder from the repo (or the root if not using subfolders).
5. The extension should appear in your toolbar. Click it to open the popup.

### Firefox
https://addons.mozilla.org/en-US/firefox/addon/ai-swarm/
1. Clone or download this repository.
2. Open Firefox and go to `about:debugging#/runtime/this-firefox`.
3. Click "Load Temporary Add-on" and select the `manifest.json` file from the `firefox/` folder (or the root if not using subfolders).
4. The extension will load temporarily (until browser restart). For permanent installation, use Firefox Developer Edition or use a signed version.
   

## Usage
1. Install the extension as described above.
2. Click the extension icon in your toolbar to open the popup.
3. Enter your question in the input field.
4. Click the button to trigger: It will open 5 new tabs, pass the question via URL where possible, and copy it to your clipboard.
5. Paste the question manually on sites that don't auto-load it.

## License
This project is licensed under the MIT License.
