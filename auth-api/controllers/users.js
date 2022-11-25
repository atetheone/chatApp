const express = require('express');
const { getUsers } = require('../services/user.service');
const router = express.Router();

/* GET users listing. */
router.get('/users', (req, res, ) => {
  // const users = getUsers();
  res.json({users});
});

module.exports = router;
