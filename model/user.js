import mongoose from "mongoose";
import bcrypt from "bcrypt";
import {generateToken} from '../utils/generateToken.js'
const Schema = mongoose.Schema;

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
    required: [true, "Fullname field is required"],
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
          generateToken(verifyUser, 60*60, (res)=>{
          callback(res)
        })
      }else{
          callback({"error": true , "data": "Wrong password"})
      }
    })
    .catch((err) => {
     callback({"error": true , "data": "Wrong password", "code": err});
    });
};
export const User = mongoose.model("users", UserSchema);
