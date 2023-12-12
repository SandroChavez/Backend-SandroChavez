import { Router } from "express";
import {
    createOneProduct,
    deleteOneProduct,
    findAllProducts
} from "../controllers/products.controller.js"

const route = Router()

route.get("/", findAllProducts)
route.post("/", createOneProduct)
route.delete("/", deleteOneProduct)

export default route