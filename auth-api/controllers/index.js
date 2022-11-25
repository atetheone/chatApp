const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
  
  res.json({
    app: "Chattime",
    msg: "Welcome to my chat app"
  });
});

module.exports = router;
