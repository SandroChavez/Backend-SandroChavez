import { Router } from "express";

const router = Router()

router.post("/", (req,res) => {
    const {firstName, lastName} = req.body
    req.session.firstName = firstName
    req.session.lastName = lastName
})