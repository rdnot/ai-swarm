chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'launchSwarm') {
    const question = request.question;
    
    // We try to pass the question via URL params where possible.
    // If the site ignores it, the user has it in their clipboard.
    const sites = [
      { baseUrl: 'https://grok.com/', param: 'q' },
      { baseUrl: 'https://gemini.google.com/app', param: null }, // Gemini requires manual paste
      { baseUrl: 'https://chatgpt.com/', param: 'q' }, // ChatGPT sometimes accepts q/prompt
      { baseUrl: 'https://www.perplexity.ai/search', param: 'q' },
      { baseUrl: 'https://claude.ai/new', param: 'q' }
    ];

    let opened = 0;
    sites.forEach((site, index) => {
      // Stagger openings by 500ms to avoid browser lag
      setTimeout(() => {
        let launchUrl = site.baseUrl;
        if (site.param && question) {
          // Construct URL: https://site.com/?param=question
          launchUrl += (site.baseUrl.includes('?') ? '&' : '?') + site.param + '=' + encodeURIComponent(question);
        }
        
        chrome.tabs.create({
          url: launchUrl,
          active: index === 0 // Focus the first tab
        }, () => {
          opened++;
          if (opened === sites.length) {
            sendResponse({ success: true });
          }
        });
      }, index * 500);
    });

    return true; // Keeps message channel open for async response
  }
});