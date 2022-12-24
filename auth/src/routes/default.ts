import * as express from "express";
import { Request, Response } from "express";
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  const result: any = {
    'app': "Chattime",
    'msg': "Welcome to my chat app"
  }
  res.json(result);
});

export {router as defaultRouter };