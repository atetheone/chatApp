const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  hash: String,
  savedAt: {
    type: Date,
    default: new Date().toISOString()
  }
});

module.exports = mongoose.model("user", userSchema);
