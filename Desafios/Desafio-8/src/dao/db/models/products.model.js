import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productsSchema = new mongoose.Schema({
  tittle: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    default: ""
  },
});

productsSchema.plugin(mongoosePaginate)

export const productsModel = mongoose.model("Products", productsSchema);