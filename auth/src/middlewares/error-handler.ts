import { NextFunction, Request, Response } from "express";
import { DatabaseConnectionError, RequestValidationError } from "../errors";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    console.log(`handling this error as a request validation error`);
  }

  if (err instanceof DatabaseConnectionError) {
    console.log(`handling this error as a database connection error`);
  }

  res.status(400).json({
    msg: "Something went wrong",
  });
};
