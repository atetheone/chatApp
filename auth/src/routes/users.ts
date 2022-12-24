import { Application } from "express";
import { getUsers } from "../services/user.service";

/* GET users listing. */
export const usersRouter = (app: Application, route: string) => {
  app.get(route, async (req, res) => {
    const users = await getUsers();
    res.json(users);
  });
};
