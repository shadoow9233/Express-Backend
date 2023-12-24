// require('dotenv').config({path:'./env'})
import connectDB from "./db/index.js"
import dotenv from "dotenv"
dotenv.config({
    path:'./env'
})
connectDB()

// import connectDB from "./db";
// import { Mongoose } from "mongoose";
// import { DB_NAME } from "./constants";
// import express from "express"
// const app=express();

// //first approach
// ;(async()=>{
//     try{
//         await Mongoose.connect(`{process.env.MONGODB_URI}/${DB_NAME}`)
//         // for app connect
//         app.on("error",()=>{
//             console.log("app is not connect with database",error)
//             throw error
//         })
//         app.listen(process.env.PORT,()=>{
//             console.log(`App is listening on port ${process.env.PORT}`)
//         })
//     }catch(error){
//         console.log("ERROR",error)
//         throw err
//     }

// })()
// //first approach end