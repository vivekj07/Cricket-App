import jwt from "jsonwebtoken"
import { ErrorHandler } from "./error.js"
import { User } from "../models/User.js"

export const isAuthenticated = (req, res, next) => {
    console.log("auth middleware")
    const token = req.cookies[`cricketApp-user-token`]

    if (!token) return next(new ErrorHandler("Please Login first", 400))

    const data = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = data._id
    next()
}

export const adminOnly = async (req, res, next) => {
    console.log("admin middleware")

    const token = req.cookies[`cricketApp-user-token`]
    if (!token) return next(new ErrorHandler("Please Login first", 400))
    
    let user= await User.findById(req.userId)
    if (!user) return next(new ErrorHandler("User Not Found!", 400))
    
    if(!user.isAdmin) next(new ErrorHandler("You Cannot Access this Data!", 400))

    next()
}
