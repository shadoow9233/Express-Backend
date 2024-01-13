import { Router } from "express";
import { loginUser } from "../controllers/user.controllers.js";
import { logoutUser } from "../controllers/user.controllers.js";
import { registerUser } from "../controllers/user.controllers.js";
//Normally we can handle data only so if we handle file we need to upload from multer 
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }, 
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
    )
    router.route("/login").post(loginUser)

    //secured routes
    router.route("/logout").post(verifyJWT,  logoutUser)
export default router
