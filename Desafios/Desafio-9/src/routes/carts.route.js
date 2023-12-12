import { Router } from "express";
import { addProducToCart } from "../controllers/carts.controller.js";

const route = Router()

route.post("/:idCart/products/:idProduct",addProducToCart)

export default route
