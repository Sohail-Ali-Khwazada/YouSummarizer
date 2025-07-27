import { Request, Response, NextFunction } from 'express';
import { AppError } from "../types/custom";



export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
};