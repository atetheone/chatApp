import { NextFunction, Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import { signup } from "../services/user.service";
import { BadRequestError, DatabaseConnectionError, RequestValidationError } from "../errors";

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
    body("name")
      .isString()
      .not()
      .isEmpty()
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // request validation error
      throw new RequestValidationError(errors.array());

    } else {
      console.log("POST /signup...");
      const { name, email, password } = req.body;
      const user = await signup(name, email, password);
      if (user) {
        console.log({ user: user });
        if (!user.error) res.status(201).json(user);
        else {
          if (user.error === "OPERATION_FORBIDDEN_ERROR") 
            throw new BadRequestError("Email in use");
          throw new BadRequestError(JSON.stringify(user.error));
            //res.status(403).json(user);
        }
      }
    }
  }
);

export { router as signupRouter };
