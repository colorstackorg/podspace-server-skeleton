import { body, param } from 'express-validator';

import Post from '../models/Post';
import Reaction, { ReactionDocument, ReactionType } from '../models/Reaction';
import { ApplicationRequest } from '../utils/ApplicationRequest';
import BaseRoute from '../utils/BaseRoute';
import { RouteMethod } from '../utils/constants';
import MiddlewareUtils from '../utils/MiddlewareUtils';
import { IdArgs } from '../utils/types';

type CreateReactionBody = Pick<ReactionDocument, 'type'>;
type CreateReactionRequest = ApplicationRequest<IdArgs, CreateReactionBody>;

export default class CreateReactionRoute extends BaseRoute<ReactionDocument> {
  constructor() {
    super({
      /**
       * TODO: (16.01)
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
   *  - body.type
   */
  middleware() {
    // TODO: (16.02) Read this validation code and try to understand what's
    // going on!
    return [
      param('id')
        .custom(MiddlewareUtils.isMongoId)
        .custom((id: string) => MiddlewareUtils.isFound(Post, { _id: id }))
        .withMessage((id: string) => ({
          message: `Could not find post with the ID: ${id}.`,
          statusCode: 404
        })),

      body('type')
        .if((value: string) => !!value)
        .isIn(Object.values(ReactionType))
        .withMessage('You must choose a valid ReactionType.')
    ];
  }

  /**
   * Creates a new reaction on the given post by the logged-in user.
   *
   * @returns The newly created reaction.
   */
  async content(req: CreateReactionRequest): Promise<ReactionDocument> {
    // TODO: (16.03) Get the reaction type from the request body and the post
    // id from the request paramters.

    // TODO: (16.03) Create the reaction and associate it with the logged-in user.

    // TODO: (16.03) Return the reaction!
    return null;
  }
}
