import { Router } from "express";
import { productsManager } from "../managers/products.manager.js";
import { messagesManager } from "../managers/messages.manager.js";
import { cartsManager } from "../managers/carts.manager.js";


const router = Router();

router.get("/products",async (req,res) => {
    // const products = await productsManager.findAll(req.query)
    
    // res.render("products",{products})
    const response = await productsManager.findAll(req.query)
    
    const data = response
    
    res.render("products",{data})
})

router.get("/products/:idProduct",async (req,res) =>{
    const { idProduct } = req.params
    const product = await productsManager.findById(idProduct)

    res.render("oneProduct",{product})
})

router.get("/chat", async (req,res) => {
    const messages = await messagesManager.findAll()

    res.render("messages",{messages})
})

router.get("/carts/:idCart", async (req,res) => {
    const { idCart } = req.params
    const cart = await cartsManager.findCartById(idCart)
    const { products } = cart

    res.render("cart",{products})
})

export default router
