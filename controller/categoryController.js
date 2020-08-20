import { Category } from "../model/category.js";
import { Product } from "../model/product.js";
import { responseFormalize } from "../helper/response.js";

let addNewCategory = (body, res) => {
  Category.create(body)
    .then((mess) => {
      res.send(responseFormalize(201, "ADD_CATEGORY_SUCCESS", false));
    })
    .catch((error) => {
      res.send(responseFormalize(408, "ADD_CATEGORY_FAILED", true, error));
    });
};

let getListProductByCategory = (id, res) => {
  Category.findById(id).then(category =>{
    if(category !==  null)
      Product.find({ categoryId: category._id })
      .then((products) => {
        products = products.map((p) => {
          return { Name: p.name, Price: p.price };
        });
        res.send(
          responseFormalize(
            200,
            "GET_PRODUCTS_BY_CATEGORY_SUCCESS",
            false,
            "",
            products
          )
        );
      })
      .catch((err) => {
        res.send(
          responseFormalize(404, "GET_PRODUCTS_BY_CATEGORY_FAILED", true, err)
        )
      });
    else{
      res.send(
        responseFormalize(404, "GET_PRODUCTS_BY_CATEGORY_FAILED", true, "Category not found")
      )
    }
  })
  
};

let getListCategory = (res) => {
  Category.find({})
    .then((category) => {
      res.send(
        responseFormalize(200, "GET_CATEGORIES_SUCCESS", false, "", category)
      );
    })
    .catch((err) => {
      res.send(responseFormalize(404, "GET_CATEGORIES_FAILED", true, err));
    });
};

let updateCategory = (id, data, res) => {
  if(Object.keys(data).length > 0){
    Category.findByIdAndUpdate({ _id: id }, data)
    .then(() => {
      res.send(responseFormalize(202, "UPDATE_CATEGORY_SUCCESS", false));
    })
    .catch((err) => {
      res.send(responseFormalize(404, "UPDATE_CATEGORY_FAIL", true, err));
    });
  }else{
    res.send(responseFormalize(400,"NO_FIELD_DETECT", true))
  }
};

let deleteCategory = (id, res) => {
  Category.findOneAndDelete({_id: id}).then(()=>{
    Product.find({categoryId: id}).then(products => {
      products.forEach( p=>{
        Product.findOneAndUpdate({_id: p._id}, {categoryId: ''})
      })
    }).finally(()=>{
      res.send(responseFormalize(200,"DELETE_CATEGORY_SUCCESS", false))
    })
  }).catch( err => {
    res.send(responseFormalize(400,"DELETE_CATEGORY_FAIL", true, err))
  })
}
export {
  getListProductByCategory,
  addNewCategory,
  getListCategory,
  updateCategory,
  deleteCategory
};
