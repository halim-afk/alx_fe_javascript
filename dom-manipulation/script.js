// ✅ Function: Fetch quotes from mock server
async function fetchQuotesFromServer() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3'); // Simulated API
      const serverQuotes = await response.json();
  
      // Map server data to our format
      const mappedQuotes = serverQuotes.map(post => ({
        text: post.title,
        category: "Server"
      }));
  
      syncQuotes(mappedQuotes);
    } catch (error) {
      console.error("Failed to fetch quotes from server:", error);
    }
  }
  
  // ✅ Function: Sync server quotes with local and resolve conflicts
  function syncQuotes(serverQuotes) {
    let newQuotes = 0;
  
    serverQuotes.forEach(serverQuote => {
      const exists = quotes.some(localQuote => localQuote.text === serverQuote.text);
      if (!exists) {
        quotes.push(serverQuote);
        newQuotes++;
      }
    });
  
    if (newQuotes > 0) {
      saveQuotes();
      populateCategories();
      notifySyncUpdate(`${newQuotes} quote(s) synced from server.`);
    }
  }
  
  // ✅ Function: Post new quote to server (mock POST)
  async function postQuoteToServer(quote) {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quote)
      });
  
      if (response.ok) {
        console.log("Quote posted to server:", await response.json());
      }
    } catch (err) {
      console.error("Failed to post quote:", err);
    }
  }
  
  // ✅ Function: Notify UI about sync/conflict updates
  function notifySyncUpdate(message) {
    const banner = document.createElement("div");
    banner.textContent = message;
    banner.style.background = "#ffffcc";
    banner.style.border = "1px solid #cccc00";
    banner.style.padding = "10px";
    banner.style.margin = "10px 0";
    ban
  