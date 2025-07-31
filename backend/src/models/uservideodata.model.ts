import mongoose from "mongoose";
import { UserVideoDataDocument } from "../types/custom";

const userVideoDataSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
    required: true
  },
  notes: {
    type: String,
    default: ""
  },
  chatHistory: {
    type: [
      {
        sender: {
          type: String,
          enum: ["user", "bot"],
          required: true
        },
        message: {
          type: String,
          required: true
        },
        timestamp: {
          type: Date,
          default: Date.now
        }
      }
    ],
    default: []
  }
}, { timestamps: true });

//creating compound index and making it unqiue such that only pair exists
userVideoDataSchema.index({ user: 1, video: 1 }, { unique: true });


const UserVideoData = mongoose.model<UserVideoDataDocument>("UserVideoData", userVideoDataSchema);

export default UserVideoData;
