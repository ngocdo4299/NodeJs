import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;
dotenv.config();

const UserSchema = new Schema({
  username: {
    type: String,
    unique: [true, "Usename is unique"],
  },
  password: {
    type: String,
    required: [true, "Password field is required"],
  },
  fullName: {
    type: String,
    required: [true, "Password field is required"],
  },
  createAt: {
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
          { verifyUser }, process.env.TOKEN_ACCESS,
          { expiresIn: 60 * 60 }, (err, token) => {
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
export const User = mongoose.model("users", UserSchema);

