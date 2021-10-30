import jwt, { SignOptions } from 'jsonwebtoken';

import { APP } from './constants';

/**
 * Returns a random 6 digit number used for OTP logins. The minimum value that
 * the first digit could be is 1, so this will never return a number with
 * all 0's.
 */
const generateOTP = (): number => {
  // Generate a number between 0 and 1.
  const randomFraction: number = Math.random();

  // Multiply that number by 900000
  const sixDigit: number = randomFraction * 900000;

  // Get rid of decimal
  const sixDigitNumber: number = Math.floor(sixDigit);

  // return 6-digit number
  return sixDigitNumber + 100000;
};

/**
 * Returns the signed JWT token using the stored JWT secret and expiration.
 *
 * @param payload - Payload to encode in the token. Must be an object.
 * @param expiresIn - In milliseconds. If empty, this will not expire.
 */
function signToken<T extends Record<string, unknown>>(
  payload: T,
  expiresIn?: SignOptions['expiresIn']
): string {
  return jwt.sign(payload, APP.JWT_SECRET, expiresIn ? { expiresIn } : {});
}

/**
 * Returns true if the token is both a valid JWT token and if it has not yet
 * expired. Returns false otherwise.
 */
const verifyToken = (token: string, options?: jwt.VerifyOptions): boolean => {
  try {
    return !!jwt.verify(token, APP.JWT_SECRET, options);
  } catch {
    return false;
  }
};

/**
 * Returns the decoded information stored inside the JWT token. We first
 * verify the token to ensure that it is not expired, then decode it.
 *
 * If the token isn't valid, return null.
 *
 * @example
 * const token = signToken({ id: 1 });
 * decodeToken(token) // Returns { id: 1 }.
 */
function decodeToken<T extends Record<string, unknown>>(token: string): T {
  // If the token isn't verfied, return null!
  if (!verifyToken(token)) {
    return null;
  }

  return jwt.decode(token) as T;
}

const AuthUtils = {
  decodeToken,
  generateOTP,
  signToken,
  verifyToken
};

export default AuthUtils;
