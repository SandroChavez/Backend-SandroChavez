import { cartsModel } from "../dao/db/models/carts.model.js";

class CartsManager {
  async createCart() {
    const newCart = { products: [] };
    const response = await cartsModel.create(newCart);
    return response;
  }

  async findCartById(idCart) {
    const response = await cartsModel
      .findById(idCart)
      .populate("products.product", ["tittle", "price"]);
    return response;
  }

  async addProductToCart(idCart, idProduct) {
    const response = await cartsModel.findById(idCart);
    const productIndex = response.products.findIndex((p) =>
      p.product.equals(idProduct)
    );

    if (productIndex === -1) {
      response.products.push({ product: idProduct, quantity: 1 });
    } else {
      response.products[productIndex].quantity++;
    }
    return response.save();
  }

  async delateOneProductCartById(idCart,idProduct){
    const response = await cartsModel.findById(idCart)

    response.products = response.products.filter((product) => !product.product.equals(idProduct));
      
    return await response.save()
  }

  async delateAllProductsCartById(idCart){
    const response = await cartsModel.findById(idCart)

    response.products = []

    return await response.save()
  }

  async updateCart(idCart,products){
    const response = await cartsModel.findByIdAndUpdate(idCart,{products},{new: true})

    return response
  }

  async updateProductCart(idCart,idProduct,qty){
    const response = await cartsModel.findByIdAndUpdate(
      idCart,
      {
        $set: {
          'products.$[p].quantity': qty
        }
      },
      {
        new: true,
        arrayFilters: [{ 'p.product': idProduct }]
      },)
    
    return response
  }
}

export const cartsManager = new CartsManager();