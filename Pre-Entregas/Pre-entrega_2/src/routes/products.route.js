import { Router } from "express";
import { productsManager } from "../managers/products.manager.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const response = await productsManager.findAll(req.query);

    const products = {status: "success", ...response}

    res.status(200).json({ message: "Products", products});
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

router.delete("/", async (req, res) => {
  try {
    await productsManager.deleteAll();
    res
      .status(200)
      .json({ message: "Products deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;