import { productsModel } from "../dao/db/models/products.model.js";

class ProductsManager {
  // async findAll() {
  //   const result = await productsModel.find().lean();
  //   return result;
  // }

  async findAll(obj) {
    const { limit = 4, page = 1, sort = null, ...filter } = obj

    const response = await productsModel.paginate(filter,{limit,page, sort: sort ? {price: sort} : {}});

    const info = {
      payload : response.docs,
      // count: response.totalDocs,
      totalPages: response.totalPages,
      prevPage: response.prevPage,
      nextPage: response.nextPage,
      page: response.page,
      hasNextPage: response.hasNextPage ? true : false,
      hasPrevPage: response.hasPrevPage ? true : false,       
      nextLink: response.hasNextPage 
        ? `http://localhost:8080/api/products?page=${response.nextPage}`
        : null,
      prevLink: response.hasPrevPage
        ? `http://localhost:8080/api/products?page=${response.prevPage}`
        : null
    };
    return info;
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
