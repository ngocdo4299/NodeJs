import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  status: {
    type: String,
    default: "pending",
  },
  products: [
    {
      productName: String,
      quantity: Number
    }
  ],
});

export const Order = mongoose.model("orders", OrderSchema);
