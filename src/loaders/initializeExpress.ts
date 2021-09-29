import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import CreateCommentRoute from '../routes/CreateCommentRoute';
import CreatePostRoute from '../routes/CreatePostRoute';
import CreateReactionRoute from '../routes/CreateReactionRoute';
import DeleteReactionRoute from '../routes/DeleteReactionRoute';
import GetMeRoute from '../routes/GetMeRoute';
import GetPostRoute from '../routes/GetPostRoute';
import GetUserRoute from '../routes/GetUserRoute';
import HelloWorldRoute from '../routes/HelloWorldRoute';
import IsAuthenticatedRoute from '../routes/IsAuthenticatedRoute';
import ListPostsRoute from '../routes/ListPostsRoute';
import ListUsersRoute from '../routes/ListUsersRoute';
import LoginRoute from '../routes/LoginRoute';
import LogoutRoute from '../routes/LogoutRoute';
import UpdateMeRoute from '../routes/UpdateMeRoute';
import VerifyCodeRoute from '../routes/VerifyCodeRoute';
import { APP } from '../utils/constants';

/**
 * Returns an Express application with all of the routes we defined, as well
 * as the global middleware configured (ie: body-parser).
 */
const initializeExpress = (): express.Application => {
  const app: express.Application = express();

  // Apply of the global middlewares.
  app.use(bodyParser.json());
  app.use(cors({ credentials: true, origin: APP.CLIENT_URL }));
  app.use(cookieParser());
  app.use(helmet()); // Sets various HTTP response headers to prevent exploits.

  // Register all of the routers.
  app.use(new CreateCommentRoute().router);
  app.use(new CreatePostRoute().router);
  app.use(new CreateReactionRoute().router);
  app.use(new DeleteReactionRoute().router);
  app.use(new GetMeRoute().router);
  app.use(new GetPostRoute().router);
  app.use(new GetUserRoute().router);
  app.use(new HelloWorldRoute().router);
  app.use(new IsAuthenticatedRoute().router);
  app.use(new LoginRoute().router);
  app.use(new LogoutRoute().router);
  app.use(new ListPostsRoute().router);
  app.use(new ListUsersRoute().router);
  app.use(new UpdateMeRoute().router);
  app.use(new VerifyCodeRoute().router);

  return app;
};

export default initializeExpress;
