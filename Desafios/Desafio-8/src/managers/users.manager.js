import { usersModel } from "../dao/db/models/users.model.js";

class UsersManger{
    async findByEmail(email){
        const response = await usersModel
        .findOne({email})
        .populate("carts");
        return response
    }

    async findById(id){
        const response = await usersModel.findById(id)
        return response
    }

    async createOne(obj){
        const response = await usersModel.create(obj)
        return response
    }
}

export const usersManager = new UsersManger()