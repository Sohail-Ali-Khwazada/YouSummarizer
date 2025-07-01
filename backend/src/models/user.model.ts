import mongoose from "mongoose";
import { UserDocument } from "../types/custom";



const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  }
},{timestamps: true});

const User = mongoose.model<UserDocument>("User",userSchema);
export default User;