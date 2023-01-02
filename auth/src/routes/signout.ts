import { Request, Response, Router } from "express";

const router = Router();
/* GET users listing. */

router.get("/api/auth/signout", async (req: Request, res: Response) => {
  req.session = null;
  res.json({});
});

export { router as signoutRouter };