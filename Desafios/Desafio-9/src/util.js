import { dirname } from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv"
import bcrypt from "bcrypt"

export const __dirname = dirname(fileURLToPath(import.meta.url));

export const getObjEnv = () => {
    config()
    const objEnv = {
        URI_MONGO_DB: process.env.URI_MONGO_DB,
        GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
        GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        SECRET_KEY_JWT: process.env.SECRET_KEY_JWT
    }
    return objEnv
}

export const hashData = async (data) => {
    return bcrypt.hash(data,10)
}

export const compareData = async (data, hashedData) => {
    return bcrypt.compare(data,hashedData)
}

export const generateNewCart = async (createCart) => {
    const cart = await createCart()
    return cart._id
}