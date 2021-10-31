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
    author: { ref: Model.USER, required: true, type: ID },
    content: { required: true, type: String },
    post: { ref: Model.POST, required: true, type: ID }
  },
  { timestamps: true }
);

commentSchema.pre('save', async function () {
  if (this.isNew) {
    const post: PostDocument = await Post.findById(this.post);
    const postAuthor: UserDocument = await User.findById(post.author);

    TextService.sendText({
      message: 'One of your podmates commented on your post',
      to: postAuthor.phoneNumber
    });
  }
});

const Comment: mongoose.Model<CommentDocument> =
  mongoose.model<CommentDocument>(Model.COMMENT, commentSchema);

export default Comment;
