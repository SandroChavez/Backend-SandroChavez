import { Router } from "express";
import productsManager from "../classes/ProductsManager.js";

const router = Router()

router.get("/",async (req, res)=> {
    
    const products = await productsManager.getProducts(req.query)

    res.render("productsRealTime",{products})
});

export default router