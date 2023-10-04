import {existsSync,promises} from "fs"
import { __dirname } from "../util.js";

const path = __dirname + "/lib/Products.request.json"

class ProductsManager {
    async getProducts(queryObj) {
        const {limit} = queryObj;
        try{
            if(existsSync(path)){
                const productsFile = await promises.readFile(path,"utf-8")
                
                const products = JSON.parse(productsFile)

                return limit ? products.slice(0, +limit) : products;
            }else{
                return []
            }
        }catch(err){
            return err
        }
    }

    async createProduct(product){
        try{
            if(!Object.keys(product).length){
                return null
            }

            const products = await this.getProducts({})

            let id = (!products.length) ? 1 : products[products.length - 1].id + 1

            product = {...product,id}

            products.push(product)

            await promises.writeFile(path, JSON.stringify(products))

            return product
        }catch(err){
            return err
        }
    }

    async getProductById(id){
        try{
            const products = await this.getProducts({})
            const productById = products.find(p => p.id == id)
            if(!productById){
                return 
            }
            return productById
        }catch(err){
            return err
        }
    }

    async deleteProduct(id){
        try{
            const products = await this.getProducts({})
            const product = products.find((p) => p.id === id)

            if(product){
                const newArrayProducts = products.filter((p) => p.id !== id)
                await promises.writeFile(path,JSON.stringify(newArrayProducts))
            }
            
            return product
        }catch(err){
            return err
        }
    }

    async updateProduct(id,obj){
        try{
            const products = await this.getProducts({})
            const index = products.findIndex((p) => p.id === id);

            if (index == -1){
                return null;
            }
            if (obj.id != id){
                return null
            }
            const updateProduct = {...products[index],...obj}
            products.splice(index, 1, updateProduct)

            await promises.writeFile(path,JSON.stringify(products))

            return updateProduct

        }catch(err){
            return err
        }
    }
}

const product2 = {
    tittle:"banana",
    description:"",
    code:"A-002",
    price:30,
    status:true,
    stock:60,
    category:"fruit"
}

const productsManager = new ProductsManager();

export default productsManager

// const test = async () => {
//     console.log(await productsManager.createProduct(product3))
// }