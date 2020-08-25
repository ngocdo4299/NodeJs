import { User } from '../../model/user.js';
import { responseFormalize } from "../../helper/response.js";
import { generateToken, generateResetToken } from "../../utils/generateToken.js";

const loginUser = async (data) => {
  try {
    const result = await User.verifyPassword(data)
    if (!result.error) {
      const token = await generateToken(result.message, 60 * 60)
      return responseFormalize(200, 'TOKEN_GENERATE_SUCCESS', true, '', token)
    } else {
      return responseFormalize(203, 'TOKEN_GENERATE_FAILED', true, result.message)
    }
  } catch (err) {
    console.log(`Login user error ${err}`)
    return responseFormalize(500, 'INTERNAL_SERVER_ERROR', true, 'Internal server error')
  }
};

const getUserDetail = (id) => {
  return new Promise((resolve, reject) => {
    User.findOne({ _id: id, status: 'active' })
      .then((user) => {
        if (user) {
          user.password = undefined
          return resolve(responseFormalize(200, 'GET_USER_DETAIL_SUCCESS', '', '', user))
        } else {
          return resolve(responseFormalize(200, 'GET_USER_DETAIL_FAIL', true, 'User not found'))
        }
      })
      .catch((err) => {
        console.log(`Get user detail ${err}`)
        return reject(responseFormalize(500, 'INTERNAL_SERVER_ERROR', true, 'Internal server error'))
      });
  })
};


const createUser = async (newUser) => {
  try {
    const user = await User.findOne({ userName: newUser.userName, status: 'active' })
    if (!user) {
      const user = await User.create(newUser)
      return responseFormalize(200, 'CREATE_NEW_USER_SUCCESS', '', '', user._id)
    }
    else
      return responseFormalize(200, 'USER_EXISTED', true)
  } catch (err) {
    console.log(`Create user error ${err}`)
    return responseFormalize(500, 'INTERNAL_SERVER_ERROR', true, 'Internal server error')
  }
};

const updateUser = (id, data) => {
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate({ _id: id, status: 'active' }, data)
      .then((user) => {
        resolve(responseFormalize(200, "UPDATE_USER_SUCCESS", false, user._id));
      })
      .catch((err) => {
        console.log(`Update user error${err}`)
        reject(responseFormalize(500, 'INTERNAL_SERVER_ERROR', true, 'Internal server error'));
      });
  })
};

const removeUser = (id) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(id, { status: "deleted" })
      .then(() => {
        resolve(responseFormalize(200, "DELETE_USER_SUCCESS", false));
      })
      .catch((err) => {
        console.log(`Delete user error${err}`)
        reject(responseFormalize(500, 'INTERNAL_SERVER_ERROR', true, 'Internal server error'));
      });
  })
};

const forgotPassword = async (data) => {
  try {
    const resetToken = await generateResetToken()
    const user = await User.findOneAndUpdate({ userName: data.username }, resetToken)
    if (!user)
      return responseFormalize(200, 'USER_NOT_FOUND', true)
    else
      return responseFormalize(200, 'TOKEN_GENERATE_SUCCESS', true, 'Temporary password, valid in 1 minute', resetToken)
  } catch (err) {
    console.log(`Reset token error${err}`)
    reject(responseFormalize(500, 'INTERNAL_SERVER_ERROR', true, 'Internal server error'));
  }
}

const resetNewPassword = async (id, data) => {
  try {
    const now = new Date;
    const user = await User.findOneAndUpdate({ _id: id, resetToken: data.resetToken, resetTokenExpired: { $gte: now } }, { password: data.password, resetToken: null })
    if (!user)
      return responseFormalize(200, 'INVALID_INPUT', true)
    else
      return responseFormalize(200, 'RESET_PASSWORD_SUCCESS', true, 'User found', user._id)

  } catch (err) {
    console.log(`Reset token error${err}`)
    reject(responseFormalize(500, 'INTERNAL_SERVER_ERROR', true, 'Internal server error'));
  }
}

export { loginUser, getUserDetail, createUser, updateUser, removeUser, forgotPassword, resetNewPassword };
