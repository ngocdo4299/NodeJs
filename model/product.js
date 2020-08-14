import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    unique: [true, "Usename is unique"],
    required: [true, "Fullname field is required"],
  },
  description: {
    type: String,
    default: "No description",
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  categoryId: {
    type: Schema.Types.ObjectId, ref: 'category'
  },
});

export const Product = mongoose.model("products", ProductSchema);