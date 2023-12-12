import mongoose from "mongoose"
import { getObjEnv } from "../../util.js"

const URI = getObjEnv().URI_MONGO_DB

mongoose
    .connect(URI)
    .then(() => console.log("Conectado con DB"))
    .catch((err) => console.log(err))