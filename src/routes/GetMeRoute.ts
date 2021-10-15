/* eslint-disable prettier/prettier */

import { UserDocument } from '../models/User';
import { ApplicationRequest } from '../utils/ApplicationRequest';
import BaseRoute from '../utils/BaseRoute';
import { RouteMethod } from '../utils/constants';
import { IdArgs } from '../utils/types';

export default class GetMeRoute extends BaseRoute<UserDocument> {
  constructor() {
    super({
      authenticated: true, // since it is an author they have to be authenticated
      method: RouteMethod.GET, // we are sending a GET request so we have to use the GET routeMethod
      path: '/user' // since an author is a user the path will be from a user
    });
  }

  /**
   * Returns the logged-in user.
   */
  async content(req: ApplicationRequest<IdArgs>): Promise<UserDocument> {
    // TODO: (10.02) Return the user object from the request!

    return req.user.id;
  }
}
