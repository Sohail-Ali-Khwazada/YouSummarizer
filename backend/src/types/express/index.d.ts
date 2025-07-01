import { userWithoutPassword } from "../custom";



declare global {
  namespace Express {
    interface Request {
      user?: userWithoutPassword;
    }
  }
}