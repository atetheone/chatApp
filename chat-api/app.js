const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');

const app = express();

/** MIDDLEWARES *******************/
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({type: true}));
/************************************* */


/*** ENDPOINTS  ***********************/


/**************************************/


module.exports = app;