import { ObjectID } from 'bson';
import mongoose, { Document, PopulatedDoc, Schema } from 'mongoose';

import TextService from '../services/TextService';
import { Model } from '../utils/constants';
import { BaseModel, ID } from '../utils/types';
import Post, { PostDocument } from './Post';
import User, { UserDocument } from './User';

interface IComment extends BaseModel {
  /**
   * User that is associated with the creation of the comment.
   */
  author: PopulatedDoc<UserDocument>;

  /**
   * Text content of the comment.
   */
  content: string;

  /**
   * Post that the comment was created on.
   */
  post: PopulatedDoc<PostDocument>;
}

export type CommentDocument = Document<{}, {}, IComment> & IComment;

const commentSchema: Schema<CommentDocument> = new Schema<CommentDocument>(
  {
    /**
     *  The commentSchema has three fields.
     *  For a comment, all three fields are required.
     *  The author and post field come from other schemas.
     *  The content field is a string, default to empty since not all
     *  comments may have actual content. ex. Comment deleted
     */

    author: { ref: Model.USER, required: true, type: ID },
    content: { default: '', required: true, type: String },
    post: { ref: Model.POST, required: true, type: ID }
  },
  { timestamps: true }
);

commentSchema.pre('save', function () {
  if (this.isNew) {
    /**
     * TODO: (6.05)
     * - Send a text to the author of the post notifying them that a podmate
     * commented under it!
     */
  }
});

const Comment: mongoose.Model<CommentDocument> =
  mongoose.model<CommentDocument>(Model.COMMENT, commentSchema);

export default Comment;
