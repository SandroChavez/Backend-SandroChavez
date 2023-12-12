import { messagesManger } from "../daos/messages.dao.js";

export const createMessageService = async (data) => {
    const response = await messagesManger.createOne(data)
    return response
} 

export const findLimitMessagesService = async (limit = 10) => {
    const response = await messagesManger.findLimit(limit)
    return response
}

export const deleteMessagesService = async () => {
    const response = await messagesManger.deleteAll()
    return response
}