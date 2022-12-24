import express, { Request, Response, Router } from "express";

const router = Router();
/* GET users listing. */

router.get("/users/me", (req: Request, res: Response) => {
  res.json({
    user: "atetheone",
    email: "atevirran@gmail.com",
    name: "Até Tougué Aristide",
  });
});

export { router as profileRouter };

