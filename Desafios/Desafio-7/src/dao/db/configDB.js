import mongoose from "mongoose"

const URI = "mongodb+srv://sandrochavez1204:san.cha.vic.1204.*@base1.9ojzdjm.mongodb.net/FenixStore?retryWrites=true&w=majority"

mongoose
    .connect(URI)
    .then(() => console.log("Conectado con DB"))
    .catch((err) => console.log(err))