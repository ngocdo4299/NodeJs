import express from 'express';
import { login, getDetail, registry, updateInfor, deleteUser, getResetPassword, resetPassword, searchUser } from '../controller/user/userApi.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

//sign in
router.post('/users/login', login);

// register
router.post('/users/', registry);

// change reset password
router.post('/users/reset/:id', resetPassword);

// get reset password
router.get('/users/reset', getResetPassword);

// search user
router.get('/users/search', verifyToken, searchUser);

//get user detail
router.get('/users/:id', verifyToken, getDetail);

//update user detail
router.put('/users/:id', verifyToken, updateInfor );

//delete user
router.delete('/users/:id', verifyToken, deleteUser );



export default router;
