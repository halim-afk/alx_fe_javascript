// Load quotes from localStorage or use defaults
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Get busy living or get busy dying.", category: "Life" }
  ];
  
  // DOM elements
  const quoteDisplay = document.getElementById('quoteDisplay');
  const newQuoteBtn = document.getElementById('newQuote');
  
  // ✅ Save quotes to localStorage
  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }
  
  // ✅ Show a random quote, save it to sessionStorage
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    quoteDisplay.innerHTML = `"${quote.text}" — <strong>${quote.category}</strong>`;
  
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(quote));
  }
  
  // ✅ Add a new quote
  function addQuote() {
    const quoteInput = document.getElementById('newQuoteText');
    const categoryInput = document.getElementById('newQuoteCategory');
  
    const newText = quoteInput.value.trim();
    const newCategory = categoryInput.value.trim();
  
    if (newText && newCategory) {
      quotes.push({ text: newText, category: newCategory });
      saveQuotes(); // Persist in localStorage
      showRandomQuote();
      quoteInput.value = "";
      categoryInput.value = "";
    } else {
      alert("Please fill in both fields.");
    }
  }
  
  // ✅ Create the Add Quote Form dynamically
  function createAddQuoteForm() {
    const container = document.getElementById('addQuoteFormContainer');
  
    const quoteInput = document.createElement('input');
    quoteInput.type = 'text';
    quoteInput.id = 'newQuoteText';
    quoteInput.placeholder = 'Enter a new quote';
  
    const categoryInput = document.createElement('input');
    categoryInput.type = 'text';
    categoryInput.id = 'newQuoteCategory';
    categoryInput.placeholder = 'Enter quote category';
  
    const addBtn = document.createElement('button');
    addBtn.textContent = 'Add Quote';
    addBtn.addEventListener('click', addQuote);
  
    container.appendChild(quoteInput);
    container.appendChild(categoryInput);
    container.appendChild(addBtn);
  }
  
  // ✅ Export quotes to JSON file
  function exportToJson() {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  
  // ✅ Import quotes from uploaded JSON file
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      try {
        const importedQuotes = JSON.parse(event.target.result);
        if (Array.isArray(importedQuotes)) {
          quotes.push(...importedQuotes);
          saveQuotes();
          showRandomQuote();
          alert('Quotes imported successfully!');
        } else {
          alert('Invalid JSON format.');
        }
      } catch (e) {
        alert('Failed to import JSON: ' + e.message);
      }
    };
    fileReader.readAsText(event.target.files[0]);
  }
  
  // ✅ Restore last viewed quote from sessionStorage (optional)
  function loadLastViewedQuote() {
    const last = sessionStorage.getItem('lastViewedQuote');
    if (last) {
      const quote = JSON.parse(last);
      quoteDisplay.innerHTML = `"${quote.text}" — <strong>${quote.category}</strong>`;
    } else {
      showRandomQuote();
    }
  }
  
  // ✅ Setup everything on load
  createAddQuoteForm();
  newQuoteBtn.addEventListener('click', showRandomQuote);
  loadLastViewedQuote();
  