document.addEventListener('DOMContentLoaded', function () {
    const newQuoteBtn = document.getElementById('newQuoteBtn');
    const likeBtn = document.getElementById('likeBtn');
    const likedQuotesContainer = document.getElementById('likedQuotes');
    let likedQuotes = JSON.parse(localStorage.getItem('likedQuotes')) || [];

    newQuoteBtn.addEventListener('click', fetchQuote);
    likeBtn.addEventListener('click', likeQuote);
    fetchQuote();
    
    function fetchQuote() {
        fetch("https://api.quotable.io/random")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch quote');
                }
                return response.json();
            })
            .then(data => {
                const quoteText = document.getElementById('quoteText');
                quoteText.textContent = data.content;
            })
            .catch(error => {
                console.error('Error fetching quote:', error);
                displayError();
            });
    }
    
    function displayError() {
        const quoteText = document.getElementById('quoteText');
        quoteText.textContent = 'Failed to fetch quote. Please try again later.';
    }
    
    function likeQuote() {
        const quoteText = document.getElementById('quoteText').textContent;
        if (!likedQuotes.includes(quoteText)) {
            likedQuotes.push(quoteText);
            localStorage.setItem('likedQuotes', JSON.stringify(likedQuotes));
            displayLikedQuotes();
            alert('Quote liked!');
        } else {
            alert('You have already liked this quote.');
        }
    }
    
    function deleteLikedQuotes() {
        localStorage.removeItem('likedQuotes');
        likedQuotes = [];
        displayLikedQuotes();
        alert('Liked quotes deleted.');
    }
    
    function displayLikedQuotes() {
        likedQuotesContainer.innerHTML = '';
        if (likedQuotes.length === 0) {
            likedQuotesContainer.textContent = 'No liked quotes yet.';
        } else {
            likedQuotes.forEach((quote, index) => {
                const quoteElement = document.createElement('div');
                quoteElement.classList.add('liked-quote');
                quoteElement.textContent = quote;
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.classList.add('delete-btn');
                deleteBtn.addEventListener('click', () => deleteQuote(index));
                quoteElement.appendChild(deleteBtn);
                likedQuotesContainer.appendChild(quoteElement);
            });
        }
    }

    function deleteQuote(index) {
        likedQuotes.splice(index, 1);
        localStorage.setItem('likedQuotes', JSON.stringify(likedQuotes));
        displayLikedQuotes();
    }
    
    displayLikedQuotes();
});
