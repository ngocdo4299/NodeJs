import express from "express";
import dotenv from "dotenv";
import { createUser,getUserDetail } from '../controller/userController.js'
import {User} from '../model/user.js'
dotenv.config();
const router = express.Router();

//sign in
router.post("/login", function (req, res) {
  User.verifyPassword(req.body, (token) => {
    res.send(token);
  });
});

// register
router.post("/", function (req, res) {
  if (Object.keys(req.body).length !== 0) {
    createUser(req.body).then((user) => {
      res.send(user);
    });
  } else {
    res.sendStatus(404);
  }
});

//get user detail from database verifyAccessToken
router.get("/:id", function (req, res) {
  getUserDetail(req.params.id, res);
});

export { router };
