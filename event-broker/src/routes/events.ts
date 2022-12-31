import { Request, Response, Router } from "express";

const router: Router = Router();
/* /events  */

router.get("/events", (req: Request, res: Response) => {
  res.json({ msg: "GET /events: Microservice running..." });
});

router.post("/events", (req: Request, res: Response) => {
  console.log(req.body);
  res.json({ msg: "POST /events: Microservice running...", ...req.body });
});

export { router as eventsRouter };
