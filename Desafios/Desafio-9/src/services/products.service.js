import { productsManager } from "../daos/products.dao.js";

//Create
export const createOne = async (obj) => {
    const user = await productsManager.createOne(obj)
    return user
}

//Read
export const findAllPaginate = async (obj) => {

    const { limit = 4, page = 1, sort = null, ...filter } = obj
    const req = {
        limit,
        page,
        sort,
        ...filter
    }

    const response = await productsManager.findAllPaginate(req)

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

export const findById = async (id) => {
    const user = await productsManager.findById(id)
    return user
}

//Delate
export const deleteOne = async (id) => {
    const user = await productsManager.deleteOne(id)
    return user
}