import { Category } from "../model/category.js";
import { Product } from "../model/product.js";

let getProductDetail = (id, res) => {
  Product.find({ categoryId: id })
    .then((products) => {
      res.send(responseFormalize(200, "GET_PRODUCT_SUCCESS", false,'', products));
    })
    .catch((err) => {
      res.send(responseFormalize(404, "GET_PRODUCT_FAILED", true, err));
    });
};

let addNewProduct = (body, res) => {
    Category.findOne({name: body.category}).then((category)=>{
        body.categoryId = category._id
        Product.create(body).then(()=>{
            res.send(responseFormalize(201, "CREATE_PRODUCTS_SUCCESS", false))
        }).catch(err=>{
            res.send(responseFormalize(404, "CREATE_PRODUCTS_FAILED", true))
        })
    }).catch(err=>{
      res.send(responseFormalize(404, "CATEGORY_NOT_FOUND", true, err))
    })
};

let updateProduct = (body, res) => {
  Category.findOne({name: body.category}).then((category)=>{
      body.categoryId = category._id
      Product.create(body).then(()=>{
          res.send(responseFormalize(200, "UPDATE_PRODUCT_SUCCESS", false))
      }).catch(err=>{
          res.send(responseFormalize(404, "UPDATE_PRODUCT_FAILED", true, err))
      })
  })
};

export { getProductDetail, addNewProduct, updateProduct };
