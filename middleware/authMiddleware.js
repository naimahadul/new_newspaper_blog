import db from "../models/index.js";
const User = db.User;
export async function findAuthorById(req, res, next) {
  try {
    const author = await User.findByPk(req.userId);
    if (!author) {
      const error = new Error("Invalid author!");
      error.statusCode = 400;
      throw error;
    }
    next();
  } catch (error) {
    next(error);
  }
}
