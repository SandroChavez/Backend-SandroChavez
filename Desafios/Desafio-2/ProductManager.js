const fs = require('node:fs')

const path = "./Users.json"

class UsersManager {
    async getProducts() {
        try{
            if(fs.existsSync(path)){
                const productsFile = await fs.promises.readFile(path,"utf-8")
                
                const products = JSON.parse(productsFile)

                return products
            }else{
                return []
            }
        }catch(err){
            return err
        }
    }

    async createProduct(product){
        try{
            const products = await this.getProducts()

            let id = (!products.length) ? 1 : products[products.length - 1].id + 1

            product = {...product,id}

            products.push(product)

            fs.promises.writeFile(path, JSON.stringify(products))

            return "Producto creado con exito"
        }catch(err){
            return err
        }
    }

    async getProductById(id){
        try{
            const products = await this.getProducts()
            const productById = products.find(user => user.id == id)
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
            const products = await this.getProducts()
            const newArrayProducts = products.filter(user => user.id !== id)
            fs.promises.writeFile(path,JSON.stringify(newArrayProducts))

            return "objeto elliminado con exito"
        }catch(err){
            return err
        }
    }

    async updateProduct(id,properity,update){
        try{
            if(!this.getProductById(id)){
                return "producto no encontrado"
            }
            const products = await this.getProducts()

            const newProducts = products.map(product => { 
                return (product.id == id) ? product = {...product,[properity]: update} : product
            })

            fs.promises.writeFile(path,JSON.stringify(newProducts))

            return "producto actualizado con exito"

        }catch(err){
            return err
        }
    }
}

const product1 = {
    tittle:"manzana",
    description:"manzana roja",
    price:5,
    thumbnail:"#",
    code:"A-001",
    stock:50
}

const test = async () => {

    const manager1 = new UsersManager()

    console.log(await manager1.updateProduct(1,"tittle", "pera"))
}

test()
