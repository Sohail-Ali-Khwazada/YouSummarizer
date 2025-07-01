import config from "./config/config";
import express from "express";
import cors from "cors";
import connectDb from "./db/db_connect";
import { errorHandler } from "./middlewares/errorHandler.middleware";

import authRoutes from "./routes/auth.route";
import summaryRoutes from "./routes/summary.route"

const app = express();
const PORT = config.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/api/auth",authRoutes);
app.use("/api/getSummary",summaryRoutes);

app.use(errorHandler);

app.get("/",(req,res)=> {
  res.send("hello word");
})


app.listen(PORT,()=> {
  connectDb();
  console.log(`Server is running on port ${PORT}`);
})