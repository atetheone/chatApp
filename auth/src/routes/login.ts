import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { login } from "../services/user.service";
import { validateRequest } from "../middlewares";
import { BadRequestError } from "../errors";

const router = Router();

/* POST /auth/login listing. */

router.post(
  "/api/auth/login", 
  [
    body("email")
      .isString()
      .isEmail()
      .withMessage("Email must be valid"),
    body("password")
      .isString()
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must have at least 6 characters")
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const result = await login(email, password);
    if (!result.error) {
      // req.session = {
      //   jwt: result.token
      // };
      return res.status(200).json(result);
    }
    if (result.error === "CREDENTIALS_INVALID")
      throw new BadRequestError("Invalid credentials");
    else 
      res.status(401).json(result);
});

export { router as loginRouter };
