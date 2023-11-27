import { Router } from "express";
import { productsManager } from "../managers/products.manager.js";
import { messagesManager } from "../managers/messages.manager.js";
import { cartsManager } from "../managers/carts.manager.js";
import { usersManager } from "../managers/users.manager.js";
// import { jwtValidation } from "../middlewares/jwt.middleware.js";


const router = Router();

router.get("/products",async (req,res) => {
    const response = await productsManager.findAll(req.query)
    
    const data = response

    //session
    let user = req.user;
    user = {...user._doc, isAdmin: (user._doc.role == "ADMIN")}
    res.render("products",{data,user})
})

router.get("/products/:idProduct",async (req,res) =>{
    const { idProduct } = req.params
    const product = await productsManager.findById(idProduct)

    res.render("oneProduct",{product})
})

router.get("/chat", async (req,res) => {
    const messages = await messagesManager.findAll()
    const user = req.user
    console.log(req)
    res.render("chat",{messages,user})
})

router.get("/carts/:idCart", async (req,res) => {
    const { idCart } = req.params
    const cart = await cartsManager.findCartById(idCart)
    const { products } = cart

    res.render("cart",{products})
})

router.get("/login",async (req,res) => {
    if(req.session.user){
        return res.redirect("/profile")
    }
    res.render("login")
})

router.get("/signup", async (req,res) => {
    if(req.session.user){
        return res.redirect("/profile")
    }
    res.render("signup")
})

router.get("/profile", async (req, res) => {
    try{
        if (!req.session.passport) {
          return res.redirect("/login");
        }
        const { first_name, last_name, email } = req.user;
        const user = await usersManager.findByEmail(email)
        console.log(user)
        res.render("profile", { user: { first_name, last_name, email,carts: user.carts } });
    }catch(err){
        res.redirect("/login")
    }
});

router.get("/restaurar", async (req,res) => {
    
    res.render("restaurar")
})
export default router
