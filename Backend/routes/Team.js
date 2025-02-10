import express from "express"
import { addTeamPlayers, deleteTeam, getAllTeams, getTeamById, makeCaptain, newTeam, searchTeamByName, updateTeam, updateTeamPerformance, updateTeamPlayers } from "../controllers/Team.js"
import { singleImage } from "../middlewares/multer.js"
import { adminOnly } from "../middlewares/auth.js"

const app=express.Router()

app.get("/all",getAllTeams)
app.get("/search",searchTeamByName)
app.get("/:id",getTeamById)

app.use(adminOnly)
app.post("/new",singleImage,newTeam)
app.put("/update/:id",singleImage,updateTeam)
app.put("/player/update/:id",updateTeamPlayers)
app.put("/update/captain/:id",makeCaptain)
app.put("/update/performance/:id",updateTeamPerformance)
app.put("/players/update/:id",addTeamPlayers)
app.delete("/delete/:id",deleteTeam)


export default app 