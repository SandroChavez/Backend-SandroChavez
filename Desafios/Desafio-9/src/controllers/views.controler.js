import { findAllPaginate, findById } from "../services/products.service.js";
import { findLimitMessagesService } from "../services/messages.service.js";
import { findUserByEmailService } from "../services/users.service.js";
import { findCartByIdService } from "../services/carts.service.js";

export const redirectView = async (req, res) => {
    res.redirect("/products")
}

export const findAllProductsView = async (req, res) => {
    const productsData = await findAllPaginate(req.query)
    res.render("products",{productsData})
}

export const findOneProductByIdView = async (req, res) => {
    const { id } = req.params
    const product = await findById(id)
    res.render("oneProduct",{product})
}

export const chatView = async (req, res) => {
    const messages = await findLimitMessagesService(req.query)
    const user = req.user
    res.render("chat",{messages, user})
}

export const profileView = async (req, res) => {
    try{
        if (!req.session.passport) {
            return res.redirect("/login");
        }
        const { first_name, last_name, email, carts } = req.user;
        // const user = await findUserByEmailService(email)
        res.cookie("idCart",carts[0])
        res.render("profile", { user: { first_name, last_name, email, carts } });
    }catch(err){
        res.send(err)
    }
}

export const cartView = async (req, res) => {
    const { id } = req.params
    try{
        const cart = await findCartByIdService(id);
        const products = cart.products;
        res.render("cart",{products,cartId: id})
    }catch(err){
        res.send(err)
    }
}

export const loginView = async (req, res) => {
    if(req.session.user){
        return res.redirect("/profile")
    }
    res.render("login")
}

export const signupView = async (req, res) => {
    if(req.session.user){
        return res.redirect("/profile")
    }
    res.render("signup")
}
