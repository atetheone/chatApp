const profileRouter = require('./routes/profile');
const loginRouter = require('./routes/login');
const register = require('.routes/register');
const chatRouter = require('.routes/chat');
const githubRouter = require('./github');

module.exports = function (app, myDataBase) {
  app.get('/', (req, res) => {
    //Change the response to render the Pug template
    res.render('pug', {
      title: 'Connected to Database',
      message: 'Please login',
      showLogin: true,
      showRegistration: true,
      showSocialAuth: true
    });
  });

  register(app, myDataBase);

  app.use('/login', loginRouter);
  app.use('/profile', profileRouter);
  app.use('/chat', chatRouter);
  app.use('/auth/github', githubRouter.github);
  app.use('/auth/github/callback', githubRouter.callback);
};

