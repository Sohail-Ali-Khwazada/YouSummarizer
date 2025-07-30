import { Document } from "mongoose";


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

export interface userWithoutPassword extends Document{
  username: string;
}

export interface AppError extends Error {
  status?: number;
}