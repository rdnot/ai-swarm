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

    // 1. Copy to clipboard
    navigator.clipboard.writeText(question).then(() => {
      console.log('Question copied to clipboard');
    }).catch((err) => {
      console.error('Clipboard copy failed:', err);
      status.textContent = 'Copy failed—copy manually!';
    });

    // 2. Launch Tabs
    chrome.runtime.sendMessage({ action: 'launchSwarm', question: question }, (response) => {
      // Check for errors
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        status.textContent = 'Error launching tabs.';
        return;
      }

      if (response && response.success) {
        status.textContent = 'Launched! Paste (Ctrl+V) into chats.';
        status.style.color = 'green';
        questionInput.value = ''; // Clear input
      } else {
        status.textContent = 'Launch failed.';
        status.style.color = 'red';
      }
    });
  });

  // Enter key support
  questionInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) { 
      event.preventDefault(); 
      launchBtn.click(); 
    }
  });
});