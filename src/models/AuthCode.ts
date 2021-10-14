import mongoose, { Document, Schema } from 'mongoose';

import AuthUtils from '../utils/AuthUtils';
import { Model } from '../utils/constants';
import { BaseModel } from '../utils/types';

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

/**
 * One OTP auth code shouldn't be sent to multiple phone numbers, so each OTP code should have a unique phoneNumber destination.
 * When a new OTP auth code is created, we want to use our generateOTP utility to keep track of the value of the code in our database.
 */
const authCodeSchema: Schema<AuthCodeDocument> = new Schema<AuthCodeDocument>(
  {
    phoneNumber: { required: true, type: String, unique: true },
    value: { default: AuthUtils.generateOTP, required: true, type: Number }
  },
  { timestamps: true }
);

authCodeSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });
const AuthCode: mongoose.Model<AuthCodeDocument> =
  mongoose.model<AuthCodeDocument>(Model.AUTH_CODE, authCodeSchema);

export default AuthCode;
