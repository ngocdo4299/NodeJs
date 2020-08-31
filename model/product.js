import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ProductSchema = new Schema({
  name: {
    type: String,
    unique: [true, 'product name is unique'],
    required: [true, 'product name is required'],
  },
  description: {
    type: String,
    default: 'No description',
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  categoryId: {
    type: ObjectId,
    ref: 'category',
  },
  createdBy: {
    type: ObjectId,
    ref: 'users',
  },
  updateBy: {
    type: ObjectId,
    ref: 'users',
    default: null,
  },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

export const Product = mongoose.model('products', ProductSchema);