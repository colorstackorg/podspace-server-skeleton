import { param } from 'express-validator';

import Post from '../models/Post';
import Reaction, { ReactionDocument } from '../models/Reaction';
import { ApplicationRequest } from '../utils/ApplicationRequest';
import BaseRoute from '../utils/BaseRoute';
import { RouteMethod } from '../utils/constants';
import MiddlewareUtils from '../utils/MiddlewareUtils';

type DeleteReactionRequest = ApplicationRequest<{
  id: string;
  reaction: string;
}>;

export default class DeleteReactionRoute extends BaseRoute<boolean> {
  constructor() {
    super({
      /**
       * TODO: (17.01)
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
   *  - params.reaction
   */
  middleware() {
    // TODO: (17.02) Read this validation code and try to understand what's
    // going on!
    return [
      param('id')
        .custom(MiddlewareUtils.isMongoId)
        .custom((id: string) => MiddlewareUtils.isFound(Post, { _id: id }))
        .withMessage((id: string) => ({
          message: `Could not find post with the ID: ${id}.`,
          statusCode: 404
        })),

      param('reaction')
        .custom(MiddlewareUtils.isMongoId)
        .custom((id: string) => MiddlewareUtils.isFound(Reaction, { _id: id }))
        .withMessage((id: string) => ({
          message: `Could not find reaction with the ID: ${id}.`,
          statusCode: 404
        }))

        // Not only does the user have to be authenticated, but they also
        // have to be "authorized"...they shouldn't be able to delete the
        // reaction if they didn't create it! We must ensure that the
        // reaction's creator is the same as the logged-in user.
        .custom(async (id: string, { req }) => {
          const reaction: ReactionDocument = await Reaction.findById(id);

          if (req.user?._id?.toString() !== reaction?.user.toString()) {
            throw new Error();
          }
        })
        .withMessage({
          message: 'You are not authorized to make this request.',
          statusCode: 401
        })
    ];
  }

  /**
   * Deletes the reaction with the given ID.
   *
   * @returns True if the operation was successful.
   */
  async content(req: DeleteReactionRequest): Promise<boolean> {
    // TODO: (17.03) Get the id of the post and the id of the reaction from the
    // request parameters.

    // TODO: (17.03) Delete the reaction!

    // TODO: (17.03) Return true.
    return false;
  }
}
