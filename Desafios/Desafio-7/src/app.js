import express from "express"
import exphbs from "express-handlebars"
import { Server } from "socket.io"
import cookieParse from "cookie-parser"
import session from "express-session"
import passport from "passport"
// import fileStore from "session-file-store"
import MongoStore from "connect-mongo"

//Rutas
import productsRoute from "./routes/products.route.js"
import cartsRoute from "./routes/carts.route.js"
import viewsRoute from "./routes/views.route.js"
import messagesRoute from "./routes/messages.route.js"
import sessions from "./routes/sessions.route.js"

import { messagesManager } from "./managers/messages.manager.js";

import { __dirname } from "./util.js"

import "./dao/db/configDB.js"

import "./passport.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"))
app.use(cookieParse("secretCookieMyDesafio6"))

//mongo
const URI = "mongodb+srv://sandrochavez1204:san.cha.vic.1204.*@base1.9ojzdjm.mongodb.net/FenixStore?retryWrites=true&w=majority"

app.use(session({
    store: new MongoStore({
        mongoUrl: URI
    }),
    secret:"secretSession",
    cookie:{maxAge: 1000000}
}))

//passport
app.use(passport.initialize())
app.use(passport.session())

//handlebars
const hbs = exphbs.create({
    runtimeOptions: {
      allowProtoPropertiesByDefault: true
    }
});
app.engine("handlebars", hbs.engine)
app.set("view engine","handlebars")
app.set("views",__dirname + "/views")

//Usar Rutas
app.use("/api/products",productsRoute)
app.use("/api/carts",cartsRoute)
app.use("/api/messages",messagesRoute)
app.use("/api/sessions",sessions)
app.use("/",viewsRoute)

//Puerto
const PORT = 8080

const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`);
    console.log(`http://localhost:${PORT}/login`)
})

const socketServer = new Server(httpServer)

socketServer.on("connection", (socket) => {

    //Chat
    socket.on("enviarMensaje", async({messageData}) => {
        try{
            await messagesManager.createMessage(messageData)

            const messesages = await messagesManager.findLimit(10)

            socketServer.emit("actualizarMensajes",(messesages))
        }catch(err){
            return console.log(err)
        }            
    })
    socket.on("EliminarChat", async() => {
        try{
            await messagesManager.delateMessages()
        }catch(err){
            return err
        }
    })
});
