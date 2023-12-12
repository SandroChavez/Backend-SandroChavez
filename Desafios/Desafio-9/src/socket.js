import { Server } from "socket.io";
import { findLimitMessagesService, createMessageService, deleteMessagesService } from "./services/messages.service.js";

class SocketService{
    constructor(server){
        this.socketServer = new Server(server)
    }

    socketEvents(){
        this.socketServer.on("connection", (socket) => {
            //Chat
            socket.on("enviarMensaje", async({messageData}) => {
                try{
                    await createMessageService(messageData)
        
                    const messesages = await findLimitMessagesService()
        
                    this.socketServer.emit("actualizarMensajes",(messesages))
                }catch(err){
                    return console.log(err)
                }            
            })
            socket.on("EliminarChat", async() => {
                try{
                    await deleteMessagesService()
                }catch(err){
                    return err
                }
            })
        });
    }
}

export default SocketService

// const socketServer = new Server(httpServer)

