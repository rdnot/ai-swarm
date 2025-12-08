document.addEventListener('DOMContentLoaded', () => {
  const launchBtn = document.getElementById('launch');
  const questionInput = document.getElementById('question');
  const status = document.getElementById('status');

  launchBtn.addEventListener('click', () => {
    const question = questionInput.value.trim();
    if (!question) {
      status.textContent = 'Enter a question first!';
      status.style.color = 'red';
      return;
    }

    // 1. Copy to clipboard (Critical now, as injection is gone)
    navigator.clipboard.writeText(question).then(() => {
      console.log('Question copied to clipboard');
    }).catch((err) => {
      console.error('Clipboard copy failed:', err);
      // Fallback if permission issues occur
      alert('Copy failed! Please copy your question manually.');
    });

    // 2. Launch Tabs
    chrome.runtime.sendMessage({ action: 'launchSwarm', question: question }, (response) => {
      if (chrome.runtime.lastError) {
         console.error(chrome.runtime.lastError);
         return;
      }

      if (response && response.success) {
        status.textContent = 'Launched! Question is in clipboard — Paste (Ctrl+V) into chats.';
        status.style.color = 'blue';
        questionInput.value = ''; 
      } else {
        status.textContent = 'Launch failed';
        status.style.color = 'red';
      }
    });
  });

  // Allow Enter key to submit
  questionInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) { 
      event.preventDefault(); 
      launchBtn.click(); 
    }
  });
});