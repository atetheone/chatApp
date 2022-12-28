require("./startDB")();
import express from "express";
import "express-async-errors";
import morgan from "morgan";
import cors from "cors";
import {
  defaultRouter,
  loginRouter,
  signupRouter,
  profileRouter,
  usersRouter,
} from "./routes";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors";

export const app = express();

/*** MIDDLEWARES***************************************** */
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// app.use(cookieParser());
/********************************************************* */

/***API ENDPOINTS***************************************** */
app.use(defaultRouter);
app.use(loginRouter);
app.use(profileRouter);
app.use(usersRouter);
app.use(signupRouter);

app.all("*", () => {
	throw new NotFoundError();
});
/********************************************************* */
app.use(errorHandler); // error handler middleware

module.exports = app;
