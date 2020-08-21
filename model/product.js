import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ProductSchema = new Schema({
  name: {
    type: String,
    unique: [true, "product name is unique"],
    required: [true, "product name is required"],
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
    type: ObjectId, 
    ref: 'category'
  },
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
    default: null
  }
});
ProductSchema.pre("findOneAndUpdate", async function (next) {
  const docToUpdate = await this.model.findOne(this.getQuery());
  docToUpdate.updateAt = Date.now();
  docToUpdate.save(function (err) {
    if (err) {
      console.log(err);
    }
  });
  next();
});
export const Product = mongoose.model("products", ProductSchema);