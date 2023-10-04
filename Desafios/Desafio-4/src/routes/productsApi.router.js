import { Router } from "express";
import productsManager from "../classes/ProductsManager.js";

const router = Router()

router.get("/",async (req, res)=> {
    try {
        const products = await productsManager.getProducts(req.query);
        res.status(200).json({message:"Products found", products})
    } catch (err){
        res.status(500).json({message: err.message})
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params
    try{
        const product = await productsManager.getProductById(id)
        res.status(200).json({message:"Product found",product})
    }catch(err){
        res.status(500).json({message:err.message})
    }
});

router.post("/",async (req, res) => {
    const product = req.body
    try{
        const response = await productsManager.createProduct(product)
        res.status(200).json({message:"Product create", response})
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

router.put(":idProduct", async (req,res) => {
    const { idProduct } = req.params
    try{
        const response = await productsManager.updateProduct(idProduct,req.body)
        if(!response){
            res
                .status(400)
                .json({message: "Product not found"})
        }
        res.status(200).json({message: "Product update",response})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

router.delete("/:idProduct", async (req, res) =>{
    const { idProduct } = req.params
    try{
        const response = await productsManager.deleteProduct(+idProduct)
        if(!response){
            res
                .status(404)
                .json({message: "Product not found"})
        }
        res.status(200).json({message: "Product deleted"})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

export default router