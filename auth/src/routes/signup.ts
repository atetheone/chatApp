import { NextFunction, Request, Response, Router } from "express";
import { body } from "express-validator";
import { signup } from "../services/user.service";
import { validateRequest } from "../middlewares";
import { BadRequestError } from "../errors";

const router = Router();

/* POST /auth/signup . */

router.post(
  "/api/auth/signup",
  [
    body("email").isString().isEmail().withMessage("Email must be valid"),
    body("password")
      .isString()
      .trim()
      .isLength({ min: 4 })
      .withMessage("Password must have at least 6 characters"),
    body("name").isString().notEmpty(),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    // console.log("POST /signup...");

    const { name, email, password } = req.body;
    const user = await signup(name, email, password);
    // console.log({ user: user });
    if (!user.error) res.status(201).json(user);
    else {
      if (user.error === "USED_EMAIL")
        throw new BadRequestError("Email already used");
      throw new BadRequestError(JSON.stringify(user.error));
      //res.status(403).json(user);
    }
  }
);

export { router as signupRouter };
