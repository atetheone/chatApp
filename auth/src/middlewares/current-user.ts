import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
	id: string;
	email: string;
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
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  const JWT_SECRET = process.env.JWT_SECRET!;

  if (!token) return next();
  try {
    const payload = jwt.verify(token, JWT_SECRET) as UserPayload;
    req.currentUser = payload;
  } catch (err) {
    console.error(err);
  }
  next();
};
