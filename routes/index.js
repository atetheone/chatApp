const profile = require('./profile');
const login = require('./login');
const register = require('./register');
const chat = require('./chat');
const github = require('./github');
const ensureAuthenticated = require('./ensureAuth');

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
  login(app);
  profile(app, ensureAuthenticated)
  chat(app, ensureAuthenticated);
  github(app);
};

