import {
  getListProductByCategory,
  addNewCategory,
  getListCategory,
  updateOne,
  deleteOne,
} from './categoryController.js';

export const createCategory = async (req, res) => {
  const result = await addNewCategory(req);
  res.status(result.status).json(result);
};

export const getProductsCategory = async (req, res) => {
  const result = await getListProductByCategory(req.params.id);
  res.status(result.status).json(result);
};

export const getAllCategory = async (req, res) => {
  const result = await getListCategory();
  res.status(result.status).json(result);
};

export const getOneCategory = async (req, res) => {
  const result = await getListProductByCategory(req.params.id);
  res.status(result.status).json(result);
};

export const updateCategory = async (req, res) => {
  const result = await updateOne(req);
  res.status(result.status).json(result);
};

export const deleteCategory = async (req, res) => {
  const result = await deleteOne(req.params.id);
  res.status(result.status).json(result);
};