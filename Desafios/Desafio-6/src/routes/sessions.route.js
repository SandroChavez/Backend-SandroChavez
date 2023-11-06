import { Router } from "express";
import { usersManager } from "../managers/users.manager.js"

const route = Router()

route.post("/signup",async (req,res) => {
    const {first_name,last_name,email,password} = req.body

    if(!first_name || !last_name || !email || !password){
        return res.status(400).json({message:"All fields are requerid"})
    }
    try{
        const createdUser = await usersManager.createOne(req.body)
        res.redirect("/profile")
    }catch(err){
        res.status(500).json({err})
    }
})

route.post("/login",async (req,res) => {
    const {email,password} = req.body

    if(!email || !password){
        return res.status(400).json({message:"All fields are requerid"})
    }
    try{
        const user = await usersManager.findByEmail(email)
        if(!user){
           return res.redirect("/signup")
        }
        
        const isPasswordValid = password === user.password
        if(!isPasswordValid){
            return res.status(401).json({message:"Password is not valid"})
        }
        
        const isAdmin = (email === "adminCoder@coder.com" && password === "adminCod3r123");

        const sessionInfo = {
            isAdmin,
            email,
            first_name: user.first_name,
            last_name: user.last_name
        };

        console.log(sessionInfo)
        req.session.user = sessionInfo
        res.status(200).redirect("/products")
    }catch(err){
        res.status(500).json({err})
    }
})

route.get("/logout", async(req,res) => {
    req.session.destroy(() => {
        res.redirect("/login")
    })
})

export default route