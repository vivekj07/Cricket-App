import express from "express"
import { adminOnly } from "../middlewares/auth.js"
import { deleteContactUSData, getContactUSData, newContactUSData } from "../controllers/ContactUS.js"
import { deleteFile, getAllFiles, newfilesUpload } from "../controllers/FileUpload.js"
import { multiFile } from "../middlewares/multer.js"

const app=express.Router()

app.get("/all",getAllFiles)

app.use(adminOnly)
app.post("/new",multiFile,newfilesUpload)
app.delete("/delete",deleteFile)

export default app 