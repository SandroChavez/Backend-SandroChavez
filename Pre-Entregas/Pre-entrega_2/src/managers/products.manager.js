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
        ? `http://localhost:8080/products?page=${response.nextPage}&limit=${limit}`
        : null,
      prevLink: response.hasPrevPage
        ? `http://localhost:8080/products?page=${response.prevPage}&limit=${limit}`
        : null
    };
    return info;
  }

  // async findLimit(limit) {
  //   const result = await productsModel.find().limit(limit).lean();
  //   return result;
  // }

  async findById(id) {
    const response = await productsModel.findById(id);
    return response;
  }

  async createOne(obj) {
    const response = await productsModel.create(obj);
    return response;
  }

  async updateOne(id, obj) {
    const response = await productsModel.updateOne({ _id: id }, obj);
    return response;
  }

  async deleteOne(id) {
    const response = await productsModel.deleteOne({ _id: id });
    return response;
  }

  async deleteAll(){
    const response = await productsModel.deleteMany()
    return response
  }
}

export const productsManager = new ProductsManager();
