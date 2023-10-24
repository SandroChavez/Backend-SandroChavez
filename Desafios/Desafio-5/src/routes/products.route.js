import { Router } from "express";
import { productsManager } from "../managers/products.manager.js";

const router = Router();

router.get("/", async (req, res) => {
  const {limit} = req.query
  try {
    let products
    if(!limit){
      products = await productsManager.findAll();
    }else{
      products = await productsManager.findLimit(limit);
    }
    
    res.status(200).json({ message: "Products", products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    await productsManager.createOne(req.body);
    res
      .status(200)
      .redirect("/products");
  } catch (err) {
    res
      .status(500)
      .redirect({ error: err.message });
  }
});

router.delete("/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  try {
    await productsManager.deleteOne(idProduct);
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;