type AppEnvironment = 'development' | 'production';

export const APP = {
  /**
   * URL of the client-side application.
   *
   * @example http://localhost:3000
   * @example https://sprout.colorstack.org/team-1
   */
  CLIENT_URL: process.env.CLIENT_URL,

  /**
   * Connection string/URL for the Mongo DB.
   *
   * @example mongodb://localhost:27017
   */
  DATABASE_URL: process.env.DATABASE_URL,

  /**
   * Digital Ocean Spaces key ID that will be associated with our secret
   * access key.
   */
  DIGITAL_OCEAN_SPACES_ACCESS_KEY_ID:
    process.env.DIGITAL_OCEAN_SPACES_ACCESS_KEY_ID,

  /**
   * Digital Ocean Spaces endpoint in which our bucket will be hosted.
   *
   * @example sfo3.digitaloceanspaces.com
   * @example nyc3.digitaloceanspaces.com
   */
  DIGITAL_OCEAN_SPACES_ENDPOINT: process.env.DIGITAL_OCEAN_SPACES_ENDPOINT,

  /**
   * Digital Ocean Spaces name of the bucket we are using.
   *
   * @example colorstack-sprout
   */
  DIGITAL_OCEAN_SPACES_NAME: process.env.DIGITAL_OCEAN_SPACES_NAME,

  /**
   * Digital Ocean Spaces secret ass key that is associated with our key ID.
   * This is the extremeley sensitive piece of information here.
   */
  DIGITAL_OCEAN_SPACES_SECRET_ACCESS_KEY:
    process.env.DIGITAL_OCEAN_SPACES_SECRET_ACCESS_KEY,

  /**
   * Environment that the application is running in.
   *
   * @example development
   * @example production
   */
  ENVIRONMENT: process.env.APP_ENV as AppEnvironment,

  /**
   * True if the application's environment is production.
   */
  IS_PRODUCTION: process.env.APP_ENV === 'production',

  /**
   * String that is used to "encode" our JWT tokens. This is typically some
   * random string with unique characters.
   *
   * @example T9XPoscx5WAGK50jwvsjfAn4QB6sg5zN
   */
  JWT_SECRET: process.env.JWT_SECRET,

  POD_NUMBER: process.env.POD_NUMBER,

  /**
   * Port on our computers that the backend application is running on.
   */
  PORT: 8080,

  /**
   * Iteration of the Sprout fellowship.
   *
   * @example fa-2021
   * @example wi-2021
   * @example fa-2022
   */
  SPROUT_ITERATION: process.env.SPROUT_ITERATION,

  /**
   * ID of the Twilio account that we are using to send text messages.
   */
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,

  /**
   * Authentication token associated with our Twilio account.
   */
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,

  /**
   * Phone number associated with our Twilio account that our text messages
   * will be sent from.
   */
  TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER
};

export enum Model {
  AUTH_CODE = 'AuthCode',
  COMMENT = 'Comment',
  POST = 'Post',
  REACTION = 'Reaction',
  USER = 'User'
}

export enum RouteMethod {
  DELETE = 'DELETE',
  GET = 'GET',
  PATCH = 'PATCH',
  PUT = 'PUT',
  POST = 'POST'
}
