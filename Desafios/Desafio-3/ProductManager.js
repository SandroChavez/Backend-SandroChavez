import {existsSync,promises} from "fs"

const path = "./Products.json"

class UsersManager {
    async getProducts(queryObj) {
        const {limit} = queryObj;
        try{
            if(existsSync(path)){
                const productsFile = await promises.readFile(path,"utf-8")
                
                const products = JSON.parse(productsFile)

                return limit ? products.splice(0, +limit) : products;
            }else{
                return []
            }
        }catch(err){
            return err
        }
    }

    async createProduct(product){
        try{
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
                return false
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
                const newArrayProducts = users.filter((p) => p.id !== id)
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

            const updateProduct = {...products[index],...obj}
            products.splice(index, 1, updateProduct)

            await promises.writeFile(path,JSON.stringify(products))

            return updateProduct

        }catch(err){
            return err
        }
    }
}

const product1 = {
    name: "manzana",
    price: 20,
    stock:20
}
const product2 = {
    name: "platano",
    price: 30,
    stock: 15
}

export const manager = new UsersManager() 

const test = async () => {
    console.log(await manager.createProduct(product1))
}


