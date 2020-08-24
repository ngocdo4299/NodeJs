import {createNewOrder, getOrderDetail, getListOrderByUserID, updateOne, deleteOne} from './orderController.js' 

export const createOrder = async (req,res) => {
    try{
        const result = await createNewOrder(req.body)
        res.status(result.status).json(result);
    }catch(err){
        console.log(err)
        res.status(err.status).json(err);
    }
}

export const getOneOrder = async (req,res) => {
    try{
        const result = await getOrderDetail(req.params.id)
        res.status(result.status).json(result);
    }catch(err){
        console.log(err)
        res.status(err.status).json(err);
    }
}

export const getOrdersByUser = async (req,res) => {
    try{
        const result = await getListOrderByUserID(req.body)
        res.status(result.status).json(result);
    }catch(err){
        console.log(err)
        res.status(err.status).json(err);
    }
}

export const updateOrder = async (req,res) => {
    try{
        const result = await updateOne(req.params.id, req.body)
        res.status(result.status).json(result);
    }catch(err){
        console.log(err)
        res.status(err.status).json(err);
    }
}

export const deleteOrder = async (req,res) => {
    try{
        const result = await deleteOne(req.params.id)
        res.status(result.status).json(result);
    }catch(err){
        console.log(err)
        res.status(err.status).json(err);
    }
}

