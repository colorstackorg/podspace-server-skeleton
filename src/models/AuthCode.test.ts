import { TEST_USER } from '../../jest.setup';
import AuthCode from './AuthCode';

/**
 * TODO: (1.05)
 * - Remove the ".skip" from the following function.
 * - Go to your terminal and run the following command:
 *        npm run test AuthCode
 * - Delete this comment.
 */
describe('Model: AuthCode', () => {
  test('Should auto generate an OTP for value.', async () => {
    // Even though we don't specify a value for the OTP code, it should
    // automatically generate.
    const { value } = await AuthCode.create({ phoneNumber: TEST_USER });
    expect(value).not.toBeNull();
    expect(value.toString()).toHaveLength(6);
  });
});
