/* eslint-disable prettier/prettier */
import { NextFunction, Response } from 'express';
import mongoose, { FilterQuery } from 'mongoose';

import User, { UserDocument } from '../models/User';
import { ApplicationRequest } from './ApplicationRequest';
import AuthUtils from './AuthUtils';
import { APP } from './constants';
import { AuthTokens, IdArgs } from './types';

const UNAUTHENTICATED_MESSAGE =
  'You must be authenticated to make this request.';

/**
 * Attaches the access token and refresh token as HTTP-only cookies on the
 * Express response object.
 *
 * @param res - Express response object to attach cookies to.
 * @param args.accessToken - Short-lived access token to attach as cookie.
 * @param args.accessToken - Long-lived access token to attach as cookie.
 */
const attachTokens = (
  res: Response,
  { accessToken, refreshToken }: AuthTokens
): Response => {
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 5, // This is in milliseconds...so 5 minutes.
    secure: APP.IS_PRODUCTION
  });

  // Notice that we don't set a max age here...this is what allows us to be
  // logged-in for a long period of time (in this case forever).
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: APP.IS_PRODUCTION
  });

  return res;
};

/**
 * This middleware passes (returns next()) if the user making the request
 * is authenticated. In order to be authenticated, the access token and
 * refresh token within req.cookies must be valid/non-expired.
 *
 * Otherwise, this returns 401 status code.
 */
const isAuthenticated = async (
  req: ApplicationRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  let { accessToken, refreshToken } = req.cookies ?? {};

  const isAccessTokenVerified: boolean = AuthUtils.verifyToken(accessToken);
  const isRefreshTokenVerified: boolean = AuthUtils.verifyToken(refreshToken);

  // No matter what, we must have a valid refresh token! This acts as an extra
  // layer of security (as opposed to if they only sent the access token).
  if (!isRefreshTokenVerified) {
    return res.status(401).json({ error: UNAUTHENTICATED_MESSAGE });
  }

  // At this point, the refresh token would be valid but the access token
  // would've expired...time to try to refresh!
  if (!isAccessTokenVerified) {
    // The decoded accessToken has an "id" property on it, representing the
    // user's ID.
    const userId: string = AuthUtils.decodeToken<IdArgs>(refreshToken)?.id;
    const user = await User.findById(mongoose.Types.ObjectId(userId));

    // If the user wasn't found, then they aren't authenticated...
    if (!user) {
      return res.status(401).json({ error: UNAUTHENTICATED_MESSAGE });
    }

    const {
      accessToken: updatedAccessToken,
      refreshToken: updatedRefreshToken
    } = await user.renewToken();

    accessToken = updatedAccessToken;
    refreshToken = updatedRefreshToken;

    attachTokens(res, { accessToken, refreshToken });
  }

  // The decoded accessToken has an "id" property on it, representing the
  // user's ID.
  const userId: string = AuthUtils.decodeToken<IdArgs>(accessToken)?.id;

  const user: UserDocument = await User.findById(
    mongoose.Types.ObjectId(userId)
  );

  // If the user is found, then we should attach the authenticated user to
  // the request (req.user) so we can use it on our routes.
  if (user) {
    req.user = user;
    return next();
  }

  // If the user wasn't found, then they aren't authenticated...
  return res.status(401).json({ error: UNAUTHENTICATED_MESSAGE });
};

/**
 * Returns true if the ID is a valid Mongo Object ID. Throws an error,
 * otherwise.
 *
 * This should be used in combination with express-validator, like this:
 *
 * ```ts
 * param('id')
 *   .custom(MiddlewareUtils.isMongoId)
 *   // Whatever other validations here...
 * ```
 *
 * @param id - ID to validate.
 */
const isMongoId = (id: string) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new Error(`${id} is not a valid ID.`);
  }

  return true;
};

/**
 * Returns true if there is a document found with the given filter query
 * on the model.
 *
 * This should be used in combination with express-validator. It should always
 * be used in conjuction with a .withMessage({ statusCode: 404 }) chain after
 * like this:
 *
 * ```ts
 * param('id')
 *   .custom((id) => MiddlewareUtils.isFound(User, { _id: id }))
 *   .withMessage({ message: `Couldn't find this...`, statusCode: 404 })
 *   // Whatever other validations here...
 * ```
 *
 * @param model - Mongoose model/collection to lookup.
 * @param filter - Filter query to search on the collection.
 */
async function isFound<T>(model: mongoose.Model<T>, filter: FilterQuery<T>) {
  const found: boolean = await model.exists(filter);

  if (!found) {
    // We don't need to specify an error message here, b/c we will be using
    // a .withMessage('') chain in our middleware().
    throw new Error();
  }

  return true;
}

const MiddlewareUtils = {
  attachTokens,
  isAuthenticated,
  isFound,
  isMongoId
};

export default MiddlewareUtils;
