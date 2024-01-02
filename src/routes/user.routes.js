import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";
//Normally we can handle data only so if we handle file we need to upload from multer 
import {upload} from "../middlewares/multer.middleware.js"
const router = Router()
router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1

         },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser)
export default router
