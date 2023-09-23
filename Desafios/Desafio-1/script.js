class ProductManager {
  constructor(){
    this.products = []
  }
  
  getProducts(){
    return this.products
  }

  getProductById(id){
    
    let product = this.products.find(product => product.id == id)

    if(!product){
      return ("Error: Producto no encontrado") 
    }else{
      return product
    }
  }
  
  addProduct(tittle,description,price,thumbnail,code,stock){

    if(this.products.some(product => product.code == code)){
      console.log(`Error: Ya hay un producto con el codigo ${code}`)
      return
    }
    
    let id = (!this.products.length) ? 1 : this.products[this.products.length - 1].id + 1

    const product = {
      id,
      tittle,
      description,
      price,
      thumbnail,
      code,
      stock
    }

    this.products.push(product)

    console.log("Producto añadido")
  }
}

const manager1 = new ProductManager()

manager1.addProduct(
  "Manzana",
  "Una manzana roja",
  50,
  "#",
  "A-001",
  20
)
