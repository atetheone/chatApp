const { getUsers } = require("../services/user.service");

/* GET users listing. */
module.exports = (app, route) => {
  app.get(route, async (req, res) => {
    const users = await getUsers();
    res.json(users);
  });
};
