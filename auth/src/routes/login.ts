import { Router, Request, Response } from "express";
import { login } from "../services/user.service";

const router = Router();

/* POST /auth/login listing. */

router.post("/auth/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await login(email, password);
  if (result) 
    res.status(200).json(result);
  else if (result.error)
    res.status(401).json(result);
});
export { router as loginRouter };
