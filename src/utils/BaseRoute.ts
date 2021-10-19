import { RequestHandler, Response, Router } from 'express';
import { Result, ValidationError, validationResult } from 'express-validator';

import { ApplicationRequest } from './ApplicationRequest';
import { RouteMethod } from './constants';
import MiddlewareUtils from './MiddlewareUtils';

type BaseRouteArgs = {
  /**
   * True if this route is "protected" by authentication. Means that the user
   * will have to have a valid access/refresh token in the request.
   */
  authenticated?: boolean;

  /**
   * HTTP method to handle/listen to on the given path.
   *
   * @example DELETE
   * @example GET
   * @example PATCH
   * @example POST
   */
  method: RouteMethod;

  /**
   * Absolute path to listen to.
   *
   * @example /me
   * @example /users/:id
   * @example /posts/:id/comments
   */
  path: string;
};

export default abstract class BaseRoute<ReturnType> {
  /**
   * Returns the data that we want to send back to the client. This is the
   * "meat" for all subclasses.
   *
   * @param req Express Request object to use to generate data.
   */
  abstract content(req: ApplicationRequest, res: Response): Promise<ReturnType>;

  authenticated: boolean;

  method: RouteMethod;

  path: string;

  router: Router;

  constructor({ authenticated, method, path }: BaseRouteArgs) {
    this.authenticated = authenticated;
    this.method = method;
    this.path = path;
    this.router = Router();
    this.init();
  }

  /**
   * Middleware functions that run before the sendResponse() function should
   * be called on the route. This is the ideal place for any authentication
   * handling.
   *
   * For example, if there was some authentication that was needed for the
   * route to be handled properly, there should be the
   * [AuthUtils.isLoggedIn] defined in the middlewares.
   */
  middleware(): RequestHandler[] {
    return [];
  }

  /**
   * Initializes the Router by adding the middleware for the route, attaching
   * the appropriate method (ie: GET) to the path (ie: /users/:id) as well
   * as the handler function that sends the response for that path.
   */
  private init(): void {
    if (!this.method) return;

    // Converts "GET" to "get", etc.
    const lowerCaseMethod: string = this.method.toLowerCase();

    // Handler for route.
    const handleValidRequest = async (
      req: ApplicationRequest,
      res: Response
    ): Promise<void | Response> => {
      return this.sendResponse(req, res);
    };

    // Equivalent of saying router.get('/users', (req, res) => { ... }).
    // Also attaches each middleware function to the router.
    this.router[lowerCaseMethod](
      this.path,

      // If this route must check for authentication, then we include the
      // MiddlewareUtils.isAuthenticated middleware...
      ...(this.authenticated ? [MiddlewareUtils.isAuthenticated] : []),

      // Mount the rest of the middleware functions that specified, if any.
      ...this.middleware(),

      // If all of the middleware passes, then run the "success" case...
      handleValidRequest
    );
  }

  /**
   * Returns a response to the client with data/error, or redirects to a
   * different URL.
   *
   * If the content() function returns a RedirectObject, we redirect to the
   * specified URL. Otherwise, we return the data to the client with a 200.
   *
   * If there is an unexpected error, we return a 500 along with the error
   * message.
   */
  private async sendResponse(
    req: ApplicationRequest,
    res: Response
  ): Promise<Response | void> {
    // The first step is seeing if there are any validation errors.
    const validation: Result<ValidationError> = validationResult(req);

    // If there are validation errors, then we are done, and we simply just
    // return a 400 error with the appropriate message.
    if (!validation.isEmpty()) {
      const error: ValidationError = validation.array()[0];

      const message: string =
        typeof error.msg === 'string' ? error.msg : error.msg?.message;

      const statusCode: number =
        (error.msg?.statusCode as unknown as number) ?? 400;

      return res.status(statusCode).json({ error: message });
    }

    try {
      const data: ReturnType = await this.content(req, res);
      const statusCode: number = this.successfulStatusCode();
      return res.status(statusCode).json(data);
    } catch (e) {
      // If the error message has a "code" property on it, then use that.
      // Otherwise, it will be a 500 error.
      const statusCode: number = e?.statusCode ?? 500;

      const error: string =
        e.message ?? 'There was an issue processing your request.';

      return res.status(statusCode).json({ error });
    }
  }

  /**
   * Returns the status code for a succesful operation, depending on the method
   * that is being used.
   *
   * @see https://httpstatuses.com/
   */
  private successfulStatusCode(): number {
    switch (this.method) {
      case RouteMethod.DELETE:
        return 204;

      case RouteMethod.POST:
        return 201;

      case RouteMethod.GET:
        return 200;

      default:
        return 200;
    }
  }
}
