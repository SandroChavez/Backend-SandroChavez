const routeOrigin = window.location.origin;
const routeComplementApiCarts = `/api/carts`

async function getIdCart(){

    const idCartLocal = localStorage.getItem("idCart")
    if(idCartLocal){
        return idCartLocal
    }

    const url = routeOrigin + routeComplementApiCarts

    const response = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    const {cart} = await response.json()
    const idCart = cart._id

    localStorage.setItem("idCart",idCart)

    return idCart
}

async function addProduct(idProduct){

    const idCart = await getIdCart()

    const url = routeOrigin + routeComplementApiCarts + `/${idCart}` + `/products` + `/${idProduct}`

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify({_id})
    })
}

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault
    const botones = document.querySelectorAll('.addProduct')

    botones.forEach((boton) => {
        const idProduct = boton.getAttribute("idProduct")

        boton.addEventListener('click',(e) => {
            e.preventDefault
            addProduct(idProduct)
        })
    })
});

