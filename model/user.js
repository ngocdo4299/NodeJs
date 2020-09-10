/* eslint-disable no-console */
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { logger } from '../helper/logger.js';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Password field is required'],
  },
  fullName: {
    type: String,
    required: [true, 'Fullname field is required'],
  },
  status: {
    type: String,
    default: 'active',
  },
  role: {
    type: String,
    default: 'guest',
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  resetToken: {
    type: String,
    default: null,
  },
  resetTokenExpired: {
    type: Date,
    default: Date.now,
  },

}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

UserSchema.pre('save', async function save(next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    return next();
  } catch (err) {

    return next(err);
  }
});

UserSchema.pre('updateOne', async function (next) {
  const docToUpdate = await this.model.findOne(this.getQuery());
  // eslint-disable-next-line no-prototype-builtins
  if( this._update.hasOwnProperty('password')) {
    docToUpdate.password = this._update.password;
    docToUpdate.save(function (err) {
      if (err) {
        logger(err);
      } else {
        next();
      }
    });
  }
  else{
    next();
  }
});

UserSchema.statics.verifyPassword = async function (verifyUser) {
  const user = await this.findOne({ userName: verifyUser.username, status: 'active' });
  if (!user){
    return { error: true, message: 'Username not found' };
  }
  else {
    if (user && bcrypt.compareSync(verifyUser.password, user.password)) {
      return { error: false, message: { fullname: user.fullName, username: user.userName } };
    } else {
      return { error: true, message: 'Incorrect password' };
    }
  }
};
export const User = mongoose.model('users', UserSchema);
