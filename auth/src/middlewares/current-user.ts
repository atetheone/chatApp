import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
	id: string;
	username: string;
	iat: number;
	exp: number;
}

declare global {
	namespace Express {
		interface Request {
			currentUser?: UserPayload
		}
	}
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }
  const JWT_SECRET = Buffer.from(process.env.JWT_SECRET || "").toString();

  try {
    const payload = jwt.verify(req.session.jwt, JWT_SECRET) as UserPayload;
		// console.log("JWT payload: ", payload)
    req.currentUser = payload;
  } catch (err) {}

  next();
};
