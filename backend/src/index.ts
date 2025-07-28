import config from "./config/config";
import express from "express";
import cors from "cors";
import connectDb from "./db/db_connect";
import { errorHandler } from "./middlewares/errorHandler.middleware";

import authRoutes from "./routes/auth.route";
import videoDetailsRoutes from "./routes/videoDetails.route"

const app = express();
const PORT = config.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/api/auth",authRoutes);
app.use("/api/get-video-details",videoDetailsRoutes);

app.use(errorHandler);

app.get("/",(req,res)=> {
  res.send("Welcome to Express server....");
})


app.listen(PORT,()=> {
  connectDb();
  console.log(`Server is running on port ${PORT}`);
})