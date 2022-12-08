const bcrypt = require("bcrypt");
const User = require("../models/user.schema.js");
const jwt = require("jsonwebtoken");

const login = async (email, password) => {
  try {
    const user = await User.findOne({ email }).select({ has: 0, __v: 0 });
    if (!user) {
      // email not found
      return { error: "CREDENTIALS_INVALID", msg: "Email/Password invalid" };
    }
    // user found
    const validPassword = await bcrypt.compare(password, user.hash);

    if (!validPassword) {
      // invalid password
      return { error: "CREDENTIALS_INVALID", msg: "Email/Password invalid" };
    }
    //password valid
    const JWT_SECRET = process.env.JWT_SECRET;
    const token = await jwt.sign({ sub: user._id, username: user.email }, JWT_SECRET, {
      algorithm: 'HS256',
      expiresIn: '1d'
    });
    console.log(user.name)
    return {token, ...user._doc};
  } catch (e) {
    console.log({ error: e });
  }
};

const signup = async (name, email, pass) => {
  let user;
  try {
    const userFound = await User.findOne({ email });
    if (userFound) {
      return { error: "OPERATION_FORBIDDEN_ERROR", msg: "User already in DB" };
    }
    const hash = await bcrypt.hash(pass, 12);
    user = User({
      name,
      email,
      hash,
    });

    await user.save();
  } catch (e) {
    console.error({ error: e });
  }

  return {name, email};
};

const getUsers = async () => {
  return await User.find({}).select({ hash: 0, __v: 0, _id: 0 });
};

const getProfile = async (token) => {
  // return await User.findOne();
};

module.exports = {
  login,
  signup,
  getUsers,
  getProfile,
};
