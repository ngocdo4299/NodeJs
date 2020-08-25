import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const OrderSchema = new Schema({
  userId: {
    type: ObjectId,
    ref: "users",
  },
  status: {
    type: String,
    default: "pending",
  },
  products: [
    {
      productId: 
      {
        type: ObjectId,
        ref: 'products'
      },
      quantity: Number
    }
  ],
  updateBy: {
    type: ObjectId,
    ref: "users"
  },
  shipDate: {
    type: Date,
    default: undefined,
  },
  shipAddress: {
    type: "String",
    required: [true, "Shipping address is required"]
  }
}, {timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }});

export const Order = mongoose.model("orders", OrderSchema);
