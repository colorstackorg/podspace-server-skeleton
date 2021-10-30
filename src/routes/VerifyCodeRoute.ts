import { Response } from 'express';
import { body } from 'express-validator';

import AuthCode, { AuthCodeDocument } from '../models/AuthCode';
import User, { UserDocument } from '../models/User';
import { ApplicationRequest } from '../utils/ApplicationRequest';
import BaseRoute from '../utils/BaseRoute';
import { RouteMethod } from '../utils/constants';
import MiddlewareUtils from '../utils/MiddlewareUtils';
import RouteError from '../utils/RouteError';

type VerifyCodeBody = Pick<AuthCodeDocument, 'phoneNumber'> & {
  code: number;
};

type VerifyCodeRequest = ApplicationRequest<{}, VerifyCodeBody>;

export default class VerifyCodeRoute extends BaseRoute<boolean> {
  constructor() {
    super({
      method: RouteMethod.POST,
      path: '/verify'
    });
  }

  /**
   * Validate the following inputs:
   *  - body.code
   *  - body.phoneNumber
   */
  middleware() {
    return [
      body('code')
        .isInt()
        .withMessage('Invalid input. Expected an integer')
        .isLength({ max: 6, min: 6 })
        .withMessage('The code must be a 6-digit number'),

      body('phoneNumber')
        .isMobilePhone('en-US')
        .withMessage('The phone number you inputted was not valid.')
        .custom((phoneNumber: string) => {
          return MiddlewareUtils.isFound(AuthCode, { phoneNumber });
        })
        .withMessage({
          message: 'Are you sure you received an authentication code?',
          statusCode: 404
        })
    ];
  }

  /**
   * Validates that the OTP code given matches the OTP code associated with
   * the given phone number. If the OTP code does not match, should throw a 401
   * error.
   *
   * If the code is correct, then we should generate new authentication tokens
   * for the user and store them on the response. Also, if a user didn't
   * previously exist, we should create one associated with the phone number
   * at this point.
   *
   * @throws {RouteError} - If the code does not match what is in DB.
   */
  async content(req: VerifyCodeRequest, res: Response): Promise<boolean> {
    const { code, phoneNumber } = req.body;

    const authCode: AuthCodeDocument = await AuthCode.findOne({ phoneNumber });

    if (authCode.value !== code) {
      throw new RouteError({
        message: 'Invalid code!',
        statusCode: 401
      });
    }

    let user: UserDocument = await User.findOne({ phoneNumber });

    if (!user) {
      user = await User.create({ phoneNumber });
    }

    // Renew's the user's tokens and attaches these new tokens on the
    // Express response object to send back to the client.
    const { accessToken, refreshToken } = await user.renewToken();
    MiddlewareUtils.attachTokens(res, { accessToken, refreshToken });

    await AuthCode.deleteOne({ phoneNumber });

    return true;
  }
}
