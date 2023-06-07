import { Router, Request, Response } from "express";

const eventRouter = Router();

eventRouter.post("/api/events/publish", (req: Request, res: Response) => {
  res.json({
    msg: "Receiving post request"
  })
});

export { eventRouter };