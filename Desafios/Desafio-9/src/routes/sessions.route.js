import { Router } from "express";
import passport from "passport";

const route = Router()

route.post(
    "/signup",
    passport.authenticate("signup", {
      successRedirect: "/profile",
      failureRedirect: "/error",
    })
);
  
route.post(
    "/login",
    passport.authenticate("login", {
      successRedirect: "/profile",
      failureRedirect: "/error",
    })
);

// SIGNUP - LOGIN - PASSPORT GITHUB
route.get(
    "/auth/github",
    passport.authenticate("github", { scope: ["user:email"] })
  );
  
route.get("/callback", 
    passport.authenticate("github"), 
    (req, res) => {
    res.redirect("/profile");
});

// SIGNUP - LOGIN - PASSPORT GOOGLE
route.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile","email"] }),
);
  
route.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/error",successRedirect:"/profile"})
);

route.get("/logout", (req, res) => {
    req.session.destroy(() => {
      res.redirect("/login");
    });
});

export default route