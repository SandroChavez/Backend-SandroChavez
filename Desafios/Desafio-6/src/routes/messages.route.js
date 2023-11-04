import { Router } from "express";
import { messagesManager } from "../managers/messages.manager.js";

const router = Router()

router.post("/",async (req,res) => {
    try{
        await messagesManager.createMessage(req.body)
        res
            .status(200)
            .redirect("/chat")
    }catch(err){
        res.status(500).json({ error: err.message });
    }
})

export default router