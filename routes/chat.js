const router = require('express').Router();
const ensureAuthenticated = require('./ensureAuth');
  
router.get('/chat',
  ensureAuthenticated,
  (req, res) => {
  res.render(
    process.cwd() + '/views/pug/chat', {
    user: req.user
  });
});

module.exports = router;