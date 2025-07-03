// Quotes array
const quotes = [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Do not watch the clock. Do what it does. Keep going.", category: "Motivation" }
  ];
  
  // DOM elements
  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteBtn = document.getElementById("newQuote");
  
  // ✅ Show a random quote and use innerHTML
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    quoteDisplay.innerHTML = `"${quote.text}" — <strong>${quote.category}</strong>`;
  }
  
  // ✅ Add a new quote
  function addQuote() {
    const quoteInput = document.getElementById("newQuoteText");
    const categoryInput = document.getElementById("newQuoteCategory");
  
    const newText = quoteInput.value.trim();
    const newCategory = categoryInput.value.trim();
  
    if (newText && newCategory) {
      quotes.push({ text: newText, category: newCategory });
      showRandomQuote(); // Update DOM
      quoteInput.value = "";
      categoryInput.value = "";
    } else {
      alert("Please enter both a quote and a category.");
    }
  }
  
  // ✅ Create the add quote form dynamically
  function createAddQuoteForm() {
    const container = document.createElement("div");
  
    const quoteInput = document.createElement("input");
    quoteInput.type = "text";
    quoteInput.id = "newQuoteText";
    quoteInput.placeholder = "Enter a new quote";
  
    const categoryInput = document.createElement("input");
    categoryInput.type = "text";
    categoryInput.id = "newQuoteCategory";
    categoryInput.placeholder = "Enter quote category";
  
    const addButton = document.createElement("button");
    addButton.textContent = "Add Quote";
    addButton.addEventListener("click", addQuote);
  
    container.appendChild(quoteInput);
    container.appendChild(categoryInput);
    container.appendChild(addButton);
  
    document.body.appendChild(container);
  }
  
  // ✅ Attach event listener to the "Show New Quote" button
  newQuoteBtn.addEventListener("click", showRandomQuote);
  
  // ✅ Initialize
  createAddQuoteForm();
  showRandomQuote();
  