import mongoose, { Document, PopulatedDoc, Schema } from 'mongoose';

import { Model } from '../utils/constants';
import { BaseModel, ID } from '../utils/types';
import { PostDocument } from './Post';
import { UserDocument } from './User';

/**
 * TODO: (4.01)
 * - Read this enum.
 * - Delete this comment.
 */
export enum ReactionType {
  FIRE = 'FIRE', // 🔥
  HEART = 'HEART', // 💖
  HUNDRED = 'HUNDRED', // 💯
  LAUGH = 'LAUGH', // 😂
  SAD = 'SAD' // 😢
}

/**
 * TODO: (4.02)
 * - Read this interface.
 * - Delete this comment once you've done so.
 */
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
     * TODO: (3.03)
     * Check reaction type
     */
    post: { ref: Model.POST, required: true, type: String },
    type: { defaulf: ReactionType.HEART, required: true, type: ReactionType },
    user: { ref: Model.USER, required: true, type: ID }
  },
  { timestamps: true }
);

const Reaction: mongoose.Model<ReactionDocument> =
  mongoose.model<ReactionDocument>(Model.REACTION, reactionSchema);

export default Reaction;
