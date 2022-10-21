const passport = require('passport');

module.exports = function (app) {
  app.post('/login',
    passport.authenticate(
      'local',
      { failureRedirect: '/' }
    ), 
    (req, res) => {
      const user = req.user ? req.user : {};
      console.log(user);
      res.redirect('/chat');
    }
  );
}