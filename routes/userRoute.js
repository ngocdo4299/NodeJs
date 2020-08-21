import express from "express";
import { login, getDetail, registry, updateInfor, deleteUser} from '../controller/user/userApi.js';
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

//sign in
router.post("/users/login", login);

// register
router.post("/users/", registry)

//get user detail
router.get("/users/:id", verifyToken, getDetail)

//update user detail
router.put("/users/:id", verifyToken,updateInfor )

router.delete("/users/:id", verifyToken, deleteUser )

export default router;
