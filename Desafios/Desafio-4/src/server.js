import express from "express";
import { product3, productsManager } from "./ProductsManager.js";
import { cartsManager } from "./CartsManager.js";
import { engine } from "express-handlebars";


const app = express()

app.use(express.json())

app.engine("handlebers",engine())
app.use(express.urlencoded)

// ROUTES: /API/PRODUCTS
app.get("/api/products",async (req, res)=> {
    try {
        const products = await productsManager.getProducts(req.query);
        res.status(200).json({message:"Products found", products})
    } catch (err){
        res.status(500).json({message: err.message})
    }
});

app.get("/api/products/:id", async (req, res) => {
    const { id } = req.params
    try{
        const product = await productsManager.getProductById(id)
        res.status(200).json({message:"Product found",product})
    }catch(err){
        res.status(500).json({message:err.message})
    }
});

app.post("/api/products",async (req, res) => {
    try{
        const response = await productsManager.createProduct(product3)
        res.status(200).json({message:"Product create", response})
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

app.put("/api/poducts/:idProduct", async (req,res) => {
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

app.delete("/api/products/:idProduct", async (req, res) =>{
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


//ROUTES  /API/CARTS
app.get("/api/carts/:idCart", async (req,res) => {
    const { idCart } = req.params
    try{
        const cart = await cartsManager.getCartById(idCart)
        if(!cart){
            res
                .status(404)
                .json({message: "cart not found"})
        }
        res.status(200).json({message: "cart found",cart})
    }catch(err){
        res.status(500).json({message:err.message})
    }
})
app.post("/api/carts",async (req, res) => {
    try{
        const response = await cartsManager.createCart()
        res.status(200).json({message:"Cart create",response})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})
app.post("/api/carts/:idCart/products/:idProduct", async(req,res) => {
    const {idCart, idProduct} = req.params
    try{
        const response = await cartsManager.addProduct(idCart,idProduct)
        if(!response){
            res
                .status(404)
                .json({message: "Cart or Product not exist"})
        }
        res.status(200).json({message: "Product added",cart: response})
    }catch(err){
        res.status(500).json({message:err.message})
    }
})




//PUERTO
app.listen(8080,() => {
    console.log("escuchando el puerto 8080")
})