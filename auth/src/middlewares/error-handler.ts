import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (err instanceof CustomError) {
    console.log(`handling this error as a database connection error`);
		return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  return res.status(400).json({
    errors: [{ message: "Something went wrong" }]
  });
};
