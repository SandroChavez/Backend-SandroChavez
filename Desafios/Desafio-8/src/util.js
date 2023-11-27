import { dirname } from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt"
// import jwt from "jsonwebtoken"
import { config } from "dotenv";
import { cartsManager } from "./managers/carts.manager.js";

config()

// const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT

export const __dirname = dirname(fileURLToPath(import.meta.url));

export const hashData = async (data) => {
    return bcrypt.hash(data,10)
}

export const compareData = async (data, hashedData) => {
    return bcrypt.compare(data,hashedData)
}

// export const generateToken = (user) => {;
//     const token = jwt.sign(user, SECRET_KEY_JWT, { expiresIn: 100 });
//     return token;
// };

export const generateNewCart = async () => {
    const cart = await cartsManager.createCart()
    return cart._id
}
