const { login } = require("../services/user.service");

/* GET users listing. */
module.exports = (app, route) => {
  app.post(route, async (req, res) => {
    const { email, password } = req.body;

    const result = await login(email, password);
    if (result) 
      res.status(200).json(result);
    else if (result.error)
      res.status(401).json(result);
  });
};
