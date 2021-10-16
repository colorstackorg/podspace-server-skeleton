import mongoose, { Document, Schema } from 'mongoose';

import AuthUtils from '../utils/AuthUtils';
import { Model } from '../utils/constants';
import { BaseModel } from '../utils/types';

/**
 * (1.01) TODO:
 * - Read this interface.
 * - Delete this comment once you've done so.
 */
interface IAuthCode extends BaseModel {
  /**
   * Phone number in which the OTP code is associated with.
   *
   * There should a MAXIMUM of 1 AuthCode document per phone number. For
   * example, if they submit their phone number twice at the login screen,
   * and they receive 2 text messages (and different codes), then only the
   * latter one will be associated with this phone number.
   */
  phoneNumber: string;

  /**
   * 6-digit OTP code that is generated randomly. This code is
   * automatically generated upon creation of an AuthCode document.

   */
  value: number;
}

export type AuthCodeDocument = Document<{}, {}, IAuthCode> & IAuthCode;

const authCodeSchema: Schema<AuthCodeDocument> = new Schema<AuthCodeDocument>(
  /**
   * (1.03) TODO:
   * - Create the schema for the AuthCodes that we'll save in the database.
   * - Delete this comment and the example field.
   * - Add comment(s) to explain your work.
   */
  {

    // phoneNumber: { required: true, type: String, unique: true },
    phoneNumer: {required: true, type: String, unique: true},
    // value: { default: AuthUtils.generateOTP, required: true, type: Number }
    value: { default: AuthUtils.generateOTP, required: true, type: Number }
  },
  // { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }

);

/**
 * (1.04) TODO:
 * - Add a line of code here that will elete every document in the "AuthCode"
 * collection after 5 minutes (60 seconds * 5).
 * - To be very clear, the only way you're going to figure this out is by
 * Googling around for the answer. The solution is one line.
 * - Once you find something, add the code to this document and include a link
 * to the code you found in a comment.
 * */


// pulled from ColorStack notion helpful info
authCodeSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 5 });

const AuthCode: mongoose.Model<AuthCodeDocument> =
  mongoose.model<AuthCodeDocument>(Model.AUTH_CODE, authCodeSchema);

export default AuthCode;
