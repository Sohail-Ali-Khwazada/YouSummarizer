
export class AppError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "AppError";
    Error.captureStackTrace(this, this.constructor);
  }
}
