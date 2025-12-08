// Wait for page to load, then paste
function pasteQuestion() {
  // Skip Gemini—user handles manual paste via clipboard
  if (window.location.hostname.includes('gemini.google.com')) {
    console.log('Skipping auto-paste for Gemini—use clipboard!');
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const question = urlParams.get('q') || urlParams.get('prompt'); // Grab from ?q= or ?prompt=
  if (!question) return; // No question? Bail.

  let input;
  let useInnerText = false; // Flag for contenteditable divs (not needed now)

  // Site-specific input selectors (tuned for current UIs)
  if (window.location.hostname.includes('chatgpt.com')) {
    input = document.querySelector('textarea[id="prompt-textarea"]'); // Precise for new ChatGPT
  } else if (window.location.hostname.includes('grok.com')) {
    input = document.querySelector('textarea[placeholder*="Ask Grok"], textarea[data-testid="grok-input"]');
  } else if (window.location.hostname.includes('perplexity.ai')) {
    input = document.querySelector('textarea[placeholder*="Search or ask"], input[name="q"]'); // Works on /search
  } else if (window.location.hostname.includes('claude.ai')) {
    input = document.querySelector('textarea[placeholder*="Message Claude"], textarea[data-id="composer"]');
  }

  if (input) {
    input.value = decodeURIComponent(question);
    input.focus(); // Highlight for you
    
    // Simulate input/change events for UI triggers
    const inputEvent = new Event('input', { bubbles: true });
    const changeEvent = new Event('change', { bubbles: true });
    input.dispatchEvent(inputEvent);
    input.dispatchEvent(changeEvent);
    
    console.log('Pasted question to ' + window.location.hostname);
  } else {
    console.error('Input not found on ' + window.location.hostname + '. Check selectors.');
  }
}

// Run on load, and retry if dynamic (e.g., SPAs)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', pasteQuestion);
} else {
  pasteQuestion();
}
setTimeout(pasteQuestion, 3000); // Fallback for slow loads

// Optional: Watch for dynamic input creation
const observer = new MutationObserver(() => {
  pasteQuestion(); // Re-check if input appears later
});
observer.observe(document.body, { childList: true, subtree: true });