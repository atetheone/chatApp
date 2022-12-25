import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import { signup } from "../services/user.service";
import { DatabaseConnectionError, RequestValidationError } from "../errors";

const router = Router();

/* POST /auth/signup . */

router.post(
  "/auth/signup",
  [
    body("email").isString().isEmail().withMessage("Email must be valid"),
    body("password")
      .isString()
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must have at least 6 characters"),
    body("name").isString(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // request validation error
      // console.log(errors.array());
      throw new RequestValidationError(errors.array())
      res
        .status(400)
        .json({
          success: false,
          statusCode: 400,
          msg: "Error in validating request",
          error: errors.array()
        });
    }
    console.log("POST /signup...");
    const { name, email, password } = req.body;
    const user = await signup(name, email, password);
    if (user) {
      console.log({ user: user });
      if (user.error) res.status(403).json(user);
      else res.status(201).json(user);
    }
  }
);

export { router as signupRouter };
