import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../models/index.js";
dotenv.config();
const User = db.User;

// Signup user function
export async function signupUser(info) {
  try {
    const hashedPassword = await bcrypt.hash(info.password, 10);
    info.password = hashedPassword;
    const newUser = await User.create(info);
    return newUser;
  } catch (error) {
    throw error;
  }
}

// Login user function
export async function loginUser(info) {
  try {
    const username = info.username;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    const passwordMatch = await bcrypt.compare(info.password, user.password);
    if (!passwordMatch) {
      const error = new Error("Incorrect password");
      error.statusCode = 400;
      throw error;
    }
    const token = jwt.sign({ userId: user.authorId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return { token };
  } catch (error) {
    throw error;
  }
}
