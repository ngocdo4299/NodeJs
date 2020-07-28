const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  id: {
    type: Number,
    required: [true, "id field is required"],
  },
  username: {
    type: String,
    required: [true, "Username field is required"],
  },
  password: {
    type: String,
    required: [true, "Password field is required"],
  },
  preName: {
    type: String,
  },
  firstName: {
    type: String,
    required: [true, "Firstname is required"],
  },
  lastName: {
    type: String,
    required: [true, "Lastname is required"],
  },
  role: {
    type: String,
    required: [true, "Role field is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
