import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js'

const router = express.Router();

//order status: Pending, Processing, Processed, Shipping, Shipped

//create order
router.post('/orders/', verifyToken, (req, res)=>{
    createNewOrder(req.body, res)
})

//view order
router.get('orders/:id', verifyToken, (req, res)=>{
    getOrderDetail(req.params.id, res)
})

//view list order by userId (userId trong body)
router.get('orders/', verifyToken, (req, res)=>{
    getListOrderByUserID(req.body.userId,res)
})

//update order while pending
router.put('orders/:id', verifyToken, (req, res)=>{
    updateOrder(req.params.id,req.body, res)
})

//delete order 
router.delete('orders/:id', verifyToken, (req, res)=>{
    deleteOrder(req.params.id, res)
})

export default router;

