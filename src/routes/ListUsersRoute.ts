import User, { UserDocument } from '../models/User';
import BaseRoute from '../utils/BaseRoute';
import { RouteMethod } from '../utils/constants';

export default class ListMembersRoute extends BaseRoute<UserDocument[]> {
  constructor() {
    super({
      /**
       * TODO: (15.01)
       * - Should the user be authenticated to hit this route?
       * - Replace null with the correct route type from the RouteMethod enum
       * in the constants.ts file.
       * - Fill in the path string with the appropriate path to this endpoint.
       * - Delete this comment.
       */
      authenticated: false,
      method: null,
      path: '/'
    });
  }

  /**
   * Returns a list of all the users in the database, sorted in
   * ascending order by their creation date.
   */
  async content(): Promise<UserDocument[]> {
    // TODO: (15.02) Find all of the users in the database and return a list of
    // them.
    return null;
  }
}
