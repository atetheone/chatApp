const express = require('express');
const router = express.Router();

/* GET users listing. */
router.post('/', async (req, res) => {
  const { email, passwordText } = req.body;

    await sleep();
});

module.exports = router;