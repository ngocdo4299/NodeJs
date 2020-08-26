import { Order } from "../../model/order.js";
import { responseFormalize } from "../../helper/response.js";
import { User } from "../../model/user.js";
import { createErrorLog } from '../../helper/logger.js'

//create order
const createNewOrder = async (data) => {
  try {
    const user = await User.findOne({ _id: data.userId, status: "active" });
    if (!user) return responseFormalize(404, "USER_NOT_FOUND", true);
    else {
      const order = await Order.create(data);
      return responseFormalize(201, "ORDER_CREATE_SUCCESS", false, order._id);
    }
  } catch (err) {
    createErrorLog(err)
    return responseFormalize(500,'INTERNAL_SERVER_ERROR',true,'Internal server error')
  }
};

//get order Detail
const getOrderDetail = async (id) => {
  try {
    const order = await Order.findOne({ _id: id })
      .populate('userId', 'fullName')
      .populate({ path: "products",
        populate: {
          path: "productId",
          select: ['name', 'price']
        },
      }).lean().exec()

    if (!order)
      return responseFormalize(404, "GET_ORDER_FAIL", true)
    else {
      return responseFormalize(200, "GET_ORDER_DETAIL_SUCCESS", false, "List of products in order", order);
    }
  } catch (err) {
    createErrorLog(err)
    return responseFormalize(500,'INTERNAL_SERVER_ERROR',true,'Internal server error')
  }
};

const getListOrderByUserID = async (data) => {
  try {
    const user = await User.findOne({ _id: data.userId, status: "active" });
    if (!user) return responseFormalize(404, "USER_NOT_FOUND", true);
    else {
      const orders = await Order.find({
        userId: user._id,
        status: { $ne: "deleted" },
      });
      return responseFormalize( 201, "GET_LIST_ORDER_SUCCESS", false, 
              orders.map((e) => { return { id: e._id, status: e.status, date: e.createdAt };
        })
      );
    }
  } catch (err) {
    createErrorLog(err)
    return responseFormalize(500,'INTERNAL_SERVER_ERROR',true,'Internal server error')
  }
};

const updateOne = async (id, data) => {
  try {
    const order = await Order.findByIdAndUpdate({ _id: id }, data);
    if (!order) return responseFormalize(200, "UPDATE_ORDER_SUCCESS", false);
    else {
      return responseFormalize(404, "UPDATE_ORDER_FAIL", false);
    }
  } catch (err) {
    createErrorLog(err)
    return responseFormalize(500,'INTERNAL_SERVER_ERROR',true,'Internal server error')
  }
};

const deleteOne = async (id) => {
  try {
    const order = await Order.findOneAndUpdate(
      { _id: id, status: "pending" },
      { status: "deleted" }
    );
    if (!order) return responseFormalize(200, "DELETE_ORDER_SUCCESS", false);
    else {
      return responseFormalize(
        404,
        "DELETE_ORDER_FAIL",
        true,
        "Order not found"
      );
    }
  } catch (err) {
    createErrorLog(err)
    return responseFormalize(500,'INTERNAL_SERVER_ERROR',true,'Internal server error')
  }
};

export {
  createNewOrder,
  getOrderDetail,
  getListOrderByUserID,
  updateOne,
  deleteOne,
};
