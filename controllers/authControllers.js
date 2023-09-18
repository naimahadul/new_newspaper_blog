import dotenv from "dotenv";
import { signupUser, loginUser } from "../services/authService.js";
import { sendResponse } from "../utils/response.js";
dotenv.config();

// Signup
export async function signup(req, res, next) {
  try {
    const info = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    const newUser = await signupUser(info);
    const SignUpDto = {
      username: newUser.username,
      email: newUser.email,
    };
    sendResponse(res, SignUpDto, 201);
  } catch (error) {
    next(error);
  }
}

// Login
export async function login(req, res, next) {
  try {
    const info = {
      username: req.body.username,
      password: req.body.password,
    };
    const { token } = await loginUser(info);
    sendResponse(res, token, 201);
  } catch (error) {
    next(error);
  }
}
