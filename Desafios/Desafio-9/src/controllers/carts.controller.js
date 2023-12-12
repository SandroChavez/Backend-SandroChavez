import { addProducToCartService } from "../services/carts.service.js";

export const addProducToCart = async (req, res) => {
    const { idCart, idProduct } = req.params
    try{
        const cart = await addProducToCartService(idCart,idProduct)
        res.redirect("/products")
    }catch(err){
        res.send(err)
    }
}