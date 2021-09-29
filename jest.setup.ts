/* eslint-disable import/no-mutable-exports */

import mongoose from 'mongoose';

import User, { UserDocument } from './src/models/User';
import { APP } from './src/utils/constants';

let TEST_AUTH_COOKIE: string = null;
let TEST_AUTH_COOKIE_2: string = null;
let TEST_USER: UserDocument = null;
let TEST_USER_2: UserDocument = null;

beforeAll(async () => {
  await mongoose.connect(`${APP.DATABASE_URL}-test`, {
    dbName: APP.POD_NUMBER,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  TEST_USER = await User.create({ phoneNumber: '9095250111' });
  TEST_USER_2 = await User.create({ phoneNumber: '9092520111' });

  const tokens = await TEST_USER.renewToken();
  const tokens2 = await TEST_USER_2.renewToken();

  const { accessToken, refreshToken } = tokens;
  const { accessToken: accessToken2, refreshToken: refreshToken2 } = tokens2;

  TEST_AUTH_COOKIE = `accessToken=${accessToken}; refreshToken=${refreshToken}`;
  TEST_AUTH_COOKIE_2 = `accessToken=${accessToken2}; refreshToken=${refreshToken2}`;
});

afterAll(async () => {
  const collections = await mongoose.connection.db.collections();
  await Promise.all(collections.map((collection) => collection.deleteMany({})));
  await mongoose.connection.close();
});

export { TEST_AUTH_COOKIE, TEST_AUTH_COOKIE_2, TEST_USER };
