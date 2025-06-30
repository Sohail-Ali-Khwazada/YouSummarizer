import mongoose from "mongoose";


const connectDb = async() => {
  try {
    if(!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
    await mongoose.connect(process.env.MONGO_URI);
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