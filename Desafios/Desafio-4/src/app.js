import express from "express";
import {engine} from "express-handlebars";
import { __dirname } from "./util.js";
import productsRenderRoute from "./routes/productsRender.router.js"
import productsApiRoute from "./routes/productsApi.router.js"
import { Server } from "socket.io"

const app = express();
const port = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"))

//handlebars
app.engine("handlebars", engine())
app.set("view engine","handlebars")
app.set("views",__dirname + "/views")

app.use("/api/products",productsApiRoute)
app.use("/products",productsRenderRoute)
app.use("/realTimeProducts",productsRenderRoute)

//PUERTO
const httpServer = app.listen(port,() => {
    console.log("escuchando el puerto 8080")
})

const socketServer = new Server(httpServer)

socketServer.on("connection", (socket) => {
    console.log(`cliente conectado: ${socket.id}`)
    socket.on("disconnect",() => {
        // console.log(`cliente desconectado: ${socket.id}`)
    })

    socket.on("enviarProducto",async ({path,product}) => {
        try{
            const url = "http://localhost:8080/api/products"

            const opciones = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            };

            const responsePost = await fetch(url,opciones)
            
            if(!responsePost.ok){
                return
            }

            //Comprobamos que no se este enviando desde la ruta products
            if(path == "/products"){
                return
            }
            
            const responseGet = await fetch(url)

            const dataResponse = await responseGet.json()
            
            const products = dataResponse.products

            socketServer.emit("ActualizarProducto",{products})
        }catch(err){
            return err
        }
    })
})
