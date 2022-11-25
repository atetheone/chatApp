const User = require('../models/user.schema.js');

async login = (email, pass) => {
  return await User.findOne();
};
