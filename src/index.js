// require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import app from './app.js'
dotenv.config({
    path: './.env'
})



connectDB()
.then(() => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
        console.log(`Server is running at port: ${PORT}`);
    });
})
.catch((err) => {
    console.error("MongoDB connection failed:", err);
});

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