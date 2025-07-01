import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user.model.js";
import { userWithoutPassword } from "../types/custom.js";
import { NextFunction, Request, Response } from "express";
import config from "../config/config.js";
import { AppError } from "../utils/AppError";



const protectRoute = async(req:Request,res:Response,next:NextFunction) => {
  try{

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Unauthorized - No Token Provided",401);
    }
    
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token,config.ACCESS_TOKEN_SECRET) as JwtPayload;
    
    const user: userWithoutPassword | null = await User.findById(decoded.userId).select("-password");

    if(!user) {
      throw new AppError("User not found",404);
    }

    req.user = user;
    next();
  }catch(error) {
    console.log("Error in protectRoute middleware");
    next(error);
  }
}

export default protectRoute;