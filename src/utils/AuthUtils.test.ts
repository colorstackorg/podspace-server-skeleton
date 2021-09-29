import AuthUtils from './AuthUtils';

describe('AuthUtils.generateOTP()', () => {
  test('Should always be 6 digits.', () => {
    // We run this operation 50 times, and every time the result should be of
    // length 6. We run this so many times since this function is
    // non-deterministic (returns different values for same args).
    for (let i = 0; i < 50; i += 1) {
      const code: number = AuthUtils.generateOTP();
      expect(code.toString()).toHaveLength(6);
    }
  });
});

describe('AuthUtils.signToken(), AuthUtils.verifyToken(), AuthUtils.decodeToken()', () => {
  test('If token is valid, verifyToken() should return true.', () => {
    const token: string = AuthUtils.signToken({ id: 1 });
    expect(AuthUtils.verifyToken(token)).toBe(true);
  });

  test('If token is valid, decodeToken() should return token body.', () => {
    const token: string = AuthUtils.signToken({ id: 1 });
    expect(AuthUtils.decodeToken(token)).toHaveProperty('id', 1);
  });

  test('If token is not valid, verifyToken() should return false.', () => {
    const token = 'abcdefghijklmnopqrtsuvwxyz';
    expect(AuthUtils.verifyToken(token)).toBe(false);
  });

  test('If token is not valid, decodeToken() should return null.', () => {
    const token = 'abcdefghijklmnopqrtsuvwxyz';
    expect(AuthUtils.decodeToken(token)).toBe(null);
  });

  test('If token is valid but expired, verifyToken() should return false.', async () => {
    // Expires after 1ms.
    const token: string = AuthUtils.signToken({ id: 1 }, 1);

    // This is the timestamp (in seconds) that will be used for our verification
    // check. We "artificially" set the time to be one second later from now.
    const clockTimestamp: number = Math.floor(Date.now() / 1000) + 1;

    expect(AuthUtils.verifyToken(token, { clockTimestamp })).toBe(false);
  });
});
