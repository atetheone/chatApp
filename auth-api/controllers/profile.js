const express = require("express");
const router = express.Router();

/* GET users listing. */
module.exports = (app, route) => {
  app.get(route, (req, res) => {
    res.json({
      user: "atetheone",
      email: "atevirran@gmail.com",
      name: "Até Tougué Aristide",
    });
  });
};
