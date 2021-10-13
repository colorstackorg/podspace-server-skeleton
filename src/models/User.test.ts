import { TEST_USER } from '../../jest.setup';
import User, { UserDocument } from './User';

describe('Model: User', () => {
  test('User.renewToken() - Should update the refresh token.', async () => {
    const { _id, refreshToken } = TEST_USER;
    await TEST_USER.renewToken();

    const user: UserDocument = await User.findById(_id).select('refreshToken');

    expect(user.refreshToken).toBeDefined();
    expect(user.refreshToken).not.toBe(refreshToken);
  });
});
