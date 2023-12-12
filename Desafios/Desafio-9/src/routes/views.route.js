import { Router } from "express";
import {
    redirectView,
    findAllProductsView,
    findOneProductByIdView,
    profileView,
    loginView,
    signupView,
    cartView,
    chatView
} from "../controllers/views.controler.js"

const route = Router()

route.get("/",redirectView)
route.get("/products",findAllProductsView)
route.get("/products/:id",findOneProductByIdView)
route.get("/chat",chatView)
route.get("/profile",profileView)
route.get("/login",loginView)
route.get("/signup",signupView)
route.get("/carts/:id",cartView)

export default route