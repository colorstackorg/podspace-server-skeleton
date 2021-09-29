import { Request } from 'express';

import { UserDocument } from '../models/User';

export type ApplicationRequest<
  ParamsType = Record<string, unknown>,
  BodyType = Record<string, unknown>,
  QueryType = Record<string, unknown>
> = Omit<Request, 'body' | 'params'> & {
  body: BodyType;
  params: ParamsType;
  query: QueryType;

  /**
   * This is the authenticated user who is making the request, if there is
   * an authenticated user. We determine this in the
   * MiddlewareUtils.isAuthenticated() flow, where we will attach a req.user
   * if the access token and refresh token are valid.
   */
  user?: UserDocument;
};
