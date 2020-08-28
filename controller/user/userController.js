import { User } from '../../model/user.js';
import { responseFormalize } from "../../helper/response.js";
import { generateToken, generateResetToken } from "../../utils/generateToken.js";
import { logger, readFile } from '../../helper/logger.js'

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
    logger(`Log In ${err}`)
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
        logger(`Get user detail ${err}`)
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
    logger(`Create user error ${err}`)
    readFile()
    return responseFormalize(500, 'INTERNAL_SERVER_ERROR', true, 'Internal server error')
  }
};

const updateUser = async (id, data) => {
  try {
    const user = await User.findOne({_id: id})
    if(user){
      const update = await user.updateOne(data)
      return responseFormalize(200, 'GET_USER_DETAIL_SUCCESS', '', '', update)
    }else{
      return responseFormalize(200, 'GET_USER_FAIL', true, 'User not found')
    }
  }catch(err){
    logger(`Update user error ${err}`)
    return responseFormalize(500, 'INTERNAL_SERVER_ERROR', true, 'Internal server error')
  }

};

const removeUser = (id) => {
  return updateUser(id, {status: "deleted"})
};

const forgotPassword = async (data) => {

  try {
    const user = await User.findOne({ userName: data.username })
    if(user){
      const resetToken = await generateResetToken()
      const update = await user.updateOne(resetToken)
      return responseFormalize(200, 'TOKEN_GENERATE_SUCCESS', '', '', update)
    }else{
      return responseFormalize(200, 'GET_USER_FAIL', true, 'User not found')
    }
  }catch(err){
    logger(`get reset password error ${err}`)
    return responseFormalize(500, 'INTERNAL_SERVER_ERROR', true, 'Internal server error')
  }
}

const resetNewPassword = async (id, data) => {

  try {
    const user = await User.findOne({ _id: id })
    if(user){
      const now = new Data;
      if(user.resetToken == data.resetToken && user.resetTokenExpired > now ){
        const update = await user.updateOne({ password: data.password, resetToken: null })
        return responseFormalize(200, 'RESET_PASSWORD_SUCCESS', true)
      }else{
        return responseFormalize(200, 'INVALID_TOKEN', true)
      }
    }else{
      return responseFormalize(200, 'GET_USER_FAIL', true, 'User not found')
    }
  }catch(err){
    logger(`get reset password error ${err}`)
    return responseFormalize(500, 'INTERNAL_SERVER_ERROR', true, 'Internal server error')
  }
}

const getListUser = async () => {
  try {
    const user = await User.find({})
    if (!user)
      return responseFormalize(200, 'GET_LIST_USER_FAIL', true)
    else
      return responseFormalize(200, 'GET_LIST_USER_SUCCESS', true, 'User found', user)

  } catch (err) {
    logger(`Reset token error${err}`)
    return responseFormalize(500, 'INTERNAL_SERVER_ERROR', true, 'Internal server error');
  }
}

const searchListUser = async (query) => {
  try {
    const regex = `(${query.search})+`
    const user =  await User.find({fullName: new RegExp(regex, 'gmi') })
                            .skip((query.page -1)*query.limit)
                            .limit(Number(query.limit))
                            .sort()
    if (!user)
      return responseFormalize(200, 'GET_LIST_USER_FAIL', true)
    else {
      return responseFormalize(200, 'GET_LIST_USER_SUCCESS', true, user)
    }
  } catch (err) {
    logger(`Reset token error${err}`)
    return responseFormalize(500, 'INTERNAL_SERVER_ERROR', true, 'Internal server error');
  }
}

export { loginUser, getUserDetail, createUser, updateUser, removeUser, forgotPassword, resetNewPassword, getListUser, searchListUser };
