require('../dbconfig')();

import express from 'express';
import logger from 'morgan';
import cors from 'cors';

import {
    defaultRouter,
    loginRouter,
    signupRouter,
    profileRouter,
    usersRouter
} from './routes';
const app = express();


/*** MIDDLEWARES***************************************** */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
// app.use(cookieParser());
/********************************************************* */

/***API ENDPOINTS***************************************** */
app.use(defaultRouter);
app.use(loginRouter);
app.use(profileRouter);
app.use(usersRouter);
app.use(signupRouter);
/********************************************************* */

module.exports = app;
