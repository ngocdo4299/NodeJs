import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { createProduct, getAllProducts, getOneProduct, deleteOneProduct, updateOneProduct } from '../controller/product/productApi.js';

const router = express.Router();

//get list product
router.get('/products/', verifyToken, getAllProducts );

// create new product
router.post('/products/', verifyToken, createProduct);

//get product detail
router.get('/products/:id', verifyToken, getOneProduct );

//update product
router.put('/products/:id', verifyToken, updateOneProduct );

//delete product
router.delete('/products/:id', verifyToken, deleteOneProduct );

export default router;
