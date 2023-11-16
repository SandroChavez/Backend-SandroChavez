import { Router, response } from "express";
import { usersManager } from "../managers/users.manager.js"
import { hashData, compareData } from "../util.js";
import passport from "passport";

const router = Router()

// route.post("/signup",async (req,res) => {
//     const {first_name,last_name,email,password} = req.body

//     if(!first_name || !last_name || !email || !password){
//         return res.status(400).json({message:"All fields are requerid"})
//     }
//     try{
//         const hashedPassword = await hashData(password)
//         const createdUser = await usersManager.createOne({
//             ...req.body,
//             password: hashedPassword
//         })
//         res.redirect("/profile")
//     }catch(err){
//         res.redirect("/products")
//     }
// })

// route.post("/login",async (req,res) => {
//     const {email,password} = req.body

//     if(!email || !password){
//         return res.status(400).json({message:"All fields are requerid"})
//     }
//     try{
//         const user = await usersManager.findByEmail(email)
//         if(!user){
//            return res.redirect("/signup")
//         }
        
//         const isPasswordValid = await compareData(password,user.password)
//         console.log( isPasswordValid)
//         if(!isPasswordValid){
//             return res.status(401).json({message:"Password is not valid"})
//         }
        
//         const isAdmin = (email === "adminCoder@coder.com" && password === "adminCod3r123");

//         const sessionInfo = {
//             email,
//             first_name: user.first_name,
//             last_name: user.last_name,
//             isAdmin,
//         };

//         console.log(sessionInfo)
//         req.session.user = sessionInfo
//         res.status(200).redirect("/products")
//     }catch(err){
//         res.status(500).json({err})
//     }
// })

// SIGNUP - LOGIN - PASSPORT LOCAL

router.post(
    "/signup",
    passport.authenticate("signup", {
      successRedirect: "/profile",
      failureRedirect: "/error",
    })
);
  
router.post(
    "/login",
    passport.authenticate("login", {
      successRedirect: "/profile",
      failureRedirect: "/error",
    })
);

// SIGNUP - LOGIN - PASSPORT GITHUB

router.get(
    "/auth/github",
    passport.authenticate("github", { scope: ["user:email"] })
  );
  
router.get("/callback", passport.authenticate("github"), (req, res) => {
    res.redirect("/profile");
});

router.get("/logout", (req, res) => {
    req.session.destroy(() => {
      res.redirect("/login");
    });
});

router.post("/restaurar", async(req,res) => {
    const {email, password} = req.body
    try{
        const user = await usersManager.findByEmail(email)
        if(!user){
            return response.redirect("/")
        }
        const passwordHashed = await hashData(password)
        user.password = passwordHashed
        await user.save()
        res.redirect("/profile")
    }catch(err){
        return err
    }
})

export default router