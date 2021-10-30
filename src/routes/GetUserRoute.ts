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
    const { id } = req.params;

    const user: UserDocument = await User.findById(id);

    return user;
  }
}
