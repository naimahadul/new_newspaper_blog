import express from "express";
const router = express.Router();
import validationMiddleware from "../middleware/validationMiddleware.js";
import { login, signup } from "../controllers/authControllers.js";
import ErrorHandler from "../middleware/errorHandler.js";

router.post("/signup", validationMiddleware, ErrorHandler, signup);
router.post("/login", ErrorHandler, login);

export default router;
