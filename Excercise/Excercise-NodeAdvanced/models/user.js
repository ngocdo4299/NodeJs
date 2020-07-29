const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");
const UserSchema = new Schema({
  id: {
    type: Number,
    required: [true, "id field is required"],
  },
  username: {
    type: String,
    required: [true, "Username field is required"],
    unique: [true, "Usename is uniqie"],
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

UserSchema.pre("save", async function save(next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.statics.verifyPassword = function (verifyUser,callback) {
  this.findOne({ username: verifyUser.username })
    .then((user) => {
      if (bcrypt.compareSync(verifyUser.password, user.password)) {
        jwt.sign(
          { verifyUser },
          process.env.TOKEN_ACCESS,
          { expiresIn: 60 * 60 },
          (err, token) => {
            if (err) {
             callback(err);
            } else {
             callback({"token": token});
            }
          }
        );
      }else{
          callback('Wrong Password')
      }
    })
    .catch((err) => {
     callback("User not found");
    });
};
const User = mongoose.model("user", UserSchema);

module.exports = User;
