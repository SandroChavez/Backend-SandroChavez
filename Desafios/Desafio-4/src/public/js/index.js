const socketClient = io()

const form = document.getElementById("form")

const inputTittle = document.getElementById("tittle")
const inputPrice = document.getElementById("price")

const listProduct = document.getElementById("listProduct")

form.onsubmit = async(e) => {
    e.preventDefault()

    const tittle = inputTittle.value
    const price = inputPrice.value

    
    if(!price || !tittle){
        return
    }

    const product = {
        tittle,
        price
    }

    socketClient.emit("enviarProducto",product)
}

socketClient.on("ActualizarProducto", (products) => {

    console.log(products)

    const templateHTML = 
    `
    {{#each products}}
      <li>
        <h3>tittle: {{this.tittle}}</h3>
        <p>price: {{this.price}}</p>
        <p>id: {{this.id}}</p>
      </li>
      {{/each}}  
    `

    const template = Handlebars.compile(templateHTML);

    listProduct.innerHTML = template({ products });
})
