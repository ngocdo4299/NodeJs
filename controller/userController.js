import { User } from "../model/user.js";
import { responseFormalize } from "../helper/response.js"
let getUserDetail = (id, res) => {
  User.findById({ _id: id })
    .then((user) => {
      res.send(responseFormalize(200, "GET_USER_SUCCESS", false, "Done", user.fullName));
    })
    .catch((err) => {
      res.send(responseFormalize(204, "GET_USER_FAILED", true, "User not found"));
    });
};

let createUser = (newUser, res) => {
  if (Object.keys(newUser).length !== 0) {
    User.create(newUser).then((user) => {
      res.send(responseFormalize(201, "ADD_USER_SUCCESS", false, "Done", user.fullName));
    });
  } else {
    res.send(responseFormalize(400, "ADD_USER_FAILED", true, "Bad request"));
  }
};
export { getUserDetail, createUser };
