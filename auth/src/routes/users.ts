import { Request, Response, Router } from "express";
import { getUsers } from "../services/user.service";

const router = Router();
/* GET users listing. */

router.get("/api/auth/users", async (req: Request, res: Response) => {
  console.log("Calling...");
  const users = await getUsers();
  res.json(users);
});

export { router as usersRouter };

