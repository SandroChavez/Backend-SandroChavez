const socketClient = io()

const form = document.getElementById("form")

const inputEmail = document.getElementById("email")
const inputMessage = document.getElementById("message")

const listMessages = document.getElementById("messages")

const buttonDeletaChat = document.getElementById("DelateChat")

let path = window.location.pathname;

//Actualizar Chat
form.onsubmit = async(e) => {
    e.preventDefault()

    const email = inputEmail.value
    const message = inputMessage.value

    if(!email || !message){
        return
    }

    const data = {
        messageData:{
            email,
            message
        }
    }
    socketClient.emit("enviarMensaje",data)
    
}
socketClient.on("actualizarMensajes",(messages) => {

    const templateHTML =
  `
  {{#each messages}}
            <li>
                <h4>{{email}}</h4>
                <p>{{message}}</p>
            </li>  
        {{/each}}
  `

  const template = Handlebars.compile(templateHTML);

  listMessages.innerHTML = template( {messages} )

})

//Eliminar chat
buttonDeletaChat.onclick = (e) => {
    e.preventDefault()

    listMessages.innerHTML = ""

    socketClient.emit("EliminarChat")
} 