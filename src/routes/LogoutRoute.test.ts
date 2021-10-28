import { TEST_AUTH_COOKIE } from '../../jest.setup';
import TestUtils from '../utils/TestUtils';

describe('POST /logout', () => {
  test('If the user is not authenticated, should return a 401.', async () => {
    await TestUtils.agent.post('/logout').expect(401);
  });

  test('Should remove the tokens/cookies from the request.', async () => {
    await TestUtils.agent
      .post('/logout')
      .set('Cookie', TEST_AUTH_COOKIE)
      .expect(201)
      .then(({ body }) => {
        expect(body).toBe(true);
      });
  });
});
