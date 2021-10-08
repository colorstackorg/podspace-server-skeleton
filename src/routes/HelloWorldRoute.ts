import BaseRoute from '../utils/BaseRoute';
import { RouteMethod } from '../utils/constants';

type HelloWorldResult = {
  message: string;
  podmates: string[];
};

// This is just a "dummy" endpoint that we can send a GET request to, to ensure
// that our server is up and running!
export default class HelloWorldRoute extends BaseRoute<HelloWorldResult> {
  constructor() {
    super({
      method: RouteMethod.GET,
      path: '/hello'
    });
  }

  async content(): Promise<HelloWorldResult> {
    return {
      message: 'Looks like the server is up and running!',
      podmates: ['Joan B Nandaula']
    };
  }
}
