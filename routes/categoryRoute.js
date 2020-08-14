import express from 'express';
import dotenv from 'dotenv';
import {getListProductByCategory, addNewCategory, getListCategory} from '../controller/categoryController.js'
import {verifyToken} from '../middleware/verifyToken.js'
dotenv.config();
const router = express.Router();

// get list of category
router.get("/", verifyToken, function (req,res) {
  getListCategory(res)
  });

//get products in category
router.get("/:id", verifyToken, function (req, res) {
    getListProductByCategory(req.params.id, res)
})

// create new category
router.post("/", verifyToken, function (req, res){
    addNewCategory(req.body, res)
})

//delete category


export {router};