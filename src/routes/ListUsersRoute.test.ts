import { TEST_AUTH_COOKIE } from '../../jest.setup';
import User from '../models/User';
import TestUtils from '../utils/TestUtils';

/**
 * TODO: (15.05)
 * - Remove the ".skip" from the following function.
 * - Go to your terminal and run the following command:
 *        npm run test ListUsers
 * - Delete this comment.
 */
describe.skip('GET /users', () => {
  beforeAll(async () => {
    await Promise.all([
      User.create({ phoneNumber: '9095250112' }),
      User.create({ phoneNumber: '9095250113' })
    ]);

    await Promise.all([
      User.create({ phoneNumber: '9095250114' }),
      User.create({ phoneNumber: '9095250115' })
    ]);
  });

  test('If the user is not authenticated, should return a 401.', async () => {
    await TestUtils.agent.get('/users').expect(401);
  });

  test('Should return a 200 and array sorted in DESC by createdAt.', async () => {
    await TestUtils.agent
      .get('/users')
      .set('Cookie', TEST_AUTH_COOKIE)
      .expect(200)
      .then(({ body }) => {
        const sortedMembers = [...body].sort((a, b) => {
          if (a.createdAt < b.createdAt) return -1;
          if (a.createdAt > b.createdAt) return 1;
          return 0;
        });

        expect(body).toHaveLength(6);
        expect(body).toEqual(sortedMembers);
      });
  });
});
