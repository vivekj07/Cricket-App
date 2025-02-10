import express from "express"
import { deleteUmpire, getAllUmpires, getUmpireDetails, newUmpire, searchUmpireByName, updateUmpire } from "../controllers/Umpire.js"
import { singleImage } from "../middlewares/multer.js"
import { adminOnly } from "../middlewares/auth.js"

const app=express.Router()

app.get("/all",getAllUmpires)
app.get("/:id",getUmpireDetails)
app.get("/search",searchUmpireByName)

app.use(adminOnly)
app.post("/new",singleImage,newUmpire)

app.put("/:id",singleImage,updateUmpire)

app.delete("/:id",deleteUmpire)


export default app 