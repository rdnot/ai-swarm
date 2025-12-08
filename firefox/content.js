// Wait for page to load, then paste
function pasteQuestion() {
  if (window.location.hostname.includes('gemini.google.com')) {
    console.log('Skipping auto-paste for Gemini—use clipboard!');
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const question = urlParams.get('q') || urlParams.get('prompt');
  if (!question) return;

  let input;

  if (window.location.hostname.includes('chatgpt.com')) {
    input = document.querySelector('textarea[id="prompt-textarea"]');
  } else if (window.location.hostname.includes('grok.com')) {
    input = document.querySelector('textarea[placeholder*="Ask Grok"], textarea[data-testid="grok-input"]');
  } else if (window.location.hostname.includes('perplexity.ai')) {
    input = document.querySelector('textarea[placeholder*="Search or ask"], input[name="q"]');
  } else if (window.location.hostname.includes('claude.ai')) {
    input = document.querySelector('textarea[placeholder*="Message Claude"], textarea[data-id="composer"]');
  }

  if (input) {
    input.value = decodeURIComponent(question);
    input.focus();
    
    // Simulate events for React/Vue frameworks to detect change
    const inputEvent = new Event('input', { bubbles: true });
    const changeEvent = new Event('change', { bubbles: true });
    input.dispatchEvent(inputEvent);
    input.dispatchEvent(changeEvent);
    
    console.log('Pasted question to ' + window.location.hostname);
  } else {
    console.error('Input not found on ' + window.location.hostname);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', pasteQuestion);
} else {
  pasteQuestion();
}
setTimeout(pasteQuestion, 3000);

const observer = new MutationObserver(() => {
  pasteQuestion();
});
observer.observe(document.body, { childList: true, subtree: true });