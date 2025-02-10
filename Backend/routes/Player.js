import express from "express"
import { bulkUploadPlayers, deletePlayer, getAllPlayers, getPlayerById, newPlayer, searchPlayerByName, updatePlayer } from "../controllers/Player.js"
import { singleImage } from "../middlewares/multer.js"
import { adminOnly } from "../middlewares/auth.js"

const app=express.Router()

app.get("/all",getAllPlayers)
app.get("/:id",getPlayerById)
app.get("/search",searchPlayerByName)

app.use(adminOnly)
app.post("/new",singleImage,newPlayer)
app.post("/new/bulkupload",singleImage,bulkUploadPlayers)

app.put("/update/:id",singleImage,updatePlayer)

app.delete("/delete/:id",deletePlayer)


export default app 