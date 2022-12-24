import { Application } from "express";

import { signup } from "../services/user.service";

/* GET users listing. */
export const signupRouter = (app: Application, route: string) => {
  app.post(route, async (req, res) => {
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
};
