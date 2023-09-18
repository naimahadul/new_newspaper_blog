import express from "express";
const router = express.Router();
import { findAll } from "../controllers/paginationControllers.js";
import ErrorHandler from "../middleware/errorHandler.js";

router.get("/", ErrorHandler, findAll);

export default router;
