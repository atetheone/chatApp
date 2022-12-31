import express from "express";
import morgan from "morgan";
import cors from "cors";
import { eventsRouter } from'./routes/events'
import { indexRouter } from "./routes";

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())


app.use(indexRouter);
app.use(eventsRouter);

export default app;
