import { usersManager } from "../daos/user.dao.js";
import { cartsManager } from "../daos/carts.dao.js";
import { hashData, generateNewCart } from "../util.js";

export const findUserByEmailService = async (email) => {
    const response = await usersManager.findByEmail(email)
    return response
}

export const findUserByIdService = async (id) => {
    const response = await usersManager.findById(id)
    return response
}

export const createUserService = async (obj) => {
    const { password } = obj
    const passportHashed = hashData(password)
    obj = {...obj, password: passportHashed, carts: [generateNewCart(cartsManager)]}
    const response = await usersManager.createOne(obj)
    return response
}