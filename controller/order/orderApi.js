import { createNewOrder, getOrderDetail, getListOrderByUserID, updateOne, deleteOne } from './orderController.js';

export const createOrder = async (req, res) => {
  const result = await createNewOrder(req);
  res.status(result.status).json(result);
};

export const getOneOrder = async (req, res) => {
  const result = await getOrderDetail(req);
  res.status(result.status).json(result);
};

export const getOrdersByUser = async (req, res) => {
  const result = await getListOrderByUserID(req);
  res.status(result.status).json(result);
};

export const updateOrder = async (req, res) => {
  const result = await updateOne(req.params.id, req);
  res.status(result.status).json(result);
};

export const deleteOrder = async (req, res) => {
  const result = await deleteOne(req);
  res.status(result.status).json(result);
};

