import { param } from 'express-validator';

import User, { UserDocument } from '../models/User';
import { ApplicationRequest } from '../utils/ApplicationRequest';
import BaseRoute from '../utils/BaseRoute';
import { RouteMethod } from '../utils/constants';
import MiddlewareUtils from '../utils/MiddlewareUtils';
import { IdArgs } from '../utils/types';

type GetUserRequest = ApplicationRequest<IdArgs>;

export default class GetUserRoute extends BaseRoute<UserDocument> {
  constructor() {
    super({
      /**
       *  (11.01)
       * - Should the user be authenticated to hit this route?
       * - Replace null with the correct route type from the RouteMethod enum
       * in the constants.ts file.
       * - Fill in the path string with the appropriate path to this endpoint.
       * - Delete this comment.
       */
      authenticated: true,
      method: RouteMethod.GET,
      path: '/users/:id'
    });
  }

  /**
   * Validate the following inputs:
   *  - params.id
   */
  middleware() {
    // (11.02) Just read this and try your best to understand what's
    // going on here.
    return [
      param('id')
        .custom(MiddlewareUtils.isMongoId)
        .custom((id: string) => MiddlewareUtils.isFound(User, { _id: id }))
        .withMessage((id: string) => ({
          message: `Could not find user with the ID: ${id}.`,
          statusCode: 404
        }))
    ];
  }

  /**
   * Returns the user with the given ID.
   */
  async content(req: GetUserRequest): Promise<UserDocument> {
    // (11.03) Get the id of the user from the request parameters.
    const { id } = req.params;

    // (11.04) Fetch the user associated with the ID.
    const user: UserDocument = await User.findById({ _id: id });
    // (11.04) Return the user!
    return user;
  }
}
