import passport from "passport"
import { usersManager } from "./managers/users.manager.js"
import { cartsManager } from "./managers/carts.manager.js";
import { Strategy as LocalStrategy } from "passport-local"
import { Strategy as GithubStrategy } from "passport-github2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { hashData, compareData, generateNewCart } from "./util.js";
import { config } from "dotenv"

config()

passport.use(
    "signup",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, email, password, done) => {
        const { first_name, last_name } = req.body;
        if (!first_name || !last_name || !email || !password) {
          return done(null, false);
        }
        try {
          const hashedPassword = await hashData(password);
          const createdUser = await usersManager.createOne({
            ...req.body,
            password: hashedPassword,
            carts: [generateNewCart()]
          });
          done(null, createdUser);
        } catch (error) {
          done(error);
        }
      }
    )
);

passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        if (!email || !password) {
          done(null, false);
        }
        try {
          const user = await usersManager.findByEmail(email);;
          if (!user) {
            done(null, false);
          }

          const isPasswordValid = await compareData(password, user.password);
          if (!isPasswordValid) {
            return done(null, false);
          }
          // const sessionInfo =
          //   email === "adminCoder@coder.com"
          //     ? { email, first_name: user.first_name, isAdmin: true }
          //     : { email, first_name: user.first_name, isAdmin: false };
          // req.session.user = sessionInfo;
          
          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
);

// github
passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/api/sessions/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const userDB = await usersManager.findByEmail(profile._json.email);
          // login
          if (userDB) {
            if (userDB.isGithub) {
              return done(null, userDB);
            } else {
              return done(null, false);
            }
          }
          
          // signup
          const infoUser = {
            first_name: profile._json.name.split(" ")[0], // ['farid','sesin']
            last_name: profile._json.name.split(" ")[1],
            email: profile._json.email,
            password: " ",
            isGithub: true,
            carts: [await generateNewCart()]
          };
          const createdUser = await usersManager.createOne(infoUser);
          done(null, createdUser);
        } catch (error) {
          done(error);
        }
      }
    )
);

// google
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/api/sessions/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {

      try {
        const userDB = await usersManager.findByEmail(profile._json.email);
        // login
        if (userDB) {
          if (userDB.isGoogle) {
            console.log("userDB.isGoogle",true)
            return done(null, userDB);
          } else {
            return done(null, false);
          }
        }
        
        // signup
        const infoUser = {
          first_name: profile._json.given_name, // ['farid','sesin']
          last_name: profile._json.family_name.split(" ")[0],
          email: profile._json.email,
          password: " ",
          isGoogle: true,
          cartsManager:[await generateNewCart()]
        };
        console.log(infoUser)
        // const createdUser = await usersManager.createOne(infoUser);
        done(null, createdUser);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    try{
        const user = await usersManager.findById(id)
        done(null,user)
    }catch(err){
        done(err)
    }
})