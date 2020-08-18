import { Order } from "../model/order.js";
import { responseFormalize } from "../helper/response.js";
import { getProductByName } from "./productController.js";
var data = {
    "userId": "5f3655bc20fc619d6f6531a4",
    "products": [
      { "productName": "Apple Salad", "quantity": 2 },
      { "productName": "Spaghetti", "quantity": 4 },
      { "productName": "Strawberry milk", "quantity": 1 },
      { "productName": "Cupcake", "quantity": 3 }
    ]
  };

//create order
let createNewOrder = (data, res) => {
  Order.create(data)
    .then((order) => {
      res.send(
        responseFormalize(201, "ORDER_CREATE_SUCCESS", false, order._id)
      );
    })
    .catch((err) => {
      res.send(responseFormalize(408, "ORDER_CREATE_FAIL", true, err));
    });
};

//get order Detail
let getOrderDetail = (id, res) => {
  Order.findOne({ _id: id })
    .then((order) => {
      var getOrderPrice = order.products.map((p) => {
        return getProductByName(p).then(function (results) {
          return {
            name: p.productName,
            quantity: p.quantity,
            price: p.quantity * results.price,
          };
        });
      });
      Promise.all(getOrderPrice)
        .then((result) => {
          res.send(
            responseFormalize(
              200,
              "GET_ORDER_DETAIL_SUCCESS",
              false,
              "List of products in order",
              result
            )
          );
        })
        .catch((err) => {
          res.send(responseFormalize(404, "GET_ORDER_FAIL", true, err));
        });
    })
    .catch((err) => {
      res.send(err);
    });
};

let getListOrderByUserID = (userId, res) => {
  Order.find({ userId: userId })
    .then((result) => {
      res.send(
        responseFormalize(
          200,
          "GET_LIST_ORDER_SUCCESS",
          false,
          "List of order by user: " + userId,
          result
        )
      );
    })
    .catch((err) => {
      res.send(responseFormalize(404, "GET_LIST_ORDER_FAIL", true, err));
    });
};

let updateOrder = (id, data, res) => {
    Order.findByIdAndUpdate({_id: id}, data).then(()=>{
        res.send(
            responseFormalize(
              200,
              "UPDATE_ORDER_SUCCESS",
              false,
            )
          );
    }).catch(err => {
        res.send(
            responseFormalize(
              404,
              "UPDATE_ORDER_FAIL",
              false,
              err
            )
          );
    })
};

let deleteOrder = (id, res) => {
  Order.findByIdAndDelete({ _id: id }).then(() => {
    res.send(
      responseFormalize(
        200,
        "DELETE_ORDER_SUCCESS",
        false
      )
    );
  }).catch(err=>{
    res.send(
        responseFormalize(
          404,
          "DELETE_ORDER_FAIL",
          true,
          err
        )
      );
  });
};

export {
  createNewOrder,
  getOrderDetail,
  getListOrderByUserID,
  updateOrder,
  deleteOrder,
};
