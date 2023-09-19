import validator from "../utils/validator.js";
import db from "../models/index.js";
import customError from "../utils/customErrorHandler.js";
const User = db.User;

export default async function validationMiddleware(req, res, next) {
  try {
    if (!validator.isUsernameValid(req.body.username)) {
      throw customError("username must be 4 characters long!", 400);
    }
    if (!validator.isEmailValid(req.body.email)) {
      throw customError("Email is invalid!", 400);
    }
    if (!validator.isPasswordValid(req.body.password)) {
      throw customError("password must be 8 characters long!", 400);
    }
    const username = req.body.username;
    const existingUser1 = await User.findOne({ where: { username } });
    if (existingUser1) {
      throw customError("Username has already been taken!", 400);
    }
    const email = req.body.email;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw customError("Email has already been taken!", 400);
    }
    next();
  } catch (error) {
    next(error);
  }
}
