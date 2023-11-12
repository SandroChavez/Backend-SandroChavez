import { usersModel } from "../dao/db/models/users.model.js";

class UsersManger{
    async findByEmail(email){
        const response = usersModel.findOne({email})
        return response
    }

    async findById(id){
        const response = usersModel.findById(id)
        return response
    }

    async createOne(obj){
        const response = usersModel.create(obj)
        return response
    }
}

export const usersManager = new UsersManger()