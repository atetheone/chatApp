import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { currentUser, requireAuth } from "../middlewares";

const router = Router();
/* GET users listing. */

router.get(
  "/api/auth/current-user",
  currentUser,
  requireAuth,
  (req: Request, res: Response) => {
    res.json({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
