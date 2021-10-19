import Post, { PostDocument } from '../models/Post';
import { ApplicationRequest } from '../utils/ApplicationRequest';
import BaseRoute from '../utils/BaseRoute';
import { Model, RouteMethod } from '../utils/constants';
import { PaginationOptions } from '../utils/types';

type ListPostsRequest = ApplicationRequest<{}, {}, PaginationOptions>;

export default class ListPostsRoute extends BaseRoute<PostDocument[]> {
  constructor() {
    super({
      /**
       * TODO: (15.03)
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
   * Returns a list of all the posts, with the following populations:
   *  - author
   *  - comments
   *  - reactions
   *
   * These posts should be sorted in descending order by their creation date
   * (newer posts show up first).
   *
   * This query should also support pagination, so you will have to use the
   * .limit() and .skip() methods to fetch the appropriate documents.
   */
  async content(req: ListPostsRequest): Promise<PostDocument[]> {
    // TODO: (15.04) Get the page and limit from the queries of the request.

    // TODO: (15.04) Format the limit and page as numbers.

    // TODO: (15.04) Find all of the posts within the range that we're looking
    // for.

    // TODO: (15.04) Return the list of posts by replacing the empty list below!
    return [];
  }
}
