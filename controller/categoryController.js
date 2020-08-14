import { Category } from "../model/category.js";
import { Product } from "../model/product.js";
import { responseFormalize } from "../helper/response.js"

let addNewCategory = (body, res) =>{
    Category.create(body).then ((mess)=>{
        res.send(responseFormalize(201, "ADD_CATEGORY_SUCCESS", false))
    }).catch((error) =>{
        res.send(responseFormalize(408, "ADD_CATEGORY_FAILED",true, error))
    })
}

let getListProductByCategory = (id, res)=>{
  Product.find({categoryId: id}).then(products => {
    products = products.map(p =>{
      return {Name: p.name, Price: p.price}
    })
    res.send(responseFormalize(200, "GET_PRODUCTS_BY_CATEGORY_SUCCESS", false,'',products))
  }).catch(err=>{
    res.send(responseFormalize(404, "GET_PRODUCTS_BY_CATEGORY_FAILED", true,err))
  })
}

let getListCategory = (res)=>{
  Category.find({})
    .then((category) => {
        category = category.map( c => {
          return c.name
        })
        res.send(responseFormalize(200, "GET_CATEGORIES_SUCCESS", false,'',category));
      })
      .catch((err) => {
        res.send(responseFormalize(404, "GET_CATEGORIES_FAILED", true,err));
      });
}

export {getListProductByCategory, addNewCategory, getListCategory};
