import { Request, Response, Router } from "express";
import { getUsers } from "../services/user.service";

const router = Router();
/* GET users listing. */

router.get("/users", async (req, res) => {
  const users = await getUsers();
  res.json(users);
});

export { router as usersRouter };

