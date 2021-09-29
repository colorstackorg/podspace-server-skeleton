import express from 'express';

import connectToDB from './loaders/connectToDB';
import initializeExpress from './loaders/initializeExpress';
import { APP } from './utils/constants';

/**
 * Entry point of our backend application, which starts the Express server
 * and establishes the database connection.
 */
const startServer = async (): Promise<void> => {
  const app: express.Application = initializeExpress();

  // Wait for the connection to be established before "starting" our Express
  // application and accepting requests.
  await connectToDB();

  app.listen(APP.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening on port ${APP.PORT}.`);
  });
};

startServer();
