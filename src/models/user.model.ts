import { Document, model, Model, Schema } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: { unique: true }
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
})

export const UserModel: Model<UserDocument> = model('User', UserSchema);

type UserDocument = IUser & Document;

export interface IUser {
  username: string;
  password: string;
  role: string;
}