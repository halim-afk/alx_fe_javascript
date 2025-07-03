// ✅ Simulate fetching from a server (mock function)
async function fetchServerQuotes() {
    try {
      // Simulated "server" URL (you can replace this with a real API or file server)
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
      const serverQuotes = await response.json();
  
      // Simulate mapping server posts to quote objects
      const mapped = serverQuotes.map(post => ({
        text: post.title,
        category: "Server"
      }));
  
      resolveConflicts(mapped);
    } catch (err) {
      console.error("Error fetching server quotes:", err);
    }
  }
  
  // ✅ Conflict resolution strategy: server data replaces local only if new
  function resolveConflicts(serverQuotes) {
    let newAdded = 0;
  
    serverQuotes.forEach(serverQuote => {
      const exists = quotes.some(q => q.text === serverQuote.text);
      if (!exists) {
        quotes.push(serverQuote);
        newAdded++;
      }
    });
  
    if (newAdded > 0) {
      saveQuotes();
      populateCategories();
      notifyUser(`${newAdded} quote(s) synced from server.`);
    }
  }
  
  // ✅ Display a sync message
  function notifyUser(message) {
    const banner = document.createElement("div");
    banner.textContent = message;
    banner.style.background = "#e0ffe0";
    banner.style.border = "1px solid green";
    banner.style.padding = "10px";
    banner.style.marginTop = "20px";
    banner.style.fontWeight = "bold";
  
    document.body.insertBefore(banner, document.body.firstChild);
  
    setTimeout(() => {
      banner.remove();
    }, 5000);
  }
  
  // ✅ Periodically sync every 30 seconds
  setInterval(fetchServerQuotes, 30000);
  