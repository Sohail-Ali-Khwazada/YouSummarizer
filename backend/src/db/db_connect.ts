import mongoose from "mongoose";
import config from "../config/config";


const connectDb = async() => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("Database connected successfully!!");

  } catch(error) {
    if (error instanceof Error) {
      console.log("Error connecting to MongoDB", error.message);
    } else {
      console.log("Unknown error connecting to MongoDB");
    }
  }
};

export default connectDb;