import { body } from 'express-validator';

import Post, { PostDocument, PostType } from '../models/Post';
import { ApplicationRequest } from '../utils/ApplicationRequest';
import BaseRoute from '../utils/BaseRoute';
import { RouteMethod } from '../utils/constants';
import { IdArgs } from '../utils/types';

type CreatePostBody = Pick<PostDocument, 'content' | 'type'>;
type CreatePostRequest = ApplicationRequest<IdArgs, CreatePostBody>;

export default class CreatePostRoute extends BaseRoute<PostDocument> {
  constructor() {
    super({
      /**
       * TODO: (13.01)
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
   *  - body.content
   *  - body.type
   */
  middleware() {
    return [
      // TODO: (13.02) Validate the content by ensuring it is not empty.

      body('type')
        .if((value: PostType) => !!value)
        .isIn(Object.values(PostType))
        .withMessage('You must choose a valid PostType.')
    ];
  }

  /**
   * Creates a new post with the logged-in user as the author.
   *
   * @returns The newly created post.
   */
  async content(req: CreatePostRequest): Promise<PostDocument> {
    // TODO: (13.03) Get the content and post type from the request body.

    // TODO: (13.04) Create a new post in our database with the specified author,
    // content, and post type. Then return the post!

    // TODO: (13.04) Return the post!
    return null;
  }
}
