import db from "../models/index.js";
import customError from "../utils/customErrorHandler.js";
const User = db.User;
export async function findAuthorById(req, res, next) {
  try {
    const author = await User.findByPk(req.userId);
    if (!author) {
      throw customError("Invalid author!", 400);
    }
    next();
  } catch (error) {
    next(error);
  }
}
