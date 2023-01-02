require("dotenv").config();

import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI || "";

mongoose.set("strictQuery", false);
export const startDB = async () => {
  try {
    const db = await mongoose.connect(MONGO_URI);
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
      stack: JSON.stringify(e)
    });
    throw Error("DB_CONNECT_ERROR");
  }
};
