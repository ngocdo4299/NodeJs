import { addOneProduct, getAll, getOne, updateOne, deleteOne } from './productController.js'

export const createProduct = async (req, res) => {
    try{
        const result = await addOneProduct(req.body)
        res.status(result.status).json(result);
    }catch(err){
        console.log(err)
        res.status(err.status).json(err);
    }
}

export const getAllProducts = async (req, res) => {
    try{
        const result = await getAll()
        res.status(result.status).json(result);
    }catch(err){
        console.log(err)
        res.status(err.status).json(err);
    }
}

export const getOneProduct = async (req, res) => {
    try{
        const result = await getOne(req.params.id)
        res.status(result.status).json(result);
    }catch(err){
        console.log(err)
        res.status(err.status).json(err);
    }
}

export const updateOneProduct = async (req, res) => {
    try{
        const result = await updateOne(req.params.id, req.body)
        res.status(result.status).json(result);
    }catch(err){
        console.log(err)
        res.status(err.status).json(err);
    }
}

export const deleteOneProduct = async (req, res) => {
    try{
        const result = await deleteOne(req.params.id)
        res.status(result.status).json(result);
    }catch(err){
        console.log(err)
        res.status(err.status).json(err);
    }
}

