import { Category } from "../model/category.js";
import { Product } from "../model/product.js";
import { responseFormalize } from "../helper/response.js";

let getProductByName = (product) => {
  return Product.findOne({ name: product.productName });
};

let getAllProducts = (res) => {
  Product.find({}).then(products =>{
    res.send(
      responseFormalize(200, "GET_LIST_PRODUCTs_SUCCESS", false, "", products)
    );
  }).catch(err => {
    res.send(
      responseFormalize(200, "GET_LIST_PRODUCT_FAIL", true, err)
    );
  })
}

let getProductDetail = (id, res) => {
  Product.findOne({ _id: id })
    .then((product) => {
      Category.findById({_id: product.categoryId}).then(category => {
        const result = {
          id: product._id,
          name: product.name,
          description: product.discription,
          category: category.name,
          price: product.price
        }
        res.send(
          responseFormalize(200, "GET_PRODUCT_SUCCESS", false, "", result)
        );
      })
      
    })
    .catch((err) => {
      res.send(responseFormalize(404, "GET_PRODUCT_FAILED", true, err));
    });
};

let addNewProduct = (body, res) => {
  Category.findOne({ name: body.category })
    .then((category) => {
      body.categoryId = category._id;
      Product.create(body)
        .then(() => {
          res.send(responseFormalize(201, "CREATE_PRODUCTS_SUCCESS", false));
        })
        .catch((err) => {
          res.send(responseFormalize(404, "CREATE_PRODUCTS_FAILED", true));
        });
    })
    .catch((err) => {
      res.send(responseFormalize(404, "CATEGORY_NOT_FOUND", true, err));
    });
};

let updateProduct = (id, data, res) => {
  if(data.hasOwnProperty('category')){
    Category.findOne({ name: data.category })
    .then((category) => {
      data.categoryId = category._id;
      Product.findByIdAndUpdate({_id: id},data)
        .then(() => {
          res.send(responseFormalize(201, "UPDATE_PRODUCTS_SUCCESS", false));
        })
        .catch((err) => {
          res.send(responseFormalize(404, "UPDATE_PRODUCTS_FAILED", true, err));
        });
    })
    .catch((err) => {
      res.send(responseFormalize(404, "CATEGORY_NOT_FOUND", true, err));
    });

  }else{
    Product.findByIdAndUpdate({_id: id}, data)
    .then(() => {
      res.send(responseFormalize(200, "UPDATE_PRODUCT_SUCCESS", false));
    })
    .catch((err) => {
      res.send(responseFormalize(404, "UPDATE_PRODUCT_FAILED", true, err));
    });
  }
  
};

let deleteProduct = (id, res) => {
  Product.findByIdAndDelete(id).then((product)=>{
    res.send(responseFormalize(200, "DELETE_PRODUCT_SUCCESS", false, product));
  }).catch( err =>{
    res.send(responseFormalize(404, "DELETE_PRODUCT_FAIL", true, err));
  })
}
export { getProductDetail, addNewProduct, updateProduct, getProductByName, deleteProduct, getAllProducts};
