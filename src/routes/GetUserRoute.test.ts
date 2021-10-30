import { TEST_AUTH_COOKIE } from '../../jest.setup';
import User, { UserDocument } from '../models/User';
import TestUtils from '../utils/TestUtils';

describe('GET /users/:id', () => {
  let user: UserDocument = null;

  beforeAll(async () => {
    user = await User.create({ phoneNumber: '9095250112' });
  });

  test('If the user is not authenticated, should return a 401.', async () => {
    await TestUtils.agent.get(`/users/${user._id}`).expect(401);
  });

  test('If the given user ID is not valid, should return a 400.', async () => {
    await TestUtils.agent
      .get(`/users/${TestUtils.INVALID_ID}`)
      .set('Cookie', TEST_AUTH_COOKIE)
      .expect(400);
  });

  test('If there is no user found with the given ID, should return a 404.', async () => {
    await TestUtils.agent
      .get(`/users/${TestUtils.NOT_FOUND_ID}`)
      .set('Cookie', TEST_AUTH_COOKIE)
      .expect(404);
  });

  test('If there IS a user found with the given ID, should return a 200.', async () => {
    await TestUtils.agent
      .get(`/users/${user._id}`)
      .set('Cookie', TEST_AUTH_COOKIE)
      .expect(200)
      .then(({ body }) => {
        expect(body).not.toBeNull();
        expect(body._id.toString()).toBe(user._id.toString());
        expect(body.phoneNumber).toBe(user.phoneNumber);
      });
  });
});
