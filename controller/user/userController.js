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
      return resolve(responseFormalize(200, 'GET_USER_DETAIL_SUCCESS','','', user))
    })
    .catch((err) => {
      console.log(err)
      return reject(responseFormalize(204, 'GET_USER_FAILED',true, 'User not found'))
    });
  })
};


const createUser = async (newUser) => {
  try {
    const findExistUser = await  User.findOne({ username: newUser.username, status: 'active' })
    if(!findExistUser)
      User.create(newUser).then((user)=>{
        return responseFormalize(200, 'CREATE_NEW_USER_SUCCESS','','',user)
      })
    else
      return responseFormalize(200, 'USER_EXISTED')
  }catch(err) {
    console.log(err)
    return responseFormalize(500,'INTERNAL_SERVER_ERROR',true,'Internal server error')
  }
};

const updateUser = (id, data, res) => {
  User.findOneAndUpdate({_id: id, status: 'active'}, data)
    .then((user) => {
      res.send(responseFormalize(200, "UPDATE_USER_SUCCESS", false, user._id));
    })
    .catch((err) => {
      res.send(responseFormalize(404, "UPDATE_USER_FAILED", true, err));
    });
};

const deleteUser = (id, res) => {
  User.findByIdAndUpdate(id, { status: "deleted" })
    .then(() => {
      res.send(responseFormalize(200, "DELETE_USER_SUCCESS", false));
    })
    .catch((err) => {
      res.send(responseFormalize(404, "DELETE_USER_FAIL", true, err));
    });
};

export { loginUser, getUserDetail, createUser, updateUser, deleteUser };
