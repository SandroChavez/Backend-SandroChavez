const socketClient = io()

const form = document.getElementById("form")

const inputTittle = document.getElementById("tittle")
const inputPrice = document.getElementById("price")

const listProduct = document.getElementById("listProduct")

let path = window.location.pathname;

form.onsubmit = async(e) => {
    e.preventDefault()

    const tittle = inputTittle.value
    const price = inputPrice.value

    
    if(!price || !tittle){
        return
    }

    const data = {
      product:{
        tittle,
        price
      },
      path
    }

    socketClient.emit("enviarProducto",data)
}

socketClient.on("ActualizarProducto", ({products}) => {


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

  listProduct.innerHTML = template( {products} );
})
