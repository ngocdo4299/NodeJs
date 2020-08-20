import { loginUser, getUserDetail, createUser } from './userController.js';

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
    console.log(result)
    // res.status(result.status).json(result);
}
