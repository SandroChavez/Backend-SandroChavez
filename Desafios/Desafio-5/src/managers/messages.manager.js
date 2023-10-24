import { messagesModel } from "../dao/db/models/messages.model.js"

class MessagesManager{
  async findAll(){
    const result = await messagesModel.find().sort({_id: -1}).lean()
    return result
  }
  async findLimit(limit){
    const result = await messagesModel
        .find()
        .sort({_id: -1})
        .limit(limit)
    return result
  }
  async createMessage(obj){
    const result = await messagesModel.create(obj)
    return result
  }
  async delateMessages(){
    const result = await messagesModel.deleteMany()
    return result
  }
}

export const messagesManager = new MessagesManager() 