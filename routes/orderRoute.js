import express from 'express';
import dotenv from 'dotenv';
import { verifyToken } from '../middleware/verifyToken.js'
import {createNewOrder, getOrderDetail, getListOrderByUserID, updateOrder, deleteOrder} from '../controller/orderController.js' 
dotenv.config();
const router = express.Router();

//order status: Pending, Processing, Processed, Shipping, Shipped

//create order
router.post('/', verifyToken, (req, res)=>{
    //validation

    //after validation
    createNewOrder(req.body, res)
})

//view order
router.get('/:id', verifyToken, (req, res)=>{
    getOrderDetail(req.params.id, res)
})

//view list order by userId (userId trong body)
router.get('/', verifyToken, (req, res)=>{
    getListOrderByUserID(req.body.userId,res)
})

//update order while pending
router.put('/:id', verifyToken, (req, res)=>{
    updateOrder(req.params.id,req.body, res)
})

//delete order 
router.delete('/:id', verifyToken, (req, res)=>{
    deleteOrder(req.params.id, res)
})

export {router};

