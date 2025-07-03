// Default quotes if local storage is empty
let quotes = [
    { id: '1', text: "The only way to do great work is to love what you do.", category: "Inspiration" },
    { id: '2', text: "Innovation distinguishes between a leader and a follower.", category: "Innovation" },
    { id: '3', text: "Your time is limited, don't waste it living someone else's life.", category: "Life" },
    { id: '4', text: "Strive not to be a success, but rather to be of value.", category: "Motivation" },
    { id: '5', text: "The future belongs to those who believe in the beauty of their dreams.", category: "Dreams" }
];

// Simulate server-side quotes (initially same as local for simplicity)
let serverQuotes = JSON.parse(JSON.stringify(quotes)); // Deep copy

// DOM Elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');
const addQuoteFormBtn = document.getElementById('addQuoteFormBtn');
const addQuoteForm = document.getElementById('addQuoteForm');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');
const exportQuotesBtn = document.getElementById('exportQuotesBtn');
const categoryFilter = document.getElementById('categoryFilter');
const filteredQuoteDisplay = document.getElementById('filteredQuoteDisplay');
const syncStatusDiv = document.getElementById('syncStatus');
const syncNowBtn = document.getElementById('syncNowBtn');
const customMessageBox = document.getElementById('customMessageBox');
const messageBoxText = document.getElementById('messageBoxText');

// Function to show custom message box
function showMessageBox(message, type = 'error') {
    messageBoxText.textContent = message;
    if (type === 'success') {
        customMessageBox.style.backgroundColor = '#2ecc71'; // Green for success
    } else {
        customMessageBox.style.backgroundColor = '#e74c3c'; // Red for error
    }
    customMessageBox.classList.add('show');
}

// Function to hide custom message box
function hideMessageBox() {
    customMessageBox.classList.remove('show');
}

// Save quotes to local storage
function saveQuotes() {
    try {
        localStorage.setItem('quotes', JSON.stringify(quotes));
    } catch (e) {
        console.error("Error saving to local storage:", e);
        showMessageBox("Error saving quotes locally. Storage might be full.");
    }
}

// Load quotes from local storage
function loadQuotes() {
    try {
        const storedQuotes = localStorage.getItem('quotes');
        if (storedQuotes) {
            quotes = JSON.parse(storedQuotes);
        } else {
            // If no quotes in local storage, save the default ones
            saveQuotes();
        }
    } catch (e) {
        console.error("Error loading from local storage:", e);
        showMessageBox("Error loading quotes from local storage. Data might be corrupted.");
        // Fallback to default quotes if loading fails
        quotes = [
            { id: '1', text: "The only way to do great work is to love what you do.", category: "Inspiration" },
            { id: '2', text: "Innovation distinguishes between a leader and a follower.", category: "Innovation" },
            { id: '3', text: "Your time is limited, don't waste it living someone else's life.", category: "Life" },
            { id: '4', text: "Strive not to be a success, but rather to be of value.", category: "Motivation" },
            { id: '5', text: "The future belongs to those who believe in the beauty of their dreams.", category: "Dreams" }
        ];
        saveQuotes(); // Save defaults
    }
}

// Display a random quote
function showRandomQuote() {
    if (quotes.length === 0) {
        quoteDisplay.innerHTML = '<p class="text-xl italic text-gray-500">No quotes available. Add some!</p>';
        sessionStorage.removeItem('lastViewedQuote');
        return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `
        <p class="text-xl italic text-blue-700 mb-2">"${randomQuote.text}"</p>
        <p class="text-lg font-semibold text-blue-600">- ${randomQuote.category}</p>
    `;
    // Store last viewed quote in session storage
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote));
}

// Toggle visibility of the add quote form
function toggleAddQuoteForm() {
    addQuoteForm.classList.toggle('hidden');
}

// Add a new quote
function addQuote() {
    const text = newQuoteText.value.trim();
    const category = newQuoteCategory.value.trim();

    if (text && category) {
        const newQuote = {
            id: crypto.randomUUID(), // Generate a unique ID for the new quote
            text: text,
            category: category
        };
        quotes.push(newQuote);
        saveQuotes(); // Save to local storage
        populateCategories(); // Update categories dropdown
        filterQuotes(); // Re-filter and display quotes
        newQuoteText.value = '';
        newQuoteCategory.value = '';
        showMessageBox("Quote added successfully!", 'success');
        // Optionally hide the form after adding
        addQuoteForm.classList.add('hidden');
    } else {
        showMessageBox("Please enter both quote text and category.");
    }
}

// Populate categories dropdown
function populateCategories() {
    const categories = ['all', ...new Set(quotes.map(q => q.category))];
    categoryFilter.innerHTML = ''; // Clear existing options
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat === 'all' ? 'All Categories' : cat;
        categoryFilter.appendChild(option);
    });

    // Restore last selected filter
    const lastFilter = localStorage.getItem('lastCategoryFilter');
    if (lastFilter && categories.includes(lastFilter)) {
        categoryFilter.value = lastFilter;
    } else {
        categoryFilter.value = 'all';
    }
}

// Filter and display quotes
function filterQuotes() {
    const selectedCategory = categoryFilter.value;
    localStorage.setItem('lastCategoryFilter', selectedCategory); // Save selected filter

    filteredQuoteDisplay.innerHTML = ''; // Clear previous filtered quotes

    const filtered = selectedCategory === 'all'
        ? quotes
        : quotes.filter(q => q.category === selectedCategory);

    if (filtered.length === 0) {
        filteredQuoteDisplay.innerHTML = '<p class="text-center text-gray-500 col-span-full">No quotes found for this category.</p>';
        return;
    }

    filtered.forEach(quote => {
        const quoteCard = document.createElement('div');
        quoteCard.className = 'quote-card';
        quoteCard.innerHTML = `
            <p class="quote-text">"${quote.text}"</p>
            <p class="quote-category">- ${quote.category}</p>
        `;
        filteredQuoteDisplay.appendChild(quoteCard);
    });
}

// Export quotes to JSON file
function exportToJson() {
    try {
        const dataStr = JSON.stringify(quotes, null, 2); // Pretty print JSON
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'quotes.json';
        document.body.appendChild(a); // Required for Firefox
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url); // Clean up
        showMessageBox("Quotes exported successfully!", 'success');
    } catch (e) {
        console.error("Error exporting quotes:", e);
        showMessageBox("Failed to export quotes. Please try again.");
    }
}

// Import quotes from JSON file
function importFromJsonFile(event) {
    const file = event.target.files[0];
    if (!file) {
        return;
    }
    const fileReader = new FileReader();
    fileReader.onload = function(e) {
        try {
            const importedQuotes = JSON.parse(e.target.result);
            // Basic validation for imported data structure
            if (!Array.isArray(importedQuotes) || !importedQuotes.every(q => q.text && q.category)) {
                showMessageBox("Invalid JSON file format. Expected an array of quote objects with 'text' and 'category'.");
                return;
            }
            // Add new unique IDs to imported quotes if they don't have one
            const newQuotesWithIds = importedQuotes.map(q => ({
                ...q,
                id: q.id || crypto.randomUUID()
            }));

            // Merge imported quotes, avoiding duplicates by ID
            const existingQuoteIds = new Set(quotes.map(q => q.id));
            const uniqueNewQuotes = newQuotesWithIds.filter(q => !existingQuoteIds.has(q.id));

            quotes.push(...uniqueNewQuotes);
            saveQuotes();
            populateCategories();
            filterQuotes();
            showMessageBox("Quotes imported successfully!", 'success');
        } catch (error) {
            console.error("Error parsing JSON file:", error);
            showMessageBox("Error importing quotes. Invalid JSON file.");
        }
    };
    fileReader.readAsText(file);
    event.target.value = ''; // Clear the input so the same file can be selected again
}

// Simulate fetching quotes from a server
async function fetchQuotesFromServer() {
    // In a real application, this would be a fetch call to an API endpoint
    // Example: const response = await fetch('/api/quotes');
    // const data = await response.json();
    // return data;

    // Simulate network delay
    await new Promise(resolve => setTimeout(Math.random() * 1000 + 500, resolve));
    return JSON.parse(JSON.stringify(serverQuotes)); // Return a deep copy
}

// Simulate posting quotes to a server
async function postQuotesToServer(data) {
    // In a real application, this would be a fetch call to an API endpoint
    // Example: const response = await fetch('/api/quotes', { method: 'POST', body: JSON.stringify(data) });
    // const result = await response.json();
    // return result;

    // Simulate network delay
    await new Promise(resolve => setTimeout(Math.random() * 1000 + 500, resolve));
    serverQuotes = JSON.parse(JSON.stringify(data)); // Update the simulated server data
    return { success: true, message: "Server updated" };
}

// Data Syncing Logic
async function syncData() {
    syncStatusDiv.textContent = 'Sync status: Syncing...';
    syncStatusDiv.style.backgroundColor = '#f39c12'; // Orange for syncing
    syncStatusDiv.style.color = 'white';

    try {
        const serverData = await fetchQuotesFromServer();
        let conflictsResolved = false;
        let newQuotesAdded = 0;
        let quotesUpdated = 0;

        // Create maps for easier lookup
        const localMap = new Map(quotes.map(q => [q.id, q]));
        const serverMap = new Map(serverData.map(q => [q.id, q]));

        const mergedQuotes = [];
        const quotesToPushToServer = []; // Quotes that are new locally and need to be pushed

        // Process server data (server takes precedence)
        for (const [id, serverQuote] of serverMap.entries()) {
            if (localMap.has(id)) {
                const localQuote = localMap.get(id);
                // Simple conflict resolution: server data takes precedence
                if (JSON.stringify(localQuote) !== JSON.stringify(serverQuote)) {
                    mergedQuotes.push(serverQuote); // Use server version
                    quotesUpdated++;
                    conflictsResolved = true;
                } else {
                    mergedQuotes.push(localQuote); // No conflict, use local (same as server)
                }
            } else {
                mergedQuotes.push(serverQuote); // New quote from server
                newQuotesAdded++;
                conflictsResolved = true;
            }
        }

        // Process local data (add any local-only new quotes to merged and mark for push)
        for (const [id, localQuote] of localMap.entries()) {
            if (!serverMap.has(id)) {
                mergedQuotes.push(localQuote); // Local-only quote, add to merged
                quotesToPushToServer.push(localQuote); // Mark for pushing to server
            }
        }

        // Update local quotes array
        quotes = mergedQuotes;
        saveQuotes(); // Save merged data to local storage

        // Push new local quotes to server
        if (quotesToPushToServer.length > 0) {
            // In a real app, you might send only the new/updated ones.
            // For this simulation, we'll send the entire merged set to keep server and client in sync.
            await postQuotesToServer(quotes);
            conflictsResolved = true; // Indicate server was updated
        }

        let statusMessage = 'Sync status: Data synced successfully.';
        if (conflictsResolved) {
            statusMessage += ` (Conflicts resolved: ${quotesUpdated} updated, ${newQuotesAdded} new from server. ${quotesToPushToServer.length} new local quotes pushed.)`;
            syncStatusDiv.style.backgroundColor = '#2ecc71'; // Green for success with changes
        } else {
            syncStatusDiv.style.backgroundColor = '#3498db'; // Blue for no changes
        }
        syncStatusDiv.textContent = statusMessage;

        // Refresh UI after sync
        populateCategories();
        filterQuotes();
        showRandomQuote(); // Update the main display
    } catch (error) {
        console.error("Sync error:", error);
        syncStatusDiv.textContent = 'Sync status: Sync failed. Check console for details.';
        syncStatusDiv.style.backgroundColor = '#e74c3c'; // Red for error
        syncStatusDiv.style.color = 'white';
        showMessageBox("Data synchronization failed. Please try again.", 'error');
    } finally {
        // Reset status background after a short delay
        setTimeout(() => {
            syncStatusDiv.style.backgroundColor = '#e0e0e0';
            syncStatusDiv.style.color = '#333';
        }, 3000);
    }
}

// Event Listeners
newQuoteBtn.addEventListener('click', showRandomQuote);
addQuoteFormBtn.addEventListener('click', toggleAddQuoteForm);
exportQuotesBtn.addEventListener('click', exportToJson);
syncNowBtn.addEventListener('click', syncData);

// Initial setup on page load
window.onload = () => {
    loadQuotes();
    populateCategories();
    filterQuotes(); // Display filtered quotes on load
    showRandomQuote(); // Display a random quote initially

    // Restore last viewed quote from session storage
    const lastViewed = sessionStorage.getItem('lastViewedQuote');
    if (lastViewed) {
        try {
            const quoteObj = JSON.parse(lastViewed);
            quoteDisplay.innerHTML = `
                <p class="text-xl italic text-blue-700 mb-2">"${quoteObj.text}"</p>
                <p class="text-lg font-semibold text-blue-600">- ${quoteObj.category}</p>
            `;
        } catch (e) {
            console.error("Error parsing last viewed quote from session storage:", e);
            sessionStorage.removeItem('lastViewedQuote'); // Clear invalid data
        }
    }

    // Start periodic sync (e.g., every 30 seconds)
    setInterval(syncData, 30000);
};