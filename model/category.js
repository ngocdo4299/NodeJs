import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    unique: [true, "Name of category is unique"],
  }
});

export const Category = mongoose.model("category", CategorySchema);