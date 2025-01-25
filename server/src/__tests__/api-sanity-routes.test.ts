import app from '../app';
import request from 'supertest';

describe('POST /api/v1/auth/signin', () => {
  it('returns userinfo', async () => {
    const payload = { email: 'duck@pond.com', password: 'quack' };
    const res = await request(app)
      .post('/api/v1/auth/signin')
      .send(payload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body.user_name).toBe('duck');
  });
});
