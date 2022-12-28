import { Router, Request, Response } from "express";
import { login } from "../services/user.service";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors";

const router = Router();

/* POST /auth/login listing. */

router.post(
  "/auth/login", 
  [
    body("email")
      .isString()
      .isEmail()
      .withMessage("Email must be valid"),
    body("password")
      .isString()
      .trim()
      .isLength({ min: 2 })
      .withMessage("Password must have at least 6 characters")
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;

    const result = await login(email, password);
    if (!result.error) 
      res.status(200).json(result);
    else
      res.status(401).json(result);
});
export { router as loginRouter };
