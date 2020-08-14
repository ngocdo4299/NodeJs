import {User} from '../model/user.js'

let getUserDetail = (id, res) => {
  User.findOne({ id: id })
    .then((user) => {
      res.send({ "Fullname": user.firstName+' '+user.lastName, "role": user.role});
    })
    .catch((err) => {
      res.sendStatus(404).send(err);
    });
}

let createUser = (newUser) => {
  return User.create(newUser);
}

export {
    getUserDetail,
    createUser
  };