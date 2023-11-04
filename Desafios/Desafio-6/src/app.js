import express from "express"
import exphbs from "express-handlebars"
import { Server } from "socket.io"
import cookieParse from "cookie-parser"

//Rutas
import productsRoute from "./routes/products.route.js"
import cartsRoute from "./routes/carts.route.js"
import viewsRoute from "./routes/views.route.js"
import messagesRoute from "./routes/messages.route.js"

import { messagesManager } from "./managers/messages.manager.js";

import { __dirname } from "./util.js"

import "./dao/db/configDB.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"))
app.use(cookieParse("MyDesafio6"))

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
app.use("/",viewsRoute)

//Puerto
const PORT = 8080

const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`);
    console.log(`http://localhost:${PORT}/products`)
})

const socketServer = new Server(httpServer)

socketServer.on("connection", (socket) => {
    console.log(`Cliente conectado: ${socket.id}`)
    socket.on("disconnect",() => {
        console.log(`cliente desconectado: ${socket.id}`)
    })

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
