// Initial quote list
const quotes = [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Get busy living or get busy dying.", category: "Life" }
  ];
  
  // Reference DOM elements
  const quoteDisplay = document.getElementById('quoteDisplay');
  const newQuoteBtn = document.getElementById('newQuote');
  
  // ✅ Function: Show a random quote and update DOM using innerHTML
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    quoteDisplay.innerHTML = `"${quote.text}" — <em>${quote.category}</em>`;
  }
  
  // ✅ Function: Add a new quote and update the DOM
  function addQuote() {
    const textInput = document.getElementById('newQuoteText');
    const categoryInput = document.getElementById('newQuoteCategory');
  
    const newText = textInput.value.trim();
    const newCategory = categoryInput.value.trim();
  
    if (newText && newCategory) {
      quotes.push({ text: newText, category: newCategory });
      showRandomQuote(); // update display
      textInput.value = '';
      categoryInput.value = '';
    } else {
      alert("Please enter both a quote and a category.");
    }
  }
  
  // ✅ Add event listener for the "Show New Quote" button
  newQuoteBtn.addEventListener('click', showRandomQuote);
  
  // ✅ Optional: Show a quote on first load
  showRandomQuote();
  