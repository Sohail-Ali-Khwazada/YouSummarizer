import { Document } from "mongoose";

export interface UserDocument extends Document {
  username: string;
  password: string;
} 

export interface userWithoutPassword extends Document{
  username: string;
}

export interface AppError extends Error {
  status?: number;
}