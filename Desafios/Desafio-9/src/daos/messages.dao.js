import { messagesModel } from "../dao/db/models/messages.model.js";

class MessagesManager{

    //Create
    async createOne(obj){
        const response = await messagesModel.create(obj)
        return response
    }

    //Read
    async findLimit(limit){
        const response = await messagesModel
            .find()
            .sort({_id: -1})
            .limit(limit)
        return response
    }

    async deleteAll(){
        const response = await messagesModel.deleteMany()
        return response
    }
}

export const messagesManger = new MessagesManager()