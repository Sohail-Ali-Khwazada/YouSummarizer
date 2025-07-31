import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import config from "../config/config";
import Video from "../models/video.model";
import UserVideoData from "../models/uservideodata.model";
import { VideoDocument, UserVideoDataDocument } from "../types/custom";

export const getAllVideos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?._id;
    if(!userId) {
      throw new AppError("User does not have a _id", 500);
    }
    const videos: UserVideoDataDocument[] = await UserVideoData.find({user: userId}).populate('video');
    res.status(200).json(videos);
  } catch(error) {
    console.log("Error in getAllVideos controller");
    next(error);
  }

}

export const getVideo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  try {
    const userId = req.user?._id;
    const { video_url } = req.body;
    if (!userId) {
      throw new AppError("User does not have a _id", 500);
    }
    if (!video_url) {
      throw new AppError("video url is required!", 400);
    }

    const videoData: VideoDocument | null = await Video.findOne({ video_url });

    if (videoData) {
      const userVideoRecord: UserVideoDataDocument | null = await UserVideoData.findOne({ user: userId, video: videoData._id }).populate("video");

      if (userVideoRecord) {
        res.status(200).json(userVideoRecord);
        return;
      }
      const newUserVideoRecord: UserVideoDataDocument = await UserVideoData.create({
        user: userId,
        video: videoData._id,
        notes: "",
        chatHistory: [],
      });
      const populatedRecord: UserVideoDataDocument = await newUserVideoRecord.populate("video");
      res.status(200).json(populatedRecord);
      return;
    }

    const flask_res = await fetch(`${config.FLASK_URI}/api/get-video-details`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ video_url })
    })

    const data = await flask_res.json();

    if (data.error) {
      throw new AppError(data.error, 500);
    }

    const newVideo: VideoDocument = await Video.create({
      ...data,
      video_url
    });

    const newUserVideoRecord: UserVideoDataDocument = await UserVideoData.create({
      user: userId,
      video: newVideo._id,
    });
    const populatedRecord: UserVideoDataDocument = await newUserVideoRecord.populate("video");
    res.status(200).json(populatedRecord);

  } catch (error) {
    console.log("Error in getDetails controller");
    next(error);
  }
}