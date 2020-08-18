import express from 'express';
import dotenv from 'dotenv';
import { addNewProduct, getProductDetail, updateProduct, deleteProduct, getAllProducts } from '../controller/productController.js'
import {verifyToken} from '../middleware/verifyToken.js'
dotenv.config();
const router = express.Router();

//get list product
router.get("/",verifyToken, (req, res)=>{
    getAllProducts(res)
})

// create new product
router.post("/",verifyToken,(req,res) => {
    addNewProduct(req.body, res)
})

//delete product
router.put("/:id", verifyToken, (req,res) => {
    updateProduct(req.params.id, req.body, res)
})

//update product
router.delete("/:id", verifyToken, (req, res) => {
    deleteProduct(req.params.id, res)
})

//get product detail
router.get("/:id", verifyToken, (req,res) => {
    getProductDetail(req.params.id,res)
})
export {router};
