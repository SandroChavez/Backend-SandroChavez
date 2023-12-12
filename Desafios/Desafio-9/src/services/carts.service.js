import { cartsManager } from "../daos/carts.dao.js";

export const createCartService = () => {
    const response = cartsManager.createCart()
    return response
}

export const addProducToCartService = async(idCart, idProduct) => {
    const cart = await cartsManager.findCartById(idCart)
    const productIndex = cart.products.findIndex((p) =>
        p.product.equals(idProduct)
    );

    if (productIndex === -1) {
        cart.products.push({ product: idProduct, quantity: 1 });
    } else {
        cart.products[productIndex].quantity++;
    }
    const response = await cartsManager.addProductToCart(idCart,cart.products)
    return response
}

export const findCartByIdService = (id) => {
    const response = cartsManager.findCartById(id)
    return response
}

