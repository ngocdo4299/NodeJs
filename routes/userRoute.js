import express from "express";
import dotenv from "dotenv";
import { createUser,getUserDetail } from '../controller/userController.js'
import {User} from '../model/user.js'
import {verifyToken} from '../middleware/verifyToken.js'
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
    createUser(req.body, res)
});

//get user detail
router.get("/:id", verifyToken, function (req, res) {
  getUserDetail(req.params.id, res);
});

export { router };
