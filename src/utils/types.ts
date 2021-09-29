import { Schema } from 'mongoose';

export interface BaseModel {
  /**
   * Unique identifier of the Document.
   *
   * @see https://docs.mongodb.com/manual/reference/method/ObjectId/
   */
  _id: string;

  /**
   * Timestamp when the document was created and inserted into the DB.
   */
  createdAt: string;

  /**
   * Timestamp when the document was last updated/saved.
   */
  updatedAt: string;
}

export interface IdArgs extends Record<string, string | number> {
  id: string;
}

export const ID = Schema.Types.ObjectId;

export type PaginationOptions = {
  page: string;
  limit: string;
};

export type AuthTokens = {
  /**
   * Short-lived token that grants us access to certain requests.
   */
  accessToken: string;

  /**
   * Long-lived tokens that allows us to "refresh" our access token.
   */
  refreshToken: string;
};

export type TestObject<T = unknown, S = unknown> = {
  /**
   * Input arguments/data for a test case.
   */
  input: T;

  /**
   * Expected output for a test case.
   */
  output: S;
};
