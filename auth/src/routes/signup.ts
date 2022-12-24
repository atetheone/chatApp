import { Request, Response, Router } from "express";
import { signup } from "../services/user.service";

const router = Router();

/* GET users listing. */

router.post("/auth/signup", async (req, res) => {
  console.log("POST /signup...");
  const { name, email, password } = req.body;
  const user = await signup(name, email, password);
  if (user) {
    console.log({ user: user });
    if (user.error) res.status(403).json(user);
    else
      res.status(201).json(user);
  }
});

export { router as signupRouter };
