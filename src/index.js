import { Mongoose } from "mongoose";
import { DB_NAME } from "./constants";
import express from "express"
const app=express();
;(async()=>{
    try{
        await Mongoose.connect(`{process.env.MONGODB_URI}/${DB_NAME}`)
        // for app connect
        app.on("error",()=>{
            console.log("app is not connect with database",error)
            throw error
        })
        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on port ${process.env.PORT}`)
        })
    }catch(error){
        console.log("ERROR",error)
        throw err
    }

})()