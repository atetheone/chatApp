require('../dbconfig')();

import * as express from 'express';
import * as logger from 'morgan';
import * as cors from 'cors';

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
app.use('/', defaultRouter);
profileRouter(app, '/me');
usersRouter(app, '/users');
loginRouter(app, '/login');
signupRouter(app, '/signup');
/********************************************************* */

module.exports = app;
