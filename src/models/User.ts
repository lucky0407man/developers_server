import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  age: number;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: false },
  email: { type: String, required: false },
  age: { type: Number, required: false },
  // other user fields...
});

export default mongoose.model<IUser>('user', UserSchema);
