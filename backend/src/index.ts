import "dotenv/config"
import express, { Request, Response } from "express";
import cors from "cors";
import connectDb from "./db/db_connect";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/",(req : Request,res : Response)=> {
  res.send("hello word");
})


app.listen(PORT,()=> {
  connectDb();
  console.log(`Server is running on port ${PORT}`);
})