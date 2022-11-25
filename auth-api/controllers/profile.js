const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/me', (req, res) => {
  res.json({
    user: 'atetheone',
    email: 'atevirran@gmail.com',
    name: 'Até Tougué Aristide'
  });
});

module.exports = router;