import express from "express";
import dotenv from "dotenv";
// import { createUser, getUserDetail, loginUser, updateUser, deleteUser } from "../controller/userController.js";
import { login, getDetail, registry } from '../controller/user/userApi.js';
import { verifyToken } from "../middleware/verifyToken.js";

dotenv.config();
const router = express.Router();

//sign in
router.post("/users/login", login);

// register
router.post("/users/", registry)

//get user detail
router.get("/users/:id", verifyToken, getDetail)

//update user detail
router.put("/users/:id", verifyToken, (req, res) => {
  updateUser(req.params.id,req.body, res)
});

router.delete("/users/:id", verifyToken, (req,res)=>{
  deleteUser(req.params.id, res)
})

export default router;
