import { param } from 'express-validator';

import Post, { PostDocument } from '../models/Post';
import { ApplicationRequest } from '../utils/ApplicationRequest';
import BaseRoute from '../utils/BaseRoute';
import { Model, RouteMethod } from '../utils/constants';
import MiddlewareUtils from '../utils/MiddlewareUtils';
import { IdArgs } from '../utils/types';

type GetPostRequest = ApplicationRequest<IdArgs>;

export default class GetPostRoute extends BaseRoute<PostDocument> {
  constructor() {
    super({
      /**
       * TODO: (14.01)
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
   * Validate the following inputs:
   *  - params.id
   */
  middleware() {
    // TODO: (14.02) Read this validation code and try to understand what's
    // going on!
    return [
      param('id')
        .custom(MiddlewareUtils.isMongoId)
        .custom((id: string) => MiddlewareUtils.isFound(Post, { _id: id }))
        .withMessage((id: string) => ({
          message: `Could not find post with the ID: ${id}.`,
          statusCode: 404
        }))
    ];
  }

  /**
   * Returns the post with the given ID, and populates the following:
   *  - author
   *  - comments (and their respective authors)
   *  - reactions
   */
  async content(req: GetPostRequest): Promise<PostDocument> {
    // TODO: (14.03) Get the post's id from the request parameters.

    // TODO: (14.03) Get the post with this id from our database.

    // TODO: (14.03) Return the post!
    return null;
  }
}
