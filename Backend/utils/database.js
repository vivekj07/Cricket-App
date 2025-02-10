import mongoose from "mongoose"

const connectDB=()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Database connected Successfully...")
    })
    .catch((err)=>{
        console.log("Database connection Failed...")
    })
}

export {connectDB}