import jwt from "jsonwebtoken";
import customError from "../utils/customErrorHandler.js";
import dotenv from "dotenv";
dotenv.config();

//verifytoken
export async function verifyToken(req, res, next) {
  try {
    const token = req.token;
    jwt.verify(token, process.env.JWT_SECRET, (err, authdata) => {
      if (err) {
        throw customError("Invalid token!", 400);
      }
      req.userId = authdata.userId;
      next();
    });
  } catch (error) {
    next(error);
  }
}
