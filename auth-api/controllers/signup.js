// const express = require("express");
const { signup } = require("../services/user.service");
// const router = express.Router();

/* GET users listing. */
module.exports = (app, route) => {
  app.post(route, async (req, res) => {
    console.log("POST /signup...");
    const { name, email, password } = req.body;
    const user = await signup(name, email, password);
    if (user) {
      console.log({ user: user });
      if (user.error) res.status(403).json(user);
      else
        res.status(201).json(user);
    }
  });
};

// module.exports = router;
