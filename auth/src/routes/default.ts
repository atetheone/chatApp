import { Router, Request, Response } from "express";
const router = Router();

router.get('/api/auth', (req: Request, res: Response) => {
  const result: any = {
    'app': "Chattime",
    'msg': "Welcome to my chat app"
  }
  res.json(result);
});

export { router as defaultRouter };