import express from 'express';
import { login, getDetail, registry, updateInfor, deleteUser, getResetPassword, resetPassword, searchUser } from '../controller/user/userApi.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

//sign in
router.post('/users/login', login);

// register
router.post('/users/', registry);

// get reset password
router.get('/users/reset', getResetPassword);

// change reset password
router.post('/users/reset/:id', resetPassword);

//get user detail
router.get('/users/:id', verifyToken, getDetail);

//update user detail
router.put('/users/:id', verifyToken, updateInfor );

//delete user
router.delete('/users/:id', verifyToken, deleteUser );

// search user
router.post('/users/:search', verifyToken, searchUser);

export default router;
