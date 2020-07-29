const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { verifyAccessToken } = require("../middleware/auth");
const {getAllUsers, getUserDetail, createUser, updateUser, deleteUser} = require("../helper/userService")
const router = express.Router();
const User = require("../models/user");

//log into database
router.post("/login", function (req, res) {
  User.verifyPassword(req.body, (token)=>{
      res.send(token)
  })
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
