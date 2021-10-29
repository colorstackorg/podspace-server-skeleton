import { TEST_USER } from '../../jest.setup';
import User, { UserDocument } from './User';

/**
 * TODO: (2.04)
 * - Remove the ".skip" from the following function.
 * - Go to your terminal and run the following command:
 *        npm run test User
 * - Delete this comment.
 */
describe('Model: User', () => {
  test('User.renewToken() - Should update the refresh token.', async () => {
    const { _id, refreshToken } = TEST_USER;
    await TEST_USER.renewToken();

    const user: UserDocument = await User.findById(_id).select('refreshToken');

    expect(user.refreshToken).toBeDefined();
    expect(user.refreshToken).not.toBe(refreshToken);
  });
});
