import { Schema, model, Document } from "mongoose";

export type UserType = {
  _id?: string;
  name: string;
  username: string;
  password: string;
}

interface UserInterface extends Document {
  name: string;
  username: string;
  password: string;
}

const UserSchema = new Schema(
  {
    name: { type: String, required: true},
    username: { type: String, required: true, index: { unique: true }},
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default model<UserInterface>("User", UserSchema);
