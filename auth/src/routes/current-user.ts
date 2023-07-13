import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { currentUser, requireAuth } from "../middlewares";

const router = Router();
/* GET users listing. */

router.get(
  "/api/auth/currentuser", 
  currentUser,
  requireAuth,
  (req: Request, res: Response) => {
    console.log(`current user is: ${JSON.stringify(req.currentUser, null, 3)}`)
    res.json(req.currentUser || null);
  }
);

export { router as currentUserRouter };
