import express from "express"
import { deletePointsTable, getPointsTable, newPointTable, updatePTForTeam, updatePTForTeamDirectly } from "../controllers/PointsTable.js"
import { adminOnly } from "../middlewares/auth.js"

const app=express.Router()

app.get("/:leagueId",getPointsTable)

app.use(adminOnly)
app.post("/new/:leagueId",newPointTable)

app.put("/update/:id",updatePTForTeam)
app.put("/update/direct/:id",updatePTForTeamDirectly)

app.delete("/delete/:leagueId",deletePointsTable)


export default app 