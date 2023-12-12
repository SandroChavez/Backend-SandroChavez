import express from "express";
import exphbs from "express-handlebars"
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParse from "cookie-parser"
import passport from "passport";
import { Server } from "socket.io"
import { __dirname } from "./util.js";
import SocketService from "./socket.js"

//Rutas
import productsRoute from "./routes/products.route.js"
import viewsRoute from "./routes/views.route.js"
import sessionsRoute from "./routes/sessions.route.js"
import cartsRoute from "./routes/carts.route.js"

import "./dao/db/configDB.js"

import "./passport.js"


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"))
app.use(cookieParse("secretCookieMyDesafio"))


//Mongo
const URI = process.env.URI_MONGO_DB

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

//Handlebars
const hbs = exphbs.create({
    runtimeOptions: {
      allowProtoPropertiesByDefault: true
    },
    // helpers: {
    //     handlebarsHelpers
    // }
});
app.engine("handlebars", hbs.engine)
app.set("view engine","handlebars")
app.set("views",__dirname + "/views")


//Rutas
app.use("/api/products",productsRoute)
app.use("/api/sessions",sessionsRoute)
app.use("/api/carts",cartsRoute)
app.use("/",viewsRoute)

const PORT = 8080

const httpServer = app.listen(PORT, () => {
    console.log("escuchando el puerto",PORT)
    console.log(`http://localhost:${PORT}`)
})

const serverSocket = new SocketService(httpServer)
serverSocket.socketEvents()


// const socketServer = new Server(httpServer)

// socketServer.on("connection", (socket) => {

//     //Chat
//     socket.on("enviarMensaje", async({messageData}) => {
//         try{
//             await messagesManager.createMessage(messageData)

//             const messesages = await messagesManager.findLimit(10)

//             socketServer.emit("actualizarMensajes",(messesages))
//         }catch(err){
//             return console.log(err)
//         }            
//     })
//     socket.on("EliminarChat", async() => {
//         try{
//             await messagesManager.delateMessages()
//         }catch(err){
//             return err
//         }
//     })
// });