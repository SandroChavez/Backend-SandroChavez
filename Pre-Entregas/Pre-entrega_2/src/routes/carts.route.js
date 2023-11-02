import { Router } from "express";
import { cartsManager } from "../managers/carts.manager.js"

const router = Router()

router.get("/:idCart", async (req, res) => {
    const { idCart } = req.params;
    const cart = await cartsManager.findCartById(idCart);
    res.json({ cart });
});
  
router.post("/:idCart/products/:idProduct", async (req, res) => {
    const { idCart, idProduct } = req.params;
    const cart = await cartsManager.addProductToCart(idCart, idProduct);
    res.json({ cart });
});
  
router.post("/", async (req, res) => {
    const cart = await cartsManager.createCart();

    res.json({ cart });
});

router.delete("/:idCart/products/:idProduct",async (req,res) => {
    const { idCart, idProduct } = req.params;
    const response = await cartsManager.delateOneProductCartById(idCart,idProduct)

    res.json({response})
})

router.delete("/:idCart" ,async (req,res) => {
    const { idCart } = req.params;
    const response = await cartsManager.delateAllProductsCartById(idCart)

    res.json({response})
})

router.put("/:idCart/products/:idProduct" ,async (req,res) => {
    const { idCart, idProduct } = req.params;
    const { quantity } = req.body
    const response = await cartsManager.updateProductCart(idCart,idProduct,quantity)

    res.json({response})
})

router.put("/:idCart" ,async (req,res) => {
    const { idCart } = req.params;
    const { products } = req.body
    const response = await cartsManager.updateCart(idCart,products)

    res.json({response})
})
export default router