import validator from "../utils/validator.js";
import db from "../models/index.js";
const User = db.User;

export default async function validationMiddleware(req, res, next) {
  try {
    if (!validator.isUsernameValid(req.body.username)) {
      const error = new Error("username must be 4 characters long!");
      error.statusCode = 400;
      throw error;
    }
    if (!validator.isEmailValid(req.body.email)) {
      const error = new Error("Email is invalid!");
      error.statusCode = 400;
      throw error;
    }
    if (!validator.isPasswordValid(req.body.password)) {
      const error = new Error("password must be 8 characters long!");
      error.statusCode = 400;
      throw error;
    }
    const username = req.body.username;
    const existingUser1 = await User.findOne({ where: { username } });
    if (existingUser1) {
      const error = new Error("Username has already been taken!");
      error.statusCode = 400;
      throw error;
    }
    const email = req.body.email;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      const error = new Error("Email has already been taken!");
      error.statusCode = 400;
      throw error;
    }
    next();
  } catch (error) {
    next(error);
  }
}
