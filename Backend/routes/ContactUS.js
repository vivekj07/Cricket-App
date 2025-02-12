import express from "express"
import { adminOnly } from "../middlewares/auth.js"
import { deleteContactUSData, getContactUSData, newContactUSData } from "../controllers/ContactUS.js"

const app=express.Router()

app.post("/new",newContactUSData)

app.use(adminOnly)
app.get("/all",getContactUSData)
app.delete("/:id",deleteContactUSData)

export default app 