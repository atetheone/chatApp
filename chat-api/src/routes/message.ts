import { Request, Response, Router } from "express";
import { getMessages, addMessage } from "../services/message.service";

const router: Router = Router();

router.get("/messages", async (req: Request, res: Response) => {
  try {
    const messages = await getMessages();
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/messages/create", async (req: Request, res: Response) => {
  try {
    const result = await addMessage();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

export { router as messageRouter };