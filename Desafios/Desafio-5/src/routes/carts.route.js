import { Router } from "express";
import { cartsManager } from "../managers/carts.manager.js"

const route = Router()

route.get("/:idCart",async (req,res) => {
    const { idCart } = req.params
    try {
        const cart = await cartsManager.findById(idCart)

        res.status(200).json({ message: "Cart", cart});
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});

route.post("/" , async (req,res) => {
    const {obj} = req.body
    try{
        const cart = await cartsManager.createOne(obj)

        res.status(200).json({message: "Cart", cart})
    }catch(err){
        res.status(500).json({message: err.message})
    }
});

route.delete("/:idCart", async (req,res) => {
    const {idCart} = req.params
    try{
        const cart = await cartsManager.delateOne(idCart)

        res.status(200).json({message: "Cart", cart})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

export default route