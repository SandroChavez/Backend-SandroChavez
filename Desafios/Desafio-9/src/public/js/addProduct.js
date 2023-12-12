const routeOrigin = window.location.origin;
const routeComplementApiCarts = `/api/carts`

// async function getIdCart(){

//     const idCartLocal = sessionStorage.getItem("idCart")
//     if(idCartLocal){
//         return idCartLocal
//     }

//     const url = routeOrigin + routeComplementApiCarts


//     const {cart} = await response.json()
//     const idCart = cart._id

//     localStorage.setItem("idCart",idCart)
//     return idCart
// }

async function addProduct(idProduct){

    const cookies = document.cookie
    const idCart = cookies.split("%22")[1] // idCart=j%3A%22{ID_CART}%22
    console.log("idCart",idCart);

    const url = routeOrigin + routeComplementApiCarts + `/${idCart}` + `/products` + `/${idProduct}`
    console.log(url);
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
        
        boton.addEventListener('click',async (e) => {
            console.log("idProduct",idProduct)
            e.preventDefault
            await addProduct(idProduct)
        })
    })
});

