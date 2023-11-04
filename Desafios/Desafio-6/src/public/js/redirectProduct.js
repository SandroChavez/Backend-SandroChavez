const routeOrigin = window.location.origin;
const routeComplementProducts = `/products`

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault
    const tittleLinks = document.querySelectorAll('.tittleLinks')

    tittleLinks.forEach((tittle) => {
        const idProduct = tittle.getAttribute("idProduct")

        tittle.addEventListener('click',(e) => {
            e.preventDefault
            
            window.location.href = routeOrigin + routeComplementProducts + `/${idProduct}`
        })
    })
});