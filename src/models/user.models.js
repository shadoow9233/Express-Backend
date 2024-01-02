import bcrypt from "bcrypt"
import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema({
  username: {
    type:String,
    require:true,
    unique:true,
    lowercase:true,
    trim:true,
    index:true,
  },
  email: {
    type:String,
    require:true,
    unique:true,
    lowercase:true,
    trim:true,
  },
  fullName: {
    type:String,
    require:true,
    trim:true,
    index:true,
  },
  //we use cloud url for import image
  avatar:{
    type:String,
    require:true,

  },
  coverImage:{
    type:String,
    require:true,
  },
  watchHistory:{
    type:String,
    require:[true,'password is required']
  },
  refreshToken:{
    type:String,
     
  }

},{timestamps:true});

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User", userSchema);
