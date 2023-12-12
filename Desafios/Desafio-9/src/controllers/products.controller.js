import { createOne, deleteOne, findAllPaginate, findById } from "../services/products.service.js";

export const createOneProduct = async (req, res) => {
    try{
        const product = await createOne(req.body)
        res.redirect("/products")
    }catch(err){
        res.json({message: err.message})
    }
}

export const findAllProducts = async (req, res) => {
    const products = await findAllPaginate(req.query)
    res
        .status(200)
        .json({products})
}

export const deleteOneProduct = async (req, res) => {
    const { id } = req.params
    const product = await deleteOne(id)
    res
        .status(204)
        .json({product})
}