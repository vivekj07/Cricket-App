import express from "express"
import { addTeams, deleteLeague, getAllLeagues, getLeagueDetails, newLeague, removeTeam, updateLeague } from "../controllers/League.js"
import { adminOnly } from "../middlewares/auth.js"
const app=express.Router()


app.get("/all",getAllLeagues)
app.get("/:id",getLeagueDetails)

app.use(adminOnly)
app.post("/new",newLeague)

app.delete("/delete/:id",deleteLeague)

app.put("/update/:id",updateLeague)
app.put("/update/addteams/:id",addTeams)
app.put("/update/removeteam/:id",removeTeam)

export default app 