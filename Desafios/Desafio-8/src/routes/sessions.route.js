import { Router, response } from "express";
import { usersManager } from "../managers/users.manager.js"
import { hashData } from "../util.js";
import passport from "passport";

const router = Router()

// router.post("/signup",async (req,res) => {
//     const {first_name,last_name,email,password} = req.body

//     if(!first_name || !last_name || !email || !password){
//         return res.status(400).json({message:"All fields are requerid"})
//     }
//     try{
//         const hashedPassword = await hashData(password)
//         await usersManager.createOne({
//             ...req.body,
//             password: hashedPassword
//         })

//         const token = generateToken({ first_name, last_name, email, role: "FREE_USER" });
//         res
//             .cookie("token", token, { httpOnly: true })
//             .redirect("/profile")
//     }catch(err){
//         res.json({message: err})
//     }
// })

// router.post("/login",async (req,res) => {
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
//         if(!isPasswordValid){
//             return res.status(401).json({message:"Password is not valid"})
//         }

//         // const isAdmin = (email === "adminCoder@coder.com" && password === "adminCod3r123");

//         // const sessionInfo = {
//         //     email,
//         //     first_name: user.first_name,
//         //     last_name: user.last_name,
//         //     isAdmin,
//         // };

//         // console.log(sessionInfo)
//         // req.session.user = sessionInfo

//         const { first_name, last_name, role } = user;
//         const token = generateToken({ first_name, last_name, email, role });
//         //res.json({ message: "Token", token });
//         res
//           .cookie("token", token, { httpOnly: true })
//           .redirect("/profile")
//     }catch(err){
//         res.status(500).json({message: err})
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
  
router.get("/callback", 
    passport.authenticate("github"), 
    (req, res) => {
    res.redirect("/profile");
});

// SIGNUP - LOGIN - PASSPORT GOOGLE
router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile","email"] }),
);
  
router.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/error",successRedirect:"/profile"})
);



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
            return res.redirect("/")
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