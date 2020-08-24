import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js'
import { createOrder, getOneOrder, getOrdersByUser, updateOrder, deleteOrder } from '../controller/order/orderApi.js';

const router = express.Router();

//order status: Pending, Processing, Processed, Shipping, Shipped

//create order
router.post('/orders/', verifyToken, createOrder )

//view order
router.get('/orders/:id', verifyToken, getOneOrder )

//view list order by userId (userId trong body)
router.get('/orders/', verifyToken, getOrdersByUser )

//update order while pending
router.put('/orders/:id', verifyToken, updateOrder )

//delete order 
router.delete('/orders/:id', verifyToken,  deleteOrder )

export default router;

