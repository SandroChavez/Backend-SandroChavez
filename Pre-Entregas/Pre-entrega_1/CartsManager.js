import {existsSync,promises} from "fs";
import { productsManager } from "./ProductsManager.js"


const pathCarts = "./lib/Carts.request.json"

class CartsManager {
    isProductInCart(cart,product){
        return cart.products.some(p => p.id == product.id)
    }
    async getCarts(){
        try{
            if(existsSync(pathCarts)){
                const cartsFile = await promises.readFile(pathCarts,"utf-8")

                const carts = JSON.parse(cartsFile)

                return carts
            }else{
                return []
            }
        }catch(err){
            return err
        }
    }
    async createCart(){
        try{
            const carts = await this.getCarts()

            let id = (!carts.length) ? 1 : carts[carts.length - 1].id + 1
               
            const cart = {id,products: []}

            carts.push(cart)

            await promises.writeFile(pathCarts,JSON.stringify(carts))

            return cart
        }catch(err){
           return err
        }
    }
    async getCartById(id){
        try{
            const carts = await this.getCarts()
            const cartById = carts.find(cart => cart.id == id)
            if(!cartById){
                return 
            }
            return cartById
        }catch(err){
            return err
        }
    }
    async addProduct(idCart,idProduct){
        try{
            const carts = await this.getCarts()
            
            const cart = await this.getCartById(idCart)
            if(!cart){
                return null
            }

            const product = await productsManager.getProductById(idProduct)
            if(!product){
                return null
            }

            if(!this.isProductInCart(cart,product)){
                
                cart.products.push({id: +idProduct ,qty:1})
                
            }else{
                const indexProduct = cart.products.findIndex((p) => p.id == idProduct);

                cart.products.splice(indexProduct,1,{id: +idProduct, qty: cart.products[indexProduct].qty + 1 })
            }

            const indexCard = carts.findIndex(c => c.id === idCart)

            carts.splice(indexCard,1,cart)

            await promises.writeFile(pathCarts,JSON.stringify(carts))

            return cart
        }catch(err){
            return err
        }
    }
}

export const cartsManager = new CartsManager()

// const test = async () =>{
//     cartsManager.createCart()
// }