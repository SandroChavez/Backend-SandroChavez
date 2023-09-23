import express from "express";
import {manager} from "./ProductManager.js"

const app = express()

app.use(express.json())

app.get("/api/products",async (req, res)=> {
    try {
        const products = await manager.getProducts(req.query);
        res.status(200).json({message:"Products found", products})
    } catch (err){
        res.status(500).json({message: err.message})
    }
});

app.get("/api/products/:id", async (req, res) => {
    const { id } = req.params
    try{
        const product = await manager.getProductById(id)
        res.status(200).json({message:"Product found",product})
    }catch(err){
        res.status(500).json({message:err.message})
    }
});

// app.post("/api/products",async (req, res) => {
//     const {name,price,stock} = req.body
//     if(!name || !price || !stock){
//         res.status(400).json({message: "some data is missing"})
//     }
//     try{
//         const response = await manager.createProduct(req.body)
//         res.status(200).json({message:"Product create", response})
//     }catch(err){
//         res.status(500).json({message:err.message})
//     }
// })

// app.put("/api/poducts/:idProduct", async (req,res) => {
//     const { idProduct } = req.params
//     try{
//         const response = await manager.updateProduct(idProduct,req.body)
//         if(!response){
//             res
//                 .status(400)
//                 .json({message: "Product not found"})
//         }
//         res.status(200).json({message: "Product update",response})
//     }catch(err){
//         res.status(500).json({message: err.message})
//     }
// })

// app.delete("/api/products/:idProduct", async (req, res) =>{
//     const { idProduct } = req.params
//     try{
//         const response = await manager.deleteProduct(+idProduct)
//         if(!response){
//             res
//                 .status(404)
//                 .json({message: "Product not found"})
//         }
//         res.status(200).json({message: "Product deleted"})
//     }catch(err){
//         res.status(500).json({message: err.message})
//     }
// })

app.listen(8080,() => {
    console.log("escuchando el puerto 8080")
})