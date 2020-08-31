import { addOneProduct, getAll, getOne, updateOne, deleteOne } from './productController.js';

export const createProduct = async (req, res) => {
  const result = await addOneProduct(req);
  res.status(result.status).json(result);
};

export const getAllProducts = async (req, res) => {

  const result = await getAll();
  res.status(result.status).json(result);
};

export const getOneProduct = async (req, res) => {
  const result = await getOne(req);
  res.status(result.status).json(result);
};

export const updateOneProduct = async (req, res) => {
  const result = await updateOne(req);
  res.status(result.status).json(result);
};

export const deleteOneProduct = async (req, res) => {
  const result = await deleteOne(req);
  res.status(result.status).json(result);
};

