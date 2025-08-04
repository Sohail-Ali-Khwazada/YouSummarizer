import mongoose from "mongoose";
import { UserDocument } from "../types/custom";


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    minlength: 6
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
  fullname: {
    type: String
  },
  email: {
    type: String
  },
  profilePic: {
    type: String
  }
},{timestamps: true});

const User = mongoose.model<UserDocument>("User",userSchema);
export default User;




