import mongoose, { model, Schema } from "mongoose";

interface IUser {
  email: string;
  hash: string;
  name: string;
  savedAt: string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  hash: String,
  savedAt: {
    type: String,
    default: new Date().toISOString()
  }
});
const UserModel = model<IUser>("user", userSchema);
export { UserModel as User };
