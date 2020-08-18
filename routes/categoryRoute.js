import express from "express";
import dotenv from "dotenv";
import {
  getListProductByCategory,
  addNewCategory,
  getListCategory,
  updateCategory
} from "../controller/categoryController.js";
import { verifyToken } from "../middleware/verifyToken.js";
dotenv.config();
const router = express.Router();

// get list of category
router.get("/", verifyToken, (req, res) => {
  getListCategory(res);
});

//get products in category
router.get("/:id", verifyToken, (req, res) => {
  getListProductByCategory(req.params.id, res);
});

// create new category
router.post("/", verifyToken, (req, res) => {
  addNewCategory(req.body, res);
});

//update category name by name
router.put("/:id", verifyToken, (req, res) => {
  updateCategory(req.params.id, req.body, res);
});

export { router };
