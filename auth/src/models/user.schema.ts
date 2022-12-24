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
const UserModel = mongoose.model("user", userSchema);
export { UserModel as User };
