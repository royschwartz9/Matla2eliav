import mongoose, { Document, Schema } from 'mongoose';

interface IPost extends Document {
  title: string;
  content: string;
  Sender: string;
}

const postSchema: Schema = new Schema({
  title: {
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

const PostModel = mongoose.model<IPost>('Post', postSchema);

export default PostModel;