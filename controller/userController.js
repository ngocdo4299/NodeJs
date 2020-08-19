import { User } from "../model/user.js";
import { responseFormalize } from "../helper/response.js";

let loginUser = (data, res) => {
  User.verifyPassword(data, (token) => {
    if (token.error) {
      res.send(
        responseFormalize(203, "TOKEN_GENERATE_FAILED", true, token.data)
      );
    } else {
      res.send(
        responseFormalize(
          200,
          "TOKEN_GENERATE_SUCCESS",
          false,
          "You're logged in!",
          token.data
        )
      );
    }
  });
};

let getUserDetail = (id, res) => {
  User.findOne({_id: id, status: 'active'})
    .then((user) => {
        res.send(
          responseFormalize(
            200,
            "GET_USER_SUCCESS",
            false,
            "Done",
            user.fullName
          )
        );
    })
    .catch((err) => {
      res.send(
        responseFormalize(204, "GET_USER_FAILED", true, "User not found")
      );
    });
};

let registryUser = (newUser, res) => {
  User.create(newUser)
    .then((user) => {
      res.send(
        responseFormalize(201, "ADD_USER_SUCCESS", false, "Done", user._id)
      );
    })
    .catch((err) => {
      res.send(
        responseFormalize(201, "ADD_USER_FAIL", true, "Create user failed", err)
      );
    });
};

let createUser = (newUser, res) => {
  if (Object.keys(newUser).length !== 0) {
    User.findOne({ username: newUser.username })
      .then((user) => {
        if (user.status === "active" && user !== null)
          res.send(
            responseFormalize(201, "ADD_USER_FAIL", true, "Username existed")
          );
        else {
          registryUser(newUser, res);
        }
      })
      .catch((err) => {
        registryUser(newUser, res);
      });
  } else {
    res.send(responseFormalize(400, "ADD_USER_FAILED", true, "Bad request"));
  }
};

let updateUser = (id, data, res) => {
  User.findOneAndUpdate({_id: id, status: 'active'}, data)
    .then((user) => {
      res.send(responseFormalize(200, "UPDATE_USER_SUCCESS", false, user._id));
    })
    .catch((err) => {
      res.send(responseFormalize(404, "UPDATE_USER_FAILED", true, err));
    });
};

let deleteUser = (id, res) => {
  User.findByIdAndUpdate(id, { status: "deleted" })
    .then(() => {
      res.send(responseFormalize(200, "DELETE_USER_SUCCESS", false));
    })
    .catch((err) => {
      res.send(responseFormalize(404, "DELETE_USER_FAIL", true, err));
    });
};

export { loginUser, getUserDetail, createUser, updateUser, deleteUser };
