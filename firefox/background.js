chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'launchSwarm') {
    const question = request.question;
    
    // We try to pass the question via URL params where possible.
    // If the site ignores it, the user has it in their clipboard.
    const sites = [
      { baseUrl: 'https://grok.com/', param: 'q' },
      { baseUrl: 'https://gemini.google.com/app', param: null }, // Gemini always requires manual paste
      { baseUrl: 'https://chatgpt.com/', param: 'q' }, // ChatGPT varies, sometimes accepts 'q' or 'prompt'
      { baseUrl: 'https://www.perplexity.ai/search', param: 'q' },
      { baseUrl: 'https://claude.ai/new', param: 'q' }
    ];

    let opened = 0;
    sites.forEach((site, index) => {
      setTimeout(() => {
        let launchUrl = site.baseUrl;
        if (site.param && question) {
          // Construct URL: https://site.com/?param=question
          launchUrl += (site.baseUrl.includes('?') ? '&' : '?') + site.param + '=' + encodeURIComponent(question);
        }
        
        chrome.tabs.create({
          url: launchUrl,
          active: index === 0
        }, () => {
          opened++;
          if (opened === sites.length) {
            sendResponse({ success: true });
          }
        });
      }, index * 500); // 500ms delay between tabs
    });

    return true;
  }
});