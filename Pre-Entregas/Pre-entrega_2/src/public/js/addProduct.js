const routeOrigin = window.location.origin;
const routeComplementCarts = `/api/carts`

const getIdCart = async () => {

    const idCartLocal = localStorage.getItem("idCart")
    if(idCartLocal){
        return idCartLocal
    }

    const url = routeOrigin + routeComplementCarts

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

const addProduct = async (_id) => {

    _id = _id.toString()

    const url = routeOrigin + routeComplementCarts + `/${_id}`

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({_id})
    })
    console.log("Producto añadido")
}