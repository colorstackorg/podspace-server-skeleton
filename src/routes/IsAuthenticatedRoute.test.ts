import { TEST_AUTH_COOKIE } from '../../jest.setup';
import TestUtils from '../utils/TestUtils';

/**
 * (10.07)
 * - Remove the ".skip" from the following function.
 * - Go to your terminal and run the following command:
 *        npm run test IsAuthenticated
 * - Delete this comment.
 */
describe('GET /authenticated', () => {
  test('If the user IS NOT authenticated, should return a 200 with false.', async () => {
    await TestUtils.agent
      .get('/authenticated')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBe(false);
      });
  });

  test('If the user IS authenticated, should return a 200 with true.', async () => {
    await TestUtils.agent
      .get('/authenticated')
      .set('Cookie', TEST_AUTH_COOKIE)
      .expect(200)
      .then(({ body }) => {
        expect(body).toBe(true);
      });
  });
});
