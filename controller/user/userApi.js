import { loginUser, getUserDetail, createUser, updateUser, removeUser } from './userController.js';

export const login = async (req, res) => {
    try{
        const result = await loginUser(req.body);
        res.status(result.status).json(result);
    }catch(err){
        console.log(err)
        res.status(err.status).json(err);
    }
    
}

export const getDetail = async (req, res) => {
    try{
        const result = await getUserDetail(req.params.id);
        res.status(result.status).json(result);
    }catch(err){
        console.log(err)
        res.status(err.status).json(err);
    }
}

export const registry = async (req, res) => {
    try{
        const result = await createUser(req.body);
        res.status(result.status).json(result);
    }catch(err){
        console.log(err)
        res.status(err.status).json(err);
    }
}

export const updateInfor = async (req, res) =>{
    try{
        const result = await updateUser(req.params.id, req.body);
        res.status(result.status).json(result);
    }catch(err){
        console.log(err)
        res.status(err.status).json(err);
    }
}

export const deleteUser = async (req, res) =>{
    try{
        const result = await removeUser(req.params.id, req.body);
        res.status(result.status).json(result);
    }catch(err){
        console.log(err)
        res.status(err.status).json(err);
    }
}
