const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const loginRouter = require('./constrollers/login');
const signupRouter = require('./controllers/signup');
const profileRouter = require('./controllers/profile');

const app = express();

const db = await require('./dbconfig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*** ENDPOINTS***************************** */
app.use('/me', profileRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);

/********************************************** */

module.exports = app;
