const connect = require('./dbconfig');

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const loginRouter = require('./controllers/login');
const signupRouter = require('./controllers/signup');
const profileRouter = require('./controllers/profile');
const usersRouter = require('./controllers/users');
const indexRouter = require('./controllers/index');
const app = express();


/*** MIDDLEWARES***************************************** */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
/********************************************************* */

connect();
/***API ENDPOINTS***************************************** */
app.use('/', indexRouter);
profileRouter(app, '/me');
usersRouter(app, '/users');
loginRouter(app, '/login');
signupRouter(app, '/signup');
/********************************************************* */

module.exports = app;
