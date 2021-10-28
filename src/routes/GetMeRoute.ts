import { UserDocument } from '../models/User';
import { ApplicationRequest } from '../utils/ApplicationRequest';
import BaseRoute from '../utils/BaseRoute';
import { RouteMethod } from '../utils/constants';
import { IdArgs } from '../utils/types';

export default class GetMeRoute extends BaseRoute<UserDocument> {
  constructor() {
    super({
      /**
       * (10.01)
       * - Should the user be authenticated to hit this route?
       * - Replace null with the correct route type from the RouteMethod enum
       * in the constants.ts file.
       * - Fill in the path string with the appropriate path to this endpoint.
       * - Delete this comment.
       */
      authenticated: true,
      method: RouteMethod.GET,
      path: '/me'
    });
  }

  /**
   * Returns the logged-in user.
   */
  async content(req: ApplicationRequest<IdArgs>): Promise<UserDocument> {
    // (10.02) Return the user object from the request!
    return req.user;
    return null;
  }
}
