const request = require('supertest');
const app = require('../app');

describe('GET /api/calendar', () => {

  it(' should throw an error if hostuserId is not provided', async () => {
    const res = await request(app)
      .get('/api/calendar')
      .expect(400);
    expect(res.body.message).toEqual('Please provide the host userId');
  });

  it('returns timeslots', async () => {
    const res = await request(app)
      .get('/api/calendar?hostUserId=hostUserId')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(Array.isArray(res.body.timeslots)).toBe(true);
  });
});