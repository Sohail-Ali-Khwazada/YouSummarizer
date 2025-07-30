import mongoose from "mongoose";
import { UserDocument } from "../types/custom";



const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
},{timestamps: true});

const User = mongoose.model<UserDocument>("User",userSchema);
export default User;