const express = require('express');

const app = express();
const port = process.env.PORT || 3004;

const quotes = [
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Innovation distinguishes between a leader and a follower. - Steve Jobs",
  "Stay hungry, stay foolish. - Steve Jobs",
  "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt"
];

// Helper function to get random quotes
const getRandomQuotes = (count) => {
  const result = [];
  const quotesCopy = [...quotes];
  
  for (let i = 0; i < count && quotesCopy.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * quotesCopy.length);
    result.push(quotesCopy[randomIndex]);
    quotesCopy.splice(randomIndex, 1); // Remove the selected quote to avoid duplicates
  }
  
  return result;
};

// Root route handler
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Quote Service API',
    endpoints: {
      '/': 'API information (this response)',
      '/quote': 'Get a random quote',
      '/quotes': 'Get an array of 5 random quotes'
    }
  });
});

app.get('/quote', (req, res) => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  res.json({ quote: randomQuote });
});

app.get('/quotes', (req, res) => {
  const randomQuotes = getRandomQuotes(5);
  res.json({ quotes: randomQuotes });
});

if (require.main === module) {
  const server = app.listen(port)
    .on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use. Please try a different port or free up the port.`);
        process.exit(1);
      } else {
        console.error('An error occurred:', err);
        process.exit(1);
      }
    })
    .on('listening', () => {
      console.log(`Quote service listening at http://localhost:${port}`);
    });
}

module.exports = app; // Export for testing 