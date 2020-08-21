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
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: ObjectId,
    ref: "users",
  },
  updateAt: {
    type: Date,
    default: Date.now
  },
  updateBy: {
    type: ObjectId,
    ref: "users",
  },
  shipDate: {
    type: Date,
    default: undefined,
  },
  shipAddress: {
    type: "String",
    required: [true, "Shipping address is required"]
  }
});
OrderSchema.pre("findOneAndUpdate", async function (next) {
  const docToUpdate = await this.model.findOne(this.getQuery());
  docToUpdate.updateAt = Date.now();
  docToUpdate.save(function (err) {
    if (err) {
      console.log(err);
    }
  });
  next();
});

export const Order = mongoose.model("orders", OrderSchema);
