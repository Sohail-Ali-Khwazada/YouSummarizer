import { application, NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import config from "../config/config";



export const getSummary = async(req: Request, res: Response, next: NextFunction): Promise<void> => {

  try {
    const { video_url } = req.body;
    // const userId = req.user?._id;
    // if(!userId) {
    //   throw new AppError("User does not have a _id",500);
    // }
    if(!video_url) {
      throw new AppError("video url is required!",400);
    }

    const flask_res = await fetch(`${config.FLASK_URI}/api/get-summary`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({video_url})
    })

    const data = await flask_res.json();

    if(data.error) {
      throw new AppError(data.error,500);
    }

    res.status(200).json(data);
  } catch(error) {
    console.log("Error in getSummary controller");
    next(error);
  }
}