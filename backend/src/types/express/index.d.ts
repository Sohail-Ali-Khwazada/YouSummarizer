import { UserDocument } from "../custom";



declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
    }
  }
}