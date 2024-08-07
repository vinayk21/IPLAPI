const { createErrors } = require("../Constants/apiErrors");
const { uploadFileOnCloudnary } = require("../Middlewere/file.upload");
const { User } = require("../Models/user.model.js");
const asyncHandler = require('express-async-handler');
const {ApiResponce} = require("../Constants/apiResponce.js")

const generateAccessTokenAndgenerateRefressToken = async(userId) =>{
  
  try {
    const user = await User.findById(userId)
    const accsesToken = await user?.accsessToken(); 
    const refreshToken = await user?.RefreshToken();
    // console.log("refreshToken",refreshToken);
    // console.log("accsesToken",accsesToken);
       
    user.refreshToken = refreshToken;
    const logedInUser = await user.save({validateBeforeSave: false})
       return {accsesToken, refreshToken}  
     } catch (error) {
        throw new createErrors(500,"something went wrong")
     }
}


const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password, fullName } = req.body;

  if ([userName, email, password, fullName].some((fields) => fields === "")) {
    throw new createErrors(400, "All Field are Required");
  }
  let isExistedUser = await User.findOne({
    $or: [{ email }, { userName }],
  });

  if (isExistedUser) {
     throw createErrors(409, "user Already Existed");
  }
  
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath =  req.files?.coverImage ? req.files?.coverImage[0]?.path : "";
  if (!avatarLocalPath) {
    throw new createErrors(400, "avatar file required");
  }

  const avatarUploded = await uploadFileOnCloudnary(avatarLocalPath);
  const coverImageUploded = await uploadFileOnCloudnary(coverImageLocalPath);
  if(!avatarUploded){
    throw new Error("url not getting")
  }
  const user = await User.create({
    fullName:fullName,
    avatar: avatarUploded?.url,
    coverImage: coverImageUploded?.url || "",
    email:email,
    password:password,
    userName: userName,
  });

  const isUserCreated = await User.findById(user._id).select("-password -RefreshTOken")
   if(!isUserCreated){
      throw new createErrors(500, "something went wrong while creating User")
   }

   return res.status(201).json( new ApiResponce(
    200,isUserCreated, "User Registred Successfully"
   ))
});

const loginUser = asyncHandler(async (req,res)=>{
   const { userName, email, password} = req.body
   console.log("email",email);
   
   if(!userName || !email){
    throw new createErrors(400,"userName and email are reqiured")
   }
    
   const user = await User.findOne({
    $or:[{userName},{email}]
   })
    
   if(!user){
     throw new createErrors(404,"user is not found")
    }
    
    const isPasswordValid = await user.isPasswordCorrect(password)
    
    if(!isPasswordValid){
      throw  createErrors(400,"credantical are not valid")
    }
    
    const {accsesToken, refreshToken} =  await generateAccessTokenAndgenerateRefressToken(user._id)
    console.log("accsesToken",accsesToken);

  const loggenInUser = await User.findById(user._id).select("-password,-refreshToken")
   console.log("loged",loggenInUser);
   
  const options ={
    httpOnly:true,
    secure:true
  }

  return res.
  status(200).
  cookie("accsesToken",accsesToken,options).
  cookie("refreshToken",refreshToken,options).
  json({
    message: "User logged in successfully",
    user: loggenInUser,
    accsesToken,
    refreshToken
  })

})

const logoutUser = asyncHandler(async(req, res)=>{
  const user = await User.findByIdAndUpdate(
    req.user._id,{
      $set:{
        refreshToken:"updated"
      }
    },
    {
      new:true
    }
  )
  
  console.log("req.user",user);
  const options ={
          httpOnly:true,
          secure:true
        }
  console.log("user",user);
  
  return res.
        status(200).
        clearCookie("accsesToken",options).
        clearCookie("refreshToken",options).
        json(
          new ApiResponce(200,{},"User logged out")
        )            

})

module.exports = { registerUser, loginUser, logoutUser};
