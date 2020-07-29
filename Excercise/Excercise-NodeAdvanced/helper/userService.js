const User = require("../models/user");

function getAllUsers(res) {
  User.find({})
    .then((users) => {
      users = users.map( user => {
        return { "Fullname": user.firstName+' '+user.lastName, "role": user.role}
      })
      res.send(users);
    })
    .catch((err) => {
      res.sendStatus(404).send(err);
    });
}

function getUserDetail(id, res) {
  User.findById({ id: id })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.sendStatus(404).send(err);
    });
}

function createUser(newUser) {
  return User.create(newUser);
}

function updateUser(id, newData, res) {
  User.findByIdAndUpdate({ id: id }, newData)
    .then(() => {
      User.findById({ id: id }).then((user) => {
        res.send(user);
      });
    })
    .catch((err) => {
      res.sendStatus(404).send(err);
    });
}

function deleteUser(id, res) {
  User.findByIdAndRemove({ id: id })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.sendStatus(404).send(err);
    });
}

module.exports = {
    getAllUsers: getAllUsers,
    getUserDetail: getUserDetail,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser
  };