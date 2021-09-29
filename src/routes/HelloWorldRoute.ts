import BaseRoute from '../utils/BaseRoute';
import { RouteMethod } from '../utils/constants';

// This is just a "dummy" endpoint that we can send a GET request to, to ensure
// that our server is up and running!
export default class HelloWorldRoute extends BaseRoute<string> {
  constructor() {
    super({
      method: RouteMethod.GET,
      path: '/hello'
    });
  }

  async content(): Promise<string> {
    return 'Looks like the server is up and running!';
  }
}
