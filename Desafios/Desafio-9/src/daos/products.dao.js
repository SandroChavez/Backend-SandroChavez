import { productsModel } from "../dao/db/models/products.model.js";

class ProductsManager {

    //Create
    async createOne(obj){
        const response = await productsModel.create(obj)
        return response
    }
    
    //Read
    async findAllPaginate(obj){
        const { limit, page, sort, ...filter} = obj

        const response = await productsModel.paginate(filter,{limit,page, sort: sort ? {price: sort} : {}});
        return response
    }

    async findById(id){
        const response = await productsModel.findById(id)
        return response
    }

    //Update
    async updateOne(id,obj){
        const response = await productsModel.updateOne({_id: id},obj)
        return response
    }

    //Delate
    async deleteOne(id){
        const response = await productsModel.deleteOne({_id: id})
    }
    
}

export const productsManager = new ProductsManager();
