import express from 'express';
import request from 'supertest';

import initializeExpress from '../loaders/initializeExpress';

// Supertest agent that will be used for every route based test! This
// effectively "starts the server" whenever we use the agent to test
// requests.
const app: express.Application = initializeExpress();
const agent = request.agent(app);

// Mimics an invalid Mongo ID.
const INVALID_ID = '12345';

// Mimics an ID that is not found for all collections/models.
const NOT_FOUND_ID = '611823501c6aeeb0a11db385';

const TestUtils = {
  INVALID_ID,
  NOT_FOUND_ID,
  agent
};

export default TestUtils;
