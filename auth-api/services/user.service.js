const bcrypt = require('bcrypt');
const User = require('../models/user.schema.js');

const login = async (email, pass) => {
  // return await User.findOne();
};

const signup = async (name, email, pass) => {
  let user;
  try {
    const userFound = await User.findOne({email: email });
    if (userFound) {
      throw Error('User already in DB');
    }
    const hash = bcrypt.hash(pass, 12);
    user = User({
      name,
      email,
      hash
    });

    await user.save();
  } catch (e) {
    console.error({error: e});
  }

  return user;
};

const getUsers = async () => {
  return await User.find();
};

const getProfile = async (token) => {
  // return await User.findOne();
};

module.exports = {
  login,
  signup,
  getUsers,
  getProfile
}
