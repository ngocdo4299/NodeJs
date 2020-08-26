import { loginUser, getUserDetail, createUser, updateUser, removeUser, forgotPassword, resetNewPassword, getListUser, searchListUser} from './userController.js';

export const login = async (req, res) => {
    const result = await loginUser(req.body);
    res.status(result.status).json(result);
}

export const getDetail = async (req, res) => {
    const result = await getUserDetail(req.params.id);
    res.status(result.status).json(result);
}

export const registry = async (req, res) => {
    const result = await createUser(req.body);
    res.status(result.status).json(result);
}

export const updateInfor = async (req, res) => {
    const result = await updateUser(req.params.id, req.body);
    res.status(result.status).json(result);
}

export const deleteUser = async (req, res) => {
    const result = await removeUser(req.params.id, req.body);
    res.status(result.status).json(result);
}

export const getResetPassword = async (req, res)=>{
    const result = await forgotPassword(req.body);
    res.status(result.status).json(result);
}

export const resetPassword = async (req, res)=>{
    const result = await resetNewPassword(req.params.id, req.body);
    res.status(result.status).json(result);
}

export const getList = async (req, res)=>{
    const result = await getListUser();
    res.status(result.status).json(result);
}

export const searchUser = async (req, res)=>{
    const result = await searchListUser(req.params.search);
    res.status(result.status).json(result);
}