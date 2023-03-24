const request = require('supertest');

const app = require('../../server');

describe('POST /auth/login', () => {
  beforeAll(() => {
    console.log('before all');
  });
  beforeEach(() => {
    console.log('before each');
  });
  afterAll(() => {
    console.log('after all');
  });
  afterEach(() => {
    console.log('after each');
  });

  it('should return user token and status code 200', async () => {
    const testData = {
      email: 'admin@example.com',
      password: 'Pass%1234',
    };

    const response = await request(app).post('/api/v1/auth/login').send(testData);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        user: expect.any(Object),
      })
    );
  });

  it('should return unauthorized error', async () => {
    const testData = {
      email: 'admin@example.com',
      password: 'Pass&1234',
    };

    const response = await request(app).post('/api/v1/auth/login').send(testData);

    expect(response.statusCode).toBe(401);
  });
});
