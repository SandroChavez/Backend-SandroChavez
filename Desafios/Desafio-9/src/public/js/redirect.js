const routeOrigin = window.location.origin;

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.link')

    links.forEach((link) => {
        const idProduct = link.getAttribute("idProduct")
        const idCart = link.getAttribute("idCart")
        const routeComplement = link.getAttribute("redirectRoute")

        link.addEventListener('click',(e) => {
            e.preventDefault()
            const route = (
                routeOrigin + 
                routeComplement +
                (idProduct ? `/${idProduct}` : "")+
                (idCart ? `/${idCart}` : "")
            )
            console.log(route)
            window.location.href = route
        })
    })
});