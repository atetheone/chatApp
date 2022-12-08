require('./dbconfig')();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const profileRouter = require('./routes/profile');
const usersRouter = require('./routes/users');
const indexRouter = require('./routes/index');
const app = express();


/*** MIDDLEWARES***************************************** */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
// app.use(cookieParser());
/********************************************************* */

/***API ENDPOINTS***************************************** */
app.use('/', indexRouter);
profileRouter(app, '/me');
usersRouter(app, '/users');
loginRouter(app, '/login');
signupRouter(app, '/signup');
/********************************************************* */

module.exports = app;
