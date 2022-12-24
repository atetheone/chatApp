import { Application } from "express";

/* GET users listing. */
export const profileRouter = (app: Application, route: string) => {
  app.get(route, (req, res) => {
    res.json({
      user: "atetheone",
      email: "atevirran@gmail.com",
      name: "Até Tougué Aristide",
    });
  });
};
