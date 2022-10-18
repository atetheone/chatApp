const router = require('express').Router();
const passport = require('passport');

const github = router.get('/auth/github',
  passport.authenticate('github')
);

const callback = router.get('/auth/github/callback',
  passport.authenticate(
    'github', 
    { failureRedirect: '/' }
  ), 
  (req,res) => {
    req.session.user_id = req.user.id
    res.redirect('/chat');
  }
);

module.exports = {github, callback};