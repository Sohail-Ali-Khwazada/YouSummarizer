import mongoose, { Document } from "mongoose";

export interface Config {
  PORT: number;
  NODE_ENV: string;
  MONGO_URI: string;
  FLASK_URI: string;
  ACCESS_TOKEN_SECRET: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
}
export interface UserDocument extends Document {
  username?: string;
  password?: string;
  googleId?: string;
  fullname?: string;
  email?: string;
  profilePic?: string;
}


export interface transcript_segments {
  timestamp: string;
  text: string;
}
export interface chapter_segments {
  title: string;
  startTime: string;
  description: string;
}

export interface VideoDocument extends Document {
  video_url: string;
  title: string;
  summary: string;
  transcript: transcript_segments[];
  chapter: chapter_segments[];
}

export interface chat {
  sender: "user" | "bot";
  message: string;
  timestamp: Date;
}
export interface UserVideoDataDocument extends Document {
  user: mongoose.Schema.Types.ObjectId;
  video: mongoose.Schema.Types.ObjectId;
  notes: string;
  chatHistory: chat[];
}

export interface VideoResponse {
  video_url: string;
  title: string;
  summary: string;
  transcript: transcript_segments[];
  chapter: chapter_segments[];
  notes: string;
  chatHistory: chat[];
}
export interface AppError extends Error {
  status?: number;
}