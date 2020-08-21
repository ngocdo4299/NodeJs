import express from "express";
import { createCategory, getAllCategory, getOneCategory, updateCategory, getProductsCategory} from '../controller/category/categoryApi.js'
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

// get list of category
router.get("/category/", verifyToken, getAllCategory )

//get products in category
router.get("/category/:id", verifyToken, getProductsCategory )

// create new category
router.post("/category/", verifyToken, createCategory)

//update category
router.put("/category/:id", verifyToken, updateCategory)

//delete category
router.delete("/category/:id",verifyToken, (req, res) =>{
  deleteCategory(req.params.id, res)
})

export default router;
