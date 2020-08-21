import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const CategorySchema = new Schema({
  name: {
    type: String,
    unique: [true, "Name of category is unique"],
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: ObjectId,
    ref: "users",
    required: [true, '']
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
CategorySchema.pre("findOneAndUpdate", async function (next) {
  const docToUpdate = await this.model.findOne(this.getQuery());
  docToUpdate.updateAt = Date.now();
  docToUpdate.save(function (err) {
    if (err) {
      console.log(err)
    }
  });
  next();
});

export const Category = mongoose.model("category", CategorySchema);