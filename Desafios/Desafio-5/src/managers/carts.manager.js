import { cartsModel } from "../dao/db/models/carts.model.js";

class CartsManager {
  async findById(id) {
    const result = await cartsModel.findById(id);
    return result;
  }

  async createOne(obj) {
    const result = await cartsModel.create(obj)
    return result
  }

  async updateOne(id, obj) {
    const result = await cartsModel.updateOne({ _id: id }, obj);
    return result;
  }

  async delateOne(id){
    const result = await cartsModel.deleteOne({_id: id});
    return result
  }
}

export const cartsManager = new CartsManager();