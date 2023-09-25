import dotenv from "dotenv";
import { signupUser, loginUser } from "../services/authService.js";
import { sendResponse } from "../utils/response.js";
dotenv.config();

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
    sendResponse(req, res, SignUpDto, 201);
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const info = {
      username: req.body.username,
      password: req.body.password,
    };
    const { token } = await loginUser(info);
    sendResponse(req, res, token, 201);
  } catch (error) {
    next(error);
  }
}
