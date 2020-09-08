import { Category } from '../../model/category.js';
import { Product } from '../../model/product.js';
import { responseFormalize, errorResponse } from '../../helper/response.js';
import { logger } from '../../helper/logger.js';

export const getAll = async () => {
  try {
    const products = await Product.find({}, { 'name': 1, '_id': 1, 'price': 1 }) ;
    if (!products) {
      return responseFormalize(200, 'GET_LIST_PRODUCT_FAIL', true);
    }
    else {
      return responseFormalize(200, 'GET_LIST_PRODUCTS_SUCCESS', false, '', products);
    }
  } catch (err) {
    logger(err);

    return errorResponse;
  }
};

export const getOne = async (req) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({ _id: id });
    if (!product) {
      return responseFormalize(200, 'GET_PRODUCT_FAIL', true);
    }
    else {
      const category = await Category.findOne({ _id: product.categoryId });

      return responseFormalize(200, 'GET_PRODUCT_SUCCESS', false, '', { id: product._id, name: product.name, category: category.name });
    }
  } catch (err) {
    logger(err);

    return errorResponse;
  }
};

export const addOneProduct = async (req) => {
  try {
    const data = req.body;
    const category = await Category.findById(data.categoryId);
    if (!category) {
      return responseFormalize(404, 'ADD_PRODUCT_FAIL', true, 'Category not found');
    }
    else {
      const product = await Product.create(data);

      return responseFormalize(200, 'ADD_PRODUCT_SUCESS', false, '', product._id);
    }
  } catch (err) {
    logger(err);

    return errorResponse;
  }
};

export const updateOne = async ( req ) => {
  try {
    const data = req.body;
    const id = req.params.id;
    const product = await Product.findOneAndUpdate({ _id: id }, data);
    if (!product) {
      return responseFormalize(404, 'UPDATE_PRODUCTS_FAILED', true);
    }
    else {
      return responseFormalize(201, 'UPDATE_PRODUCTS_SUCCESS', false);
    }
  } catch (err) {
    logger(err);

    return errorResponse;
  }
};

export const deleteOne = async (req) => {
  try {
    const id = req.params.id;
    const product = await Product.findOneAndDelete({ _id: id });
    if (!product) {
      return responseFormalize(404, 'DELETE_PRODUCT_FAIL', true);
    }
    else {
      return responseFormalize(200, 'DELETE_PRODUCT_SUCCESS', false, product._id);
    }
  } catch (err) {
    logger(err);

    return errorResponse;
  }
};
