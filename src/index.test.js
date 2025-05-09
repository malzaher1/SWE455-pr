const request = require('supertest');
const app = require('./index');

describe('Quote Service', () => {
  it('should return a random quote', async () => {
    const response = await request(app).get('/quote');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('quote');
    expect(typeof response.body.quote).toBe('string');
    expect(response.body.quote.length).toBeGreaterThan(0);
  });
}); 