import express from "express"
import { getAllUsers, getMyProfile, login, logout, newUser, updateProfile } from "../controllers/User.js"
import { singleImage } from "../middlewares/multer.js"
import { adminOnly, isAuthenticated } from "../middlewares/auth.js"

const app=express.Router()

app.post("/login",login)
app.post("/new",singleImage,newUser)

app.use(isAuthenticated)
app.get("/profile",getMyProfile)

app.post("/logout",logout)

app.put("/profile/update",updateProfile)

app.use(adminOnly)
app.get("/all",getAllUsers)


export default app 