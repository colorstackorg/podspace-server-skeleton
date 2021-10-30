import { Response } from 'express';

import { ApplicationRequest } from '../utils/ApplicationRequest';
import BaseRoute from '../utils/BaseRoute';
import { RouteMethod } from '../utils/constants';

export default class LogoutRoute extends BaseRoute<boolean> {
  constructor() {
    super({
      authenticated: true,
      method: RouteMethod.POST,
      path: '/logout'
    });
  }

  /**
   * Should clear the access token and refresh token on the response, which
   * will effectively "logout" the user, since they will no longer have the
   * tokens (which they need to be authenticated).
   *
   * Returns true in all cases.
   */
  async content(_: ApplicationRequest, res: Response): Promise<boolean> {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    return true;
  }
}
