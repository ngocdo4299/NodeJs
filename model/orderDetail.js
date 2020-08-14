import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId, ref: 'products'
  },
  orderId: {
    type: Schema.Types.ObjectId, ref: 'orders'
  },
  quantity: {
    type: Number,
    default: 1
  }
});

export const Order = mongoose.model("orders", OrderSchema);