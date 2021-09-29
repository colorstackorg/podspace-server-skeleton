import { body, param } from 'express-validator';

import Comment, { CommentDocument } from '../models/Comment';
import Post from '../models/Post';
import { ApplicationRequest } from '../utils/ApplicationRequest';
import BaseRoute from '../utils/BaseRoute';
import { RouteMethod } from '../utils/constants';
import MiddlewareUtils from '../utils/MiddlewareUtils';
import { IdArgs } from '../utils/types';

type CreateCommentBody = Pick<CommentDocument, 'content'>;
type CreateCommentRequest = ApplicationRequest<IdArgs, CreateCommentBody>;

export default class CreateCommentRoute extends BaseRoute<CommentDocument> {
  constructor() {
    super({
      /**
       * TODO: (18.01)
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
   *  - body.content
   */
  middleware() {
    // TODO: (18.02) Add some validation code to ensure that the content is not
    // empty.
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
   * Creates a new comment with the logged-in user as the author.
   *
   * @returns The newly created comment.
   */
  async content(req: CreateCommentRequest): Promise<CommentDocument> {
    // TODO: (18.03) Get the content from the request body and post id from the
    // request parameters.

    // TODO: (18.03) Create the comment and associated it with the logged-in
    // user.

    // TODO: (18.03) Return the newly created comment!
    return null;
  }
}
