import mongoose from "mongoose";

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

export const productsModel = mongoose.model("Products", productsSchema);