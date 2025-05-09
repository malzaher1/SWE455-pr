const request = require('supertest');
const app = require('../index');

describe('Quote API Endpoints', () => {
  describe('GET /', () => {
    it('should return status 200 and welcome message', async () => {
      const response = await request(app).get('/');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Welcome to the Quote Service API');
      expect(response.body).toHaveProperty('endpoints');
      expect(response.body.endpoints).toHaveProperty('/');
      expect(response.body.endpoints).toHaveProperty('/quote');
      expect(response.body.endpoints).toHaveProperty('/quotes');
    });
  });

  
  describe('GET /quote', () => {
    it('should return a random quote with valid JSON structure', async () => {
      const response = await request(app).get('/quote');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('quote');
      expect(typeof response.body.quote).toBe('string');
      expect(response.body.quote.length).toBeGreaterThan(0);
    });

    it('should return different quotes on multiple requests', async () => {
      // Make multiple requests to increase the chance of getting different quotes
      const responses = await Promise.all([
        request(app).get('/quote'),
        request(app).get('/quote'),
        request(app).get('/quote'),
        request(app).get('/quote'),
        request(app).get('/quote')
      ]);
      
      const quotes = responses.map(res => res.body.quote);
      const uniqueQuotes = new Set(quotes);
      
      // We expect at least 2 different quotes out of 5 requests
      expect(uniqueQuotes.size).toBeGreaterThan(1);
    });
  });

  describe('GET /quotes', () => {
    it('should return an array of 5 unique random quotes', async () => {
      const response = await request(app).get('/quotes');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('quotes');
      expect(Array.isArray(response.body.quotes)).toBe(true);
      expect(response.body.quotes.length).toBe(5);
      
      // Check that all quotes are strings and non-empty
      response.body.quotes.forEach(quote => {
        expect(typeof quote).toBe('string');
        expect(quote.length).toBeGreaterThan(0);
      });
      
      // Check that all quotes are unique
      const uniqueQuotes = new Set(response.body.quotes);
      expect(uniqueQuotes.size).toBe(5);
    });

    it('should return all available quotes', async () => {
      // Make multiple requests to get all quotes
      const responses = await Promise.all([
        request(app).get('/quotes'),
        request(app).get('/quotes'),
        request(app).get('/quotes')
      ]);
      
      // Collect all unique quotes from all responses
      const allQuotes = new Set();
      responses.forEach(response => {
        response.body.quotes.forEach(quote => allQuotes.add(quote));
      });
      
      // Since we have exactly 5 quotes in our array, we should see all of them
      expect(allQuotes.size).toBe(5);
    });
  });
}); 