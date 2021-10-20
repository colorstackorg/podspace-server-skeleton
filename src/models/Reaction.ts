import { ObjectID } from 'bson';
import mongoose, { Document, PopulatedDoc, Schema } from 'mongoose';

import { Model } from '../utils/constants';
import { BaseModel, ID } from '../utils/types';
import { PostDocument } from './Post';
import { UserDocument } from './User';

export enum ReactionType {
  FIRE = 'FIRE', // 🔥
  HEART = 'HEART', // 💖
  HUNDRED = 'HUNDRED', // 💯
  LAUGH = 'LAUGH', // 😂
  SAD = 'SAD' // 😢
}

interface IReaction extends BaseModel {
  /**
   * Post that was "reacted" to.
   */
  post: PopulatedDoc<PostDocument>;

  /**
   * Type of the reaction, which corresponds to an emoji, as seen above.
   *
   * @default ReactionType.HEART
   */
  type: ReactionType;

  /**
   * User that made the reaction.
   */
  user: PopulatedDoc<UserDocument>;
}

export type ReactionDocument = Document<{}, {}, IReaction> & IReaction;

const reactionSchema: Schema<ReactionDocument> = new Schema<ReactionDocument>(
  {
    /**
     *  The reactionSchema has three fields.
     *  For a post, all three fields are required.
     *  The user and post field come from other schemas.
     *  The type field is a ReactionType element for emojis, default to HEART per specs.
     */

    post: { ref: Model.POST, required: true, type: ID },
    type: { default: ReactionType.HEART, required: true, type: ReactionType },
    user: { ref: Model.USER, required: true, type: ID }
  },
  { timestamps: true }
);

const Reaction: mongoose.Model<ReactionDocument> =
  mongoose.model<ReactionDocument>(Model.REACTION, reactionSchema);

export default Reaction;
