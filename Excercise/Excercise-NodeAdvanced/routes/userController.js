const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { verifyAccessToken } = require("../middleware/auth");
dotenv.config();
const router = express.Router();
const User = require("../models/user");

function getAllUsers(res) {
  User.find({})
    .then((user) => {
      res.send({ user });
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

//log into database
router.post("/login", function (req, res) {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (req.body.password == user.password) {
        jwt.sign(
          { user },
          process.env.TOKEN_ACCESS,
          { expiresIn: 60 * 60 },
          (err, token) => {
            if (err) {
              res.send({ err });
            } else res.send({ token: token });
          }
        );
      }
    })
    .catch((err) => {
      res.sendStatus(404).send(err);
    });
});

//get users list from database
router.get("/users", verifyAccessToken, function (req, res) {
  getAllUsers(res);
});

//get user detail from database
router.get("/user/:id", verifyAccessToken, function (req, res) {
  getUserDetail(req.params.id, res);
});

//add new into database
router.post("/users", verifyAccessToken, function (req, res) {
  if (Object.keys(req.body).length !== 0) {
    createUser(req.body).then((user) => {
      res.send(user);
    });
  } else {
    res.sendStatus(404);
  }
});

//update one in database
router.put("/user/:id", verifyAccessToken, function (req, res, next) {
  if (Object.keys(req.body).length !== 0) {
    updateUser(req.params.id, req.body, res);
  }
});

//delete one in database
router.delete("/user/:id", verifyAccessToken, function (req, res, next) {
  deleteUser(req.params.id, res);
});

module.exports = router;
