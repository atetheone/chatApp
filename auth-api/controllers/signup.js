const express = require("express");
const { signup } = require("../services/user.service");
const router = express.Router();

/* GET users listing. */
router.post("/signup", async (req, res) => {
  console.log("POST /signup...")
  const { name, email, password } = req.body;
  const user = await signup(name, email, password);
  if (user) {
    console.log({user: user});
    res.json(user);
  }
});

module.exports = router;
