import { User } from '../../model/user.js';
import { responseFormalize } from "../../helper/response.js";

const loginUser = (data) => {
  return new Promise((resolve, reject) => {
    User.verifyPassword(data, (token) => {
      if (token.error) {
        return reject(responseFormalize(203, 'TOKEN_GENERATE_FAILED', true, token.data));
      } else {
        return resolve(responseFormalize( 200,'TOKEN_GENERATE_SUCCESS','','You\'re logged in!',token.data));
      }
    });
  });
};

const getUserDetail = (id) => {
  return new Promise((resolve, reject)=>{
    User.findOne({_id: id, status: 'active'})
    .then((user) => {
      if(user){
        user.password = undefined
        return resolve(responseFormalize(200, 'GET_USER_DETAIL_SUCCESS','','', user))
      }else{
        return resolve(responseFormalize(200, 'GET_USER_DETAIL_FAIL',true,'User not found'))
      }
    })
    .catch((err) => {
      console.log(`Get user detail ${err}`)
      return reject(responseFormalize(500,'INTERNAL_SERVER_ERROR',true,'Internal server error'))
    });
  })
};


const createUser = async (newUser) => {
  try {
    const findExistUser = await  User.findOne({ userName: newUser.userName, status: 'active' })
    if(!findExistUser){
      const user = await User.create(newUser)
      return responseFormalize(200, 'CREATE_NEW_USER_SUCCESS','','',user._id)
    }
    else
      return responseFormalize(200, 'USER_EXISTED', true)
  }catch(err) {
    console.log(`Create user error ${err}`)
    return responseFormalize(500,'INTERNAL_SERVER_ERROR',true,'Internal server error')
  }
};

const updateUser = (id, data) => {
  return new Promise((resolve, reject)=>{
    User.findOneAndUpdate({_id: id, status: 'active'}, data)
    .then((user) => {
      resolve(responseFormalize(200, "UPDATE_USER_SUCCESS", false, user._id));
    })
    .catch((err) => {
      console.log(`Update user error${err}`)
      reject(responseFormalize(500,'INTERNAL_SERVER_ERROR',true,'Internal server error'));
    });
  }) 
};

const removeUser = (id) => {
  return new Promise((resolve, reject)=>{
    User.findByIdAndUpdate(id, { status: "deleted" })
    .then(() => {
      resolve(responseFormalize(200, "DELETE_USER_SUCCESS", false));
    })
    .catch((err) => {
      console.log(`Delete user error${err}`)
      reject(responseFormalize(500,'INTERNAL_SERVER_ERROR',true,'Internal server error'));
    });
  }) 
};

export { loginUser, getUserDetail, createUser, updateUser, removeUser };
