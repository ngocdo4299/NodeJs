import express from 'express';
import dotenv from 'dotenv';
import { addNewProduct } from '../controller/productController.js'
import {verifyToken} from '../middleware/verifyToken.js'
dotenv.config();
const router = express.Router();

// create new product
router.post("/",verifyToken, function(req,res){
    addNewProduct(req.body, res)
})

//delete product

//update product

//get product detail

export {router};
