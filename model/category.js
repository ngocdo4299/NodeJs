import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const CategorySchema = new Schema({
  name: {
    type: String,
    unique: [true, 'Name of category is unique'],
  },
  createdBy: {
    type: ObjectId,
    ref: 'users',
    required: [true, ''],
  },
  updateBy: {
    type: ObjectId,
    ref: 'users',
    default: null,
  },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

export const Category = mongoose.model('category', CategorySchema);