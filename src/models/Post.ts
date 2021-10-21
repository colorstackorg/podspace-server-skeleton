import mongoose, { Document, PopulatedDoc, Schema } from 'mongoose';

import TextService from '../services/TextService';
import { Model } from '../utils/constants';
import { BaseModel, ID } from '../utils/types';
import { CommentDocument } from './Comment';
import Reaction, { ReactionDocument } from './Reaction';
import User, { UserDocument } from './User';

export enum PostType {
  HELP = 'HELP', // Asking for help...
  TIL = 'TIL', // Today I learned...
  WIN = 'WIN' // Sharing a win...
}

interface IPost extends BaseModel {
  /**
   * User that is associated with the creation of the post.
   */
  author: PopulatedDoc<UserDocument>;

  /**
   * List of comments that were created on the post.
   */
  comments: PopulatedDoc<CommentDocument>[];

  /**
   * Text content of the post.
   */
  content: string;

  /**
   * List of reactions that were created on the post.
   */
  reactions: PopulatedDoc<ReactionDocument>[];

  /**
   * Type of the post that was created. This can be null, if no PostType
   * if specified.
   */
  type: PostType;
}

export type PostDocument = Document<{}, {}, IPost> & IPost;

const postSchema: Schema<PostDocument> = new Schema<PostDocument>(
  {
    // adding fields to postSchema
    author: { ref: Model.USER, required: true, type: ID }, // author will be referencing the User model
    content: { required: true, type: String }, // the content of the post is required, it will simply be a string
    type: { required: false, type: String }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const sendNotification = async function (
  author: PopulatedDoc<UserDocument, {} & string>
) {
  /**
   * TODO: (6.04)
   * - Send a text to all the users except for the author of this post letting
   * them know that their podmate shared an update!
   */
};

postSchema.pre('save', function () {
  if (this.isNew) {
    sendNotification(this.author);
  }
});

// Creates a "virtual" property on the Post model called 'comments'. By
// default, this sorts comments by the createdAt in ascending order (AKA we
// want to see newer comments last).
postSchema.virtual('comments', {
  foreignField: 'post',
  localField: '_id',
  options: { sort: { createdAt: 1 } },
  ref: Model.COMMENT
});

// Similar to above, creates a "virtual" property called 'reactions' and we
// want to sort these in ascending order by their creation date/time.
postSchema.virtual('reactions', {
  foreignField: 'post',
  localField: '_id',
  options: { sort: { createdAt: 1 } },
  ref: Model.REACTION
});

const Post: mongoose.Model<PostDocument> = mongoose.model<PostDocument>(
  Model.POST,
  postSchema
);

export default Post;
