// Quotes array with some initial data
const quotes = [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Do not watch the clock. Do what it does. Keep going.", category: "Motivation" },
    { text: "Get busy living or get busy dying.", category: "Life" }
  ];
  
  // DOM references
  const quoteDisplay = document.getElementById('quoteDisplay');
  const newQuoteBtn = document.getElementById('newQuote');
  const addQuoteFormContainer = document.getElementById('addQuoteFormContainer');
  
  // Show a random quote from the quotes array
  function showRandomQuote() {
    if (quotes.length === 0) {
      quoteDisplay.textContent = "No quotes available. Please add some!";
      return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    quoteDisplay.textContent = `"${quote.text}" — Category: ${quote.category}`;
  }
  
  // Create and append the form for adding new quotes
  function createAddQuoteForm() {
    const form = document.createElement('form');
  
    // Input for quote text
    const quoteInput = document.createElement('input');
    quoteInput.type = 'text';
    quoteInput.id = 'newQuoteText';
    quoteInput.placeholder = 'Enter a new quote';
    quoteInput.required = true;
  
    // Input for quote category
    const categoryInput = document.createElement('input');
    categoryInput.type = 'text';
    categoryInput.id = 'newQuoteCategory';
    categoryInput.placeholder = 'Enter quote category';
    categoryInput.required = true;
  
    // Submit button
    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Add Quote';
  
    // Append inputs and button to form
    form.appendChild(quoteInput);
    form.appendChild(categoryInput);
    form.appendChild(submitBtn);
  
    // Handle form submission
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      addQuote(quoteInput.value.trim(), categoryInput.value.trim());
      form.reset();
    });
  
    addQuoteFormContainer.appendChild(form);
  }
  
  // Add a new quote to the array and update display
  function addQuote(text, category) {
    if (!text || !category) {
      alert("Both quote and category are required!");
      return;
    }
  
    quotes.push({ text, category });
    alert("Quote added successfully!");
    showRandomQuote();
  }
  
  // Event listeners
  newQuoteBtn.addEventListener('click', showRandomQuote);
  
  // Initialize
  createAddQuoteForm();
  showRandomQuote();
  