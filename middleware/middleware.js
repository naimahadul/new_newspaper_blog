import jwt from "jsonwebtoken";
import customError from "../utils/customErrorHandler.js";
import dotenv from "dotenv";
dotenv.config();

export async function verifyToken(req, res, next) {
  try {
    const token = req.token;
    const authdata = jwt.verify(req.token, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    if (!authdata) {
      return next(customError("Invalid token!", 400));
    }
    req.userId = authdata.userId;
    next();
  } catch (error) {
    next(error);
  }
}
