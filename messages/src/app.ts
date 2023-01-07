import express from "express";
// import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { indexRouter } from "./routes";
import { messageRouter } from "./routes/message";
const app = express();

/** MIDDLEWARES *******************/
// app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
// app.use(express.urlencoded({type: "true"}));
/************************************* */


/*** ENDPOINTS  ***********************/
app.use(indexRouter);
app.use(messageRouter)

/**************************************/


export default app;