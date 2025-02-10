import express from "express"
import { deleteScoreBoard, getScoreBoardOfMatch, newScoreBoard, updateBatsmanStats, updateBowlerStats, updateExtras, updateMOM, updateScoreBoard, updateTeamScore } from "../controllers/ScoreBoard.js"
import { adminOnly } from "../middlewares/auth.js"

const app=express.Router()

app.get("/:matchId",getScoreBoardOfMatch)

app.use(adminOnly)
app.post("/new",newScoreBoard)

app.put("/:scoreboardId",updateScoreBoard)
app.put("/mom/:scoreboardId",updateMOM)
app.put("/teamScore/:scoreboardId",updateTeamScore)
app.put("/batsManStat/:scoreboardId",updateBatsmanStats)
app.put("/bowlerStat/:scoreboardId",updateBowlerStats)
app.put("/extras/:scoreboardId",updateExtras)

app.delete("/:matchId",deleteScoreBoard)


export default app 