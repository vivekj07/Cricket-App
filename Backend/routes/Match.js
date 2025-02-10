import express from "express"
import { deleteMatch, getAllMatches, getAllMatchesOfLeague, getMatchDetails, getMatchesByStatus, newMatch, updateMatch, updatePlayersStats, updateResultOfMatch } from "../controllers/Match.js"
import { adminOnly } from "../middlewares/auth.js"

const app=express.Router()
app.get("/all",getAllMatches)
app.get("/status",getMatchesByStatus)
app.get("/allLeague/:id",getAllMatchesOfLeague)
app.get("/:id",getMatchDetails)

app.use(adminOnly)
app.post("/new",newMatch)

app.put("/playerStats",updatePlayersStats)
app.put("/result/:id",updateResultOfMatch)
app.put("/:id",updateMatch)

app.delete("/:id",deleteMatch)


export default app 