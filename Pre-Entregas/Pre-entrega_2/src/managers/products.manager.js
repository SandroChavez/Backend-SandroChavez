import { productsModel } from "../dao/db/models/products.model.js";

class ProductsManager {
  // async findAll() {
  //   const result = await productsModel.find().lean();
  //   return result;
  // }

  async findAll(obj) {
    const { limit = 10, page = 1, ...filter } = obj

    const response = await productsModel.paginate(filter,{limit,page});
    console.log(response)
    const info = {
      count: response.totalDocs,
      pages: response.totalPages,
      next: response.hasNextPage
        ? `http://localhost:8080/api/users?page=${response.nextPage}`
        : null,
      prev: response.hasPrevPage
        ? `http://localhost:8080/api/users?page=${response.prevPage}`
        : null,
    };
    const results = response.docs
    return {info, results};
  }

  // async findLimit(limit) {
  //   const result = await productsModel.find().limit(limit).lean();
  //   return result;
  // }

  async findById(id) {
    const result = await productsModel.findById(id);
    return result;
  }

  async createOne(obj) {
    const result = await productsModel.create(obj);
    return result;
  }

  async updateOne(id, obj) {
    const result = await productsModel.updateOne({ _id: id }, obj);
    return result;
  }

  async deleteOne(id) {
    const result = await productsModel.deleteOne({ _id: id });
    return result;
  }

  async deleteAll(){
    const result = await productsModel.deleteMany()
    return result
  }
}

export const productsManager = new ProductsManager();
