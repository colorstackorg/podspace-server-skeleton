import mongoose, { Document, Schema } from 'mongoose';

import ImageService from '../services/ImageService';
import AuthUtils from '../utils/AuthUtils';
import { Model } from '../utils/constants';
import { AuthTokens, BaseModel } from '../utils/types';

interface IUser extends BaseModel {
  email?: string;

  /**
   * First name of the user. This is optional b/c when we first create a user,
   * this is not required.
   */
  firstName?: string;

  /**
   * URL of the user's Instagram profile, if any.
   */
  instagramUrl?: string;

  /**
   * Last name of the user. This is optional b/c when we first create a user,
   * this is not required.
   */
  lastName?: string;

  /**
   * URL of the user's LinkedIn profile, if any.
   */
  linkedInUrl?: string;

  phoneNumber: string;

  /**
   * Key of the object in the Digital Ocean Spaces bucket that hosts the
   * user's profile picture.
   */
  profilePictureKey?: string;

  /**
   * URL where the user's profile picture is hosted. This will most likely
   * be a DigitalOcean URL.
   */
  profilePictureUrl?: string;

  /**
   * Unique JWT token that allows a user to refresh their authentication status
   * in a request flow.
   */
  refreshToken?: string;

  /**
   * URL of the user's Twitter profile, if any.
   */
  twitterUrl?: string;
}

export type UserDocument = Document<{}, {}, IUser> &
  IUser & {
    renewToken: () => Promise<AuthTokens>;
  };

const userSchema: Schema<UserDocument> = new Schema<UserDocument>(
  {
    email: { required: false, sparse: true, type: String, unique: true },
    firstName: { required: false, type: String },
    instagramUrl: { required: false, type: String },
    lastName: { required: false, type: String },
    linkedInUrl: { required: false, type: String },
    phoneNumber: { required: true, type: String, unique: true },
    profilePictureKey: { required: false, type: String },
    // We shouldn't be returning the refreshToken when fetching a user from
    // the database, since that is sensitive information.
    refreshToken: { required: false, select: false, type: String },

    twitterUrl: { required: false, type: String }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

type TokenArgs = {
  date: number;
  id: string;
};

/*
 * Creates and returns a new access and refresh token for the user. It also
 * persists the refresh token to the database, so we can associate the token
 * and lookup a user by their refresh token in our authentication flows.
 */
userSchema.methods.renewToken = async function (): Promise<AuthTokens> {
  const accessToken: string = AuthUtils.signToken<TokenArgs>(
    { date: Date.now(), id: this._id },
    60 * 60 // Expires in 1 hour.
  );

  const refreshToken: string = AuthUtils.signToken<TokenArgs>(
    { date: Date.now(), id: this._id },
    60 * 60 * 24 * 100 // Expires in 100 days.
  );

  this.refreshToken = refreshToken;
  await this.save();

  return {
    accessToken,
    refreshToken
  };
};

/**
 * Returns the full URL to the profile picture of the user, which is
 * constructed by the key which is stored on record.
 *
 * If there is no profile picture key, returns null.
 */
userSchema.virtual('profilePictureUrl').get(function () {
  return this.profilePictureKey
    ? ImageService.getImageUrl(this.profilePictureKey)
    : null;
});

const User: mongoose.Model<UserDocument> = mongoose.model<UserDocument>(
  Model.USER,
  userSchema
);

export default User;
