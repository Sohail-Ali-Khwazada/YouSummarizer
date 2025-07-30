import mongoose from "mongoose";
import { VideoDocument } from "../types/custom";


const videoSchema = new mongoose.Schema({
  video_url: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  transcript: [
    {
      timestamp: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: true
      }
    }
  ]
}, { timestamps: true });

const Video = mongoose.model<VideoDocument>("Video", videoSchema);
export default Video;
