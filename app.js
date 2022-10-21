'use strict';
require('dotenv').config();
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const session = require('express-session');
const bcrypt = require('bcrypt');
const passportSocketIo = require('passport.socketio');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongodb-session')(session);
const debug = require('debug')('chatapp:server');

const connection = require('./connection');
const routes = require('./routes.js');
const auth = require('./auth.js');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const URI = process.env.MONGO_URI_PROD;
const store = new MongoStore({
  url: URI
});



const passport = require('passport');
  
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

io.use(
  passportSocketIo.authorize({
    cookieParser: cookieParser,
    key: 'express.sid',
    secret: process.env.SESSION_SECRET,
    store: store,
    success: onAuthorizeSuccess,
    fail: onAuthorizeFail
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.set('views', __dirname + '/views');
app.set('view engine', 'pug')


connection(async client => {
  const myDataBase = await client.db('auth-chat').collection('users');

  
  routes(app, myDataBase);
  auth(app, myDataBase);
     
  let currentUsers = 0;
  io.on('connection', socket => {
    
    let name = !socket.request.user.name ? socket.request.user.username : socket.request.user.name;
    
    
    currentUsers++;
    io.emit('user', {
      name: name,
      currentUsers,
      connected: true
    });
    socket.on('chat message', (message) => {
      io.emit('chat message', { name: name, message });
    });
    console.log('The user ' + name + 'is connected');
    socket.on('disconnect', () => {
      console.log('A user has disconnected');
      currentUsers--;
      io.emit('user', {
        name: name,
        currentUsers,
        connected: false
      });
    });

  });
  
  
}).catch(e => {
  app.route('/').get((req, res) => {
    res.render('pug', { title: e, message: 'Unable to login' });
  });
});

function onAuthorizeSuccess(data, accept) {
  console.log('successful connection to socket.io');

  accept(null, true);
}

function onAuthorizeFail(data, message, error, accept) {
  if (error) throw new Error(message);
  console.log('failed connection to socket.io:', message);
  accept(null, false);
}



/**
 * Get port from environment and store in Express.
 */
 const port = normalizePort(process.env.PORT || '3333');
 app.set('port', port);
 
 
 /**
  * Listen on provided port, on all network interfaces.
  */
 
 server.listen(port);
 server.on('error', onError);
 server.on('listening', onListening);
 
 /**
  * Normalize a port into a number, string, or false.
  */
 
 function normalizePort(val) {
   var port = parseInt(val, 10);
 
   if (isNaN(port)) {
     // named pipe
     return val;
   }
 
   if (port >= 0) {
     // port number
     return port;
   }
 
   return false;
 }
 
 /**
  * Event listener for HTTP server "error" event.
  */
 function onError(error) {
   if (error.syscall !== 'listen') {
     throw error;
   }
 
   var bind = typeof port === 'string'
     ? 'Pipe ' + port
     : 'Port ' + port;
 
   // handle specific listen errors with friendly messages
   switch (error.code) {
     case 'EACCES':
       console.error(bind + ' requires elevated privileges');
       process.exit(1);
       break;
     case 'EADDRINUSE':
       console.error(bind + ' is already in use');
       process.exit(1);
       break;
     default:
       throw error;
   }
 }
 
 /**
  * Event listener for HTTP server "listening" event.
  */
 
 function onListening() {
   var addr = server.address();
   var bind = typeof addr === 'string'
     ? 'pipe ' + addr
     : 'port ' + addr.port;
   debug('Listening on ' + bind);
 }