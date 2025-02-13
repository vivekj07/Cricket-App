import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { ErrorHandler } from "../middlewares/error.js";
import { uploadFlilesToCloudinary } from "../utils/features.js";
import { User } from "../models/User.js";


const newUser = async (req, res, next) => {
  try {
    const { name, username, password} = req.body;
    const file = req.file;

    if (!file) return next(new ErrorHandler("Please add photo", 400));
    if (!name || !username || !password) {
      return next(new ErrorHandler("Please Enter all fields", 400));
    }

    const results = await uploadFlilesToCloudinary([file], "CricketApp/UserProfiles");

    const photo = {
      public_id: results[0].public_id,
      url: results[0].url,
    };

    const user = await User.create({
      name,
      username,
      password,
      photo, 
    });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 15 * 60 * 60 * 1000, 
    };

    return res
      .status(201)
      .cookie("cricketApp-user-token", token, cookieOptions)
      .json({
        success: true,
        message: `Welcome ${user.name}`,
        user,
      });

  } catch (err) {
    if (err.code === 11000) {
      err.message = "Username already exists";
    }
    next(err);
  }
};

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return next(new ErrorHandler("Please Enter all fields", 400))

        const user = await User.findOne({ username }).select("+password")
        if (!user) return next(new ErrorHandler("Invalid Username", 400))
        const checkedPassword = await bcrypt.compare(password, user.password)
        if (!checkedPassword) return next(new ErrorHandler("Invalid Password", 400))

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 10 * 60 * 60 * 1000
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
        return res.status(200).cookie("cricketApp-user-token", token, cookieOptions).json({
            success: true,
            message: `Welcome back ${user.name}`,
            user
        })
    } catch (err) {
        next(err)
    }
}

const logout = async (req, res, next) => {
    try {

        const user = await User.findById(req.userId)

        if (!user) return next(new ErrorHandler("Login First"))
        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 0
        }
        return res.status(200).cookie("cricketApp-user-token", "", cookieOptions).json({
            success: true,
            message: `Logged out successfully `
        })
    } catch (err) {
        next(err)
    }
}

const getMyProfile = async (req, res, next) => {
    try {

        const user = await User.findById(req.userId)

        if (!user) return next(new ErrorHandler("Please Relogin and try again"))

        return res.status(200).json({
            success: true,
            user
        })
    } catch (err) {
        next(err)
    }
}

const updateProfile = async (req, res, next) => {
    try {
        const { name, username, password } = req.body
        const file = req.file
        if (!name || !username || !bio) return next(new ErrorHandler("Please Enter all fields", 400))

        let photo;
        if (file){
            const results = await uploadFlilesToCloudinary([file],"CricketApp/UserProfiles")

            photo = {
                public_id: results[0].public_id,
                url: results[0].url
            }
        }

        const user = await User.findById(req.userId)

        if (!user) return next(new ErrorHandler("Please Relogin and try again"))

        const photoId=[user.photo?.public_id]
        user.name=name;
        user.username=username;
        if(password){
            user.password=password;
        }
        if(photo){
            user.photo=photo
        }

        await user.save();

        deleteFilesFromCloudinary(avatarId)

        return res.status(200).json({
            success: true,
            message: `Profile Updated`,
            user
        })
    } catch (err) {
        if (err.code === 11000) {
            err.message = "Username already exist"
        }
        next(err)
    }
}

const getAllUsers = async (req, res, next) => { 
    try {
        const users = await User.find().sort({ createdAt: -1 })
        return res.status(200).json({
            success: true,
            users
        })
    } catch (err) {
        next(err)
    }
}



export {
    getMyProfile,
    newUser, login, logout,updateProfile, getAllUsers
}
