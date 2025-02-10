import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import { v2 as cloudinary } from "cloudinary"
import cookieParser from "cookie-parser";
import cors from "cors"
import morgan from "morgan"



import leagueRoute from "./routes/League.js"
import teamRoute from "./routes/Team.js"
import playerRoute from "./routes/Player.js"
import matchRoute from "./routes/Match.js"
import scoreBoardRoute from "./routes/ScoreBoard.js"
import venueRoute from "./routes/Venue.js"
import umpireRoute from "./routes/Umpire.js"
import pointsTableRoute from "./routes/PointsTable.js"
import userRoute from "./routes/User.js"
import { connectDB } from "./utils/database.js"
import { errorMiddleware } from "./middlewares/error.js"
import { isAuthenticated } from "./middlewares/auth.js";

const app = express()

dotenv.config({
    path:"./.env",
})
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const port = process.env.PORT || 4000
connectDB()

app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors({
  origin:['http://localhost:5173', 'http://localhost:4173',process.env.CLIENT_URL],
  methods:["GET", "POST", "PUT", "DELETE"],
  credentials:true
}))
app.use(morgan("tiny"))


app.use("/api/v1/user",userRoute)

// app.use(isAuthenticated)
app.use("/api/v1/leagues",isAuthenticated,leagueRoute)
app.use("/api/v1/teams",isAuthenticated,teamRoute)
app.use("/api/v1/player",isAuthenticated,playerRoute)
app.use("/api/v1/match",isAuthenticated,matchRoute)
app.use("/api/v1/scoreBoard",isAuthenticated,scoreBoardRoute)
app.use("/api/v1/venue",isAuthenticated,venueRoute)
app.use("/api/v1/umpire",isAuthenticated,umpireRoute)
app.use("/api/v1/pointsTable",isAuthenticated,pointsTableRoute)


app.use(errorMiddleware)
app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})