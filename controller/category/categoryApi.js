import {
    getListProductByCategory,
    addNewCategory,
    getListCategory,
    updateOne,
    deleteOne
  } from "./categoryController.js";

export const createCategory = async (req, res) => {
    try{
        const result = await addNewCategory(req.body)
        res.status(result.status).json(result);
    }catch(err){
        console.log(err)
        res.status(err.status).json(err);
    }
}

export const getProductsCategory = async (req, res) => {
    try{
        const result = await getListProductByCategory(req.params.id)
        res.status(result.status).json(result);
    }catch(err){
        console.log(err)
        res.status(err.status).json(err);
    }
}

export const getAllCategory = async (req, res) => {
    try{
        const result = await getListCategory()
        res.status(result.status).json(result);
    }catch(err){
        console.log(err)
        res.status(err.status).json(err);
    }
}

export const getOneCategory = async (req, res) => {
    try{
        const result = await getListProductByCategory(req.params.id)
        res.status(result.status).json(result);
    }catch(err){
        console.log(err)
        res.status(err.status).json(err);
    }
}

export const updateCategory = async (req, res) => {
    try{
        const result = await updateOne(req.params.id, req.body)
        res.status(result.status).json(result);
    }catch(err){
        console.log(err)
        res.status(err.status).json(err);
    }
}

export const deleteCategory = async (req, res) => {
    try{
        const result = await deleteOne(req.params.id)
        res.status(result.status).json(result);
    }catch(err){
        console.log(err)
        res.status(err.status).json(err);
    }
}