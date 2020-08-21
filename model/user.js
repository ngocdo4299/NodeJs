import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: {
    type: String,
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
  updateAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "active",
  },
  role: {
    type: String,
    default: "guest",
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
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

UserSchema.pre("findOneAndUpdate", async function (next) {
  const docToUpdate = await this.model.findOne(this.getQuery());
  docToUpdate.password = this._update.password
  docToUpdate.updateAt = Date.now();
  docToUpdate.save(function (err) {
    if (err) {
      console.log(err);
    }
  });
  next();
});

UserSchema.statics.verifyPassword = function (verifyUser, callback) {
  this.findOne({ userName: verifyUser.username, status: "active" })
    .then((user) => {
      if (user && bcrypt.compareSync(verifyUser.password, user.password)) {
        generateToken(verifyUser, 60 * 60, (result) => {
          callback(result);
        });
      } else {
        callback({ error: true, data: "Wrong password or username" });
      }
    })
    .catch((err) => {
      console.log(err);
      callback({ error: true, data: "internal server error" });
    });
};
export const User = mongoose.model("users", UserSchema);
