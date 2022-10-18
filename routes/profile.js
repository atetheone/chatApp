const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('./ensureAuth');

router.get('/profile',
  ensureAuthenticated,
  (req, res) => {
    res.render(
      process.cwd() + '/views/pug/profile',
      {
        username: req.user.username
      }
    );
  }
);

module.exports = router;