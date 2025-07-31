import mongoose, { Document } from "mongoose";

export interface Config {
  PORT: number;
  NODE_ENV: string;
  MONGO_URI: string;
  FLASK_URI: string;
  ACCESS_TOKEN_SECRET: string;
}

export interface UserDocument extends Document {
  username: string;
  password: string;
}

export interface userWithoutPassword extends Document {
  username: string;
}

export interface transcript_segments {
  timestamp: string;
  text: string;
}

export interface VideoDocument extends Document {
  video_url: string;
  title: string;
  summary: string;
  transcript: transcript_segments[];
}

export interface chat extends Document {
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



export interface AppError extends Error {
  status?: number;
}