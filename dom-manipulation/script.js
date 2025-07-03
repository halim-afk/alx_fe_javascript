let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Get busy living or get busy dying.", category: "Life" }
  ];
  
  const quoteDisplay = document.getElementById('quoteDisplay');
  const newQuoteBtn = document.getElementById('newQuote');
  const categoryFilter = document.getElementById('categoryFilter');
  
  // ✅ Save quotes and last selected category to localStorage
  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }
  
  function saveSelectedCategory(category) {
    localStorage.setItem('selectedCategory', category);
  }
  
  // ✅ Populate category dropdown dynamically
  function populateCategories() {
    const categories = [...new Set(quotes.map(q => q.category))];
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  
    const saved = localStorage.getItem('selectedCategory');
    if (saved) {
      categoryFilter.value = saved;
    }
  }
  
  // ✅ Show a quote filtered by selected category
  function showRandomQuote() {
    const selected = categoryFilter.value;
    const filtered = selected === "all"
      ? quotes
      : quotes.filter(q => q.category === selected);
  
    if (filtered.length === 0) {
      quoteDisplay.innerHTML = "No quotes in this category.";
      return;
    }
  
    const randomIndex = Math.floor(Math.random() * filtered.length);
    const quote = filtered[randomIndex];
    quoteDisplay.innerHTML = `"${quote.text}" — <strong>${quote.category}</strong>`;
  
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(quote));
  }
  
  // ✅ Add a new quote and update categories
  function addQuote() {
    const quoteInput = document.getElementById("newQuoteText");
    const categoryInput = document.getElementById("newQuoteCategory");
  
    const newText = quoteInput.value.trim();
    const newCategory = categoryInput.value.trim();
  
    if (newText && newCategory) {
      quotes.push({ text: newText, category: newCategory });
      saveQuotes();
      populateCategories();
      showRandomQuote();
      quoteInput.value = "";
      categoryInput.value = "";
    } else {
      alert("Please fill in both fields.");
    }
  }
  
  // ✅ Create form dynamically
  function createAddQuoteForm() {
    const container = document.getElementById("addQuoteFormContainer");
  
    const quoteInput = document.createElement("input");
    quoteInput.type = "text";
    quoteInput.id = "newQuoteText";
    quoteInput.placeholder = "Enter a new quote";
  
    const categoryInput = document.createElement("input");
    categoryInput.type = "text";
    categoryInput.id = "newQuoteCategory";
    categoryInput.placeholder = "Enter quote category";
  
    const addBtn = document.createElement("button");
    addBtn.textContent = "Add Quote";
    addBtn.addEventListener("click", addQuote);
  
    container.appendChild(quoteInput);
    container.appendChild(categoryInput);
    container.appendChild(addBtn);
  }
  
  // ✅ Filter quotes by selected category
  function filterQuotes() {
    const selected = categoryFilter.value;
    saveSelectedCategory(selected);
    showRandomQuote();
  }
  
  // ✅ Export quotes to JSON
  function exportToJson() {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  
  // ✅ Import quotes from JSON
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
      try {
        const importedQuotes = JSON.parse(event.target.result);
        if (Array.isArray(importedQuotes)) {
          quotes.push(...importedQuotes);
          saveQuotes();
          populateCategories();
          showRandomQuote();
          alert("Quotes imported successfully!");
        } else {
          alert("Invalid JSON format.");
        }
      } catch (e) {
        alert("Failed to import JSON: " + e.message);
      }
    };
    fileReader.readAsText(event.target.files[0]);
  }
  
  // ✅ Load last viewed quote
  function loadLastViewedQuote() {
    const last = sessionStorage.getItem('lastViewedQuote');
    const selected = localStorage.getItem('selectedCategory');
    if (selected) {
      categoryFilter.value = selected;
    }
  
    if (last) {
      const quote = JSON.parse(last);
      quoteDisplay.innerHTML = `"${quote.text}" — <strong>${quote.category}</strong>`;
    } else {
      showRandomQuote();
    }
  }
  
  // ✅ Initialize app
  createAddQuoteForm();
  populateCategories();
  newQuoteBtn.addEventListener('click', showRandomQuote);
  loadLastViewedQuote();
  