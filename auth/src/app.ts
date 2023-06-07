import express from "express";
import "express-async-errors";
import morgan from "morgan";
import cors from "cors";
import cookieSession  from "cookie-session";

import {
  defaultRouter,
  loginRouter,
  signupRouter,
  currentUserRouter,
  usersRouter,
  signoutRouter,
  eventRouter,
} from "./routes";
import { errorHandler } from "./middlewares";
import { NotFoundError } from "./errors";

export const app = express();

// app.set('trust proxy', true)
/*** MIDDLEWARES***************************************** */
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieSession({
  signed: false,
  secure: false
}))
/********************************************************* */

/***API ENDPOINTS***************************************** */
app.use(defaultRouter);
app.use(loginRouter);
app.use(currentUserRouter);
app.use(usersRouter);
app.use(signupRouter);
app.use(signoutRouter);
app.use(eventRouter);

app.all("*", () => {
	throw new NotFoundError();
});
/********************************************************* */
app.use(errorHandler); // error handler middleware

export default app;