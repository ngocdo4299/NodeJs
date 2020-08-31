import { Category } from '../../model/category.js';
import { Product } from '../../model/product.js';
import { responseFormalize } from '../../helper/response.js';
import { logger } from '../../helper/logger.js';

const addNewCategory = async (req) => {
  const body = req.body;
  if (!body.name && !body.createdBy) {
    return responseFormalize(404, 'CREATE_CATEGORY_FAIL', true, 'Missing required fields!');
  } else {
    try {
      const category = await Category.create(body);
      if (!category) { return responseFormalize(404, 'CREATE_CATEGORY_FAIL', true); }
      else { return responseFormalize(201, 'ADD_CATEGORY_SUCCESS', false, '', category._id); }
    } catch (err) {
      logger(err);

      return responseFormalize(500, 'INTERNAL_SERVER_ERROR', true, 'Internal server error');
    }
  }

};

const getListProductByCategory = async (id) => {
  try {
    const category = await Category.findById(id);
    if (!category) {
      return responseFormalize(404, 'GET_PRODUCTS_BY_CATEGORY_FAILED', true, 'Category not found');
    }
    const products = await Product.find({ categoryId: category._id });

    return responseFormalize(200, 'GET_PRODUCTS_BY_CATEGORY_SUCCESS', false, '', products);
  } catch (err) {
    logger(err);

    return responseFormalize(500, 'INTERNAL_SERVER_ERROR', true, 'Internal server error');
  }
};

const getListCategory = async () => {
  try {
    const categories = await Category.find({});
    if (!categories) { return responseFormalize(404, 'GET_CATEGORIES_FAILED', true); }
    else { return responseFormalize(200, 'GET_CATEGORIES_SUCCESS', false, '', categories.map((e) => ({ id: e._id, name: e.name }))); }
  } catch (err) {
    logger(err);

    return responseFormalize(500, 'INTERNAL_SERVER_ERROR', true, 'Internal server error');
  }
};

const updateOne = async (req) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const category = await Category.findOneAndUpdate({ _id: id }, data);
    if (!category) { return responseFormalize(404, 'UPDATE_CATEGORY_FAIL', true); }
    else { return responseFormalize(202, 'UPDATE_CATEGORY_SUCCESS', false); }
  } catch (err) {
    logger(err);
    responseFormalize(500, 'INTERNAL_SERVER_ERROR', true, 'Internal server error');
  }
};

const deleteOne = async (id) => {
  try {
    const category = await Category.findOneAndDelete({ _id: id });
    if (!category) {
      return responseFormalize(400, 'DELETE_CATEGORY_FAIL', true);
    }
    const products = await Product.find({ categoryId: id });
    products.forEach(p => {
      Product.findOneAndUpdate({ _id: p._id }, { categoryId: '' });
    });

    return responseFormalize(200, 'DELETE_CATEGORY_SUCCESS', false);
  } catch (err) {
    logger(err);

    return responseFormalize(500, 'INTERNAL_SERVER_ERROR', true, 'Internal server error');
  }
};
export {
  getListProductByCategory,
  addNewCategory,
  getListCategory,
  updateOne,
  deleteOne,
};
