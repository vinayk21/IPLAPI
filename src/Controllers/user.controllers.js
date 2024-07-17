const { createErrors } = require("../Constants/apiErrors");
const { uploadFileOnCloudnary } = require("../Middlewere/file.upload");
const { User } = require("../Models/user.model.js");
const asyncHandler = require('express-async-handler');
const {ApiResponce} = require("../Constants/apiResponce.js")

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

module.exports = { registerUser };
