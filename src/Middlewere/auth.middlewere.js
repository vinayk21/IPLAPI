const { createErrors } = require("../Constants/apiErrors");
const jwt = require("jsonwebtoken");
const { User } = require("../Models/user.model");

const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accsesToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    console.log("token", token);
    if (!token) {
      throw new createErrors(401, "Unauthorized request");
    }

    try {
      console.log("secret", process.env.ACCSESS_TOKEN_SECRET);

      const decodeToken = jwt.verify(token, process?.env?.ACCSESS_TOKEN_SECRET);
      const user = await User.findById(decodeToken._id).select(
        "-password -refreshToken"
      );
      if (!user) {
        throw new createErrors(401, "Invalid Accsess Token");
      }
      req.user = user;
      console.log("user", user);
      next();
    } catch (error) {
      console.log("errors", error);
    }
  } catch (error) {
    throw new createErrors(401, error?.message || "Invalid accsesToken");
  }
};

module.exports = { verifyJWT };
