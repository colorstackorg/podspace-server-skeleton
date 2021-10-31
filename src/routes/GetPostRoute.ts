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
      authenticated: true,
      method: RouteMethod.GET,
      path: '/posts/:id'
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
    const { id } = req.params;

    const post: PostDocument = await Post.findById(id);

    return post;
  }
}
