import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  age: number;
  avatar?: {
    data: string; // base64 encoded image
    contentType: string; // image/jpeg, image/png, etc.
  };
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: false },
  email: { type: String, required: false },
  age: { type: Number, required: false },
  avatar: {
    type: {
      data: { type: String },
      contentType: { type: String }
    },
    required: false
  },
  // other user fields...
});

export default mongoose.model<IUser>('user', UserSchema);
