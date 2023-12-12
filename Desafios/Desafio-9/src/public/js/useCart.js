
const useCart = (idCart) => {
    const idCartCookie = localStorage.getItem("idCart");
    const idCartDecoded = decodeURIComponent(idCartCookie)
    if(idCartDecoded == idCart){
        return idCartDecoded
    }
    // document.cookie()
    return idCart
}

const buttons = document.querySelectorAll(".useCart")
buttons.forEach((button) => {
    const idCart = button.getAttribute("idCart")

    button.addEventListener('click',(e) => {
        
        console.log(idCart)
        // e.preventDefault
        return useCart(idCart)
    })
})