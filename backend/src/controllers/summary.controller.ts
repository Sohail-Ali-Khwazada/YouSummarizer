import { Request, Response } from "express";


export const getSummary = async(req: Request, res: Response): Promise<void> => {
  //call flask backend and get the summary
  const userId = req.user?._id;
  console.log(userId);
  
  res.send("this is your summary");
}