require("dotenv").config();

const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

module.exports =  async () => {
  try {
    const db = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (db) {
      console.log({
        success: "DB_CONNECT_SUCCESS",
        msg: "Connected sucessfully to the DB",
      });
    }
  } catch (e) {
    console.log({
      error: "DB_CONNECT_ERROR",
      msg: "Unable to connect to the DB",
    });
  }
};
