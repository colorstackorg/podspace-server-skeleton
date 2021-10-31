import { body } from 'express-validator';

import AuthCode, { AuthCodeDocument } from '../models/AuthCode';
import { UserDocument } from '../models/User';
import TextService from '../services/TextService';
import { ApplicationRequest } from '../utils/ApplicationRequest';
import BaseRoute from '../utils/BaseRoute';
import { RouteMethod } from '../utils/constants';
import RouteError from '../utils/RouteError';

type LoginBody = Pick<UserDocument, 'phoneNumber'>;

export default class LoginRoute extends BaseRoute<boolean> {
  constructor() {
    super({
      method: RouteMethod.POST,
      path: '/login'
    });
  }

  middleware() {
    /**
     * TODO: (7.02)
     * - Add a validation the returned array ensureing that the phoneNumber
     * field in the body is a valid US phone number.
     */
    return [
      body('phoneNumber')
        .isMobilePhone('en-US')
        .withMessage('This is not a valid phone number')
    ];
  }

  /**
   * Creates an AuthCode in the DB, and sends a text to the given phone number
   * with the OTP code.
   *
   * If the text was not sent successfully, should throw 500 error.
   *
   * @throws {RouteError} - If there was an issue sending the text message.
   * @returns True if text was sent successfully.
   */
  async content(req: ApplicationRequest<{}, LoginBody>): Promise<boolean> {
    /**
     * TODO: (7.03)
     * - Get the phone number from the request body.
     * - Delete any previously existing codes for this phone number.
     * - Create a new code.
     * - Send a text to the user with the code.
     */
    // TODO: (7.03) Get the phone number from the request body.
    const { phoneNumber } = req.body;

    // TODO: (7.03) We should delete all codes that  previously existed for the
    // user.
    await AuthCode.deleteMany({ phoneNumber });

    // TODO: (7.03) Create a new AuthCode document in the database.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const authCode: AuthCodeDocument = await AuthCode.create({ phoneNumber });

    // TODO: (7.03) Send a text to the user.
    const wasTextSent: boolean = await TextService.sendText({
      message: 'Your OTP code: $(authCode.value)',
      to: phoneNumber
    });

    // TODO: (7.03) If the text was not sent, throw a new RouteError with status
    // code 500.
    if (!wasTextSent) {
      throw new RouteError({
        message: 'Failed to send OTP code text, please try again',
        statusCode: 500
      });
    }

    return true;
  }
}
