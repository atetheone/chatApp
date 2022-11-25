const express = require('express');
const { login } = require('../services/user.service');
const router = express.Router();

/* GET users listing. */
router.post('/login', async (req, res) => {
  const { email, passwordText } = req.body;

  const result =  await login(email, pass);
  if (result) res.status(200).json(result);
  res.status(404).json({error: '', msg: ''});
});

module.exports = router;