import { Request, Response, Router } from "express";

const router = Router();
/* GET users listing. */

router.post("/api/auth/signout", async (req: Request, res: Response) => {
  // Nothing to do here, the token is stored in the client side
});

export { router as signoutRouter };