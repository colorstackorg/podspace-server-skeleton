type RouteErrorArgs = {
  message: string;

  /**
   * HTTP status code that describes the error. Should be a 400+ code, since
   * this is an error.
   *
   * @see https://httpstatuses.com/
   *
   * @example 401
   * @example 404
   * @example 500
   */
  statusCode: number;
};

export default class RouteError extends Error {
  statusCode: number;

  constructor({ message, statusCode }: RouteErrorArgs) {
    super(message);

    this.statusCode = statusCode;
    this.name = 'RouteError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RouteError);
    }
  }
}
