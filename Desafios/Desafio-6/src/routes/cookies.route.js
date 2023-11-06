import { Router } from "express";

const route = Router()

route.post("/", (req,res) => {
    const {firstName, lastName} = req.body
    req.sessions.firstName = firstName
    req.sessions.lastName = lastName
})