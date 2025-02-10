import express from "express"
import { deleteVenue, getAllVenues, getVenue, newVenue, searchVenueByCityOrName, updateVenue } from "../controllers/Venue.js"
import { adminOnly } from "../middlewares/auth.js"

const app=express.Router()

app.get("/all",getAllVenues)
app.get("/search",searchVenueByCityOrName)
app.get("/:id",getVenue)


app.use(adminOnly)
app.post("/new",newVenue)

app.put("/:id",updateVenue)

app.delete("/:id",deleteVenue)


export default app 