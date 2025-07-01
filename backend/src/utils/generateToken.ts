import jwt from "jsonwebtoken";
import config from "../config/config";


const generateToken = (userId:string) : string => {
  return jwt.sign({ userId },config.ACCESS_TOKEN_SECRET, { expiresIn: '15d' });
}

export default generateToken;