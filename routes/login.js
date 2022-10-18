const router = require('express').Router();
const passport = require('passport');


router.post('/login',
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

module.exports = router;