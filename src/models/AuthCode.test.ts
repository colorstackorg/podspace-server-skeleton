import { TEST_USER } from '../../jest.setup';
import AuthCode from './AuthCode';

describe('Model: AuthCode', () => {
  test('Should auto generate an OTP for value.', async () => {
    // Even though we don't specify a value for the OTP code, it should
    // automatically generate.
    const { value } = await AuthCode.create({ phoneNumber: TEST_USER });
    expect(value).not.toBeNull();
    expect(value.toString()).toHaveLength(6);
  });

  test('Should automatically delete all documents after 5 minutes.', async () => {
    // TODO: Need to figure out how to get expanded schema index information.
    expect(true).toBe(true);
  });
});
