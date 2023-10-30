import { Router } from "express";
import { productsManager } from "../managers/products.manager.js";
import { messagesManager } from "../managers/messages.manager.js";


const router = Router();

router.get("/products",async (req,res) => {
    // const products = await productsManager.findAll(req.query)
    
    // res.render("products",{products})
    const {results} = await productsManager.findAll(req.query)
    const products = results
    
    res.render("products",{products: products})
})

router.get("/chat", async (req,res) => {
    const messages = await messagesManager.findAll()

    res.render("messages",{messages})
})

export default router
