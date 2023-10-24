import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  products: {
    type: Array,
    default: []
  },
});

export const cartsModel = mongoose.model("Carts", productsSchema);