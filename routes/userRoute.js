import express from "express";
import dotenv from "dotenv";
import { createUser, getUserDetail, loginUser, updateUser, deleteUser } from "../controller/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";
dotenv.config();
const router = express.Router();

//sign in
router.post("/login", (req, res) => {
  loginUser(req.body, res)
});

// register
router.post("/", (req, res) => {
  createUser(req.body, res);
});

//get user detail
router.get("/:id", verifyToken, (req, res) => {
  getUserDetail(req.params.id, res);
});

//update user detail
router.put("/:id", verifyToken, (req, res) => {
  updateUser(req.params.id,req.body, res)
});

router.delete("/:id", verifyToken, (req,res)=>{
  deleteUser(req.params.id, res)
})

export { router };
