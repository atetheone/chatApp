const bcrypt = require("bcrypt");
import {User } from "../models/user.schema";
import jwt from "jsonwebtoken";

export const login = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ email });
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
    const JWT_SECRET = process.env.JWT_SECRET!;
    const token = jwt.sign({ id: user._id, username: user.email }, JWT_SECRET, {
      algorithm: 'HS256',
      expiresIn: '1d'
    });
    console.log(user.name)
    return { token, user };
  } catch (e) {
    console.error(e);
    return {error: e}
  }
};

export const signup = async (name: string, email: string, pass: string) => {
  let user;
  try {
    const userFound = await User.findOne({ email });
    if (userFound) {
      return { error: "USED_EMAIL", msg: "User already in DB" };
    }
    const hash = await bcrypt.hash(pass, 12);
    user = new User({
      name,
      email,
      hash
    });

    await user.save();
  } catch (e) {
    console.error({ error: e });
    return {error: e};
  }

  return {status: 201, success: true, user};
};

export const getUsers = async () => {
  return await User.find({});
};

export const deleteAccount = async (email: string) => {
  try {
    await User.deleteOne({ email });

    return {msg: "User deleted successfully", status: 200};
  } catch (e) {
    console.log(e);
  }
};
