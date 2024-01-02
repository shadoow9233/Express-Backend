import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.models.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser=asyncHandler(async(req,res)=>{

    //1.get user details from frontend
    //2. validation - not empty
    // 3.check user is already exits or not (username and email)
    // 4.check images for avatar
    // 5 upload them to cloudnary avatar
    // 6.create a user object 
    // 7. create a user object and enter in database 
    //8.remove password and refresh token field from response
    // 9. check for user creation 
    //10. return response

     //1.get user details from frontend
    const {fullName, email, username, password } = req.body
    console.log("email: ", email);
    //2. use some method in spite of map methods
    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    //3.check user is already exits or not (username and email)
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    //4.
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
     if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    //upload for cloudnary
     
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    
    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }
    const user=await User.create({
        fullName,
        avatar:avatar.url,
        coverImage: coverImage?.url || "",
        email, 
        password,
        username: username.toLowerCase()
    })
    // - means remove the fields 

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

   // for communicate with database we only have user at this time


    // let coverImageLocalPath;
    // if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
    //     coverImageLocalPath = req.files.coverImage[0].path
    // }
    

  

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }
   
    

})
export {registerUser}