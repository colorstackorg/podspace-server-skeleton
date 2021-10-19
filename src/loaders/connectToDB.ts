import mongoose from 'mongoose';

import { APP } from '../utils/constants';

/**
 * Establishes a connection to our Mongo database.
 *
 * Note that the database name includes your squad name, so be sure to update
 * your .env files in order for the database to connect properly.
 */
const connectToDB = async (): Promise<void> => {
  await mongoose.connect(APP.DATABASE_URL, {
    dbName: APP.POD_NUMBER,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

export default connectToDB;
