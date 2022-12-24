import { Application } from "express";

import { login } from "../services/user.service";

/* GET users listing. */
export const loginRouter =  (app: Application, route: string) => {
  app.post(route, async (req, res) => {
    const { email, password } = req.body;

    const result = await login(email, password);
    if (result) 
      res.status(200).json(result);
    else if (result.error)
      res.status(401).json(result);
  });
};
