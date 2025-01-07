import mongoose, { Document, Schema } from 'mongoose';

interface IComment extends Document {
  postId: string;
  content: string;
  Sender: string;
}

const commentSchema: Schema = new Schema({
  postId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  Sender: {
    type: String,
    required: true,
  },
});

const commentsModel = mongoose.model<IComment>('Comment', commentSchema);

export default commentsModel;