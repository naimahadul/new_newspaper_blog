import express from "express";
const router = express.Router();
import { verifyToken } from "../middleware/middleware.js";
import { findAuthorById } from "../middleware/authMiddleware.js";
import {
  blogsCreate,
  deleteBlog,
  getAllByAuthor,
  updateBlog,
  getBlogById,
} from "../controllers/blogControllers.js";
import { findBlogById } from "../middleware/blogMiddleware.js";
import ErrorHandler from "../middleware/errorHandler.js";

router.post("/", verifyToken, ErrorHandler, blogsCreate);
router.put("/:id", verifyToken, findBlogById, ErrorHandler, updateBlog);
router.delete("/:id", verifyToken, findBlogById, ErrorHandler, deleteBlog);
router.get(
  "/authorBlogs",
  verifyToken,
  findAuthorById,
  ErrorHandler,
  getAllByAuthor
);
router.get("/:id", verifyToken, findBlogById, ErrorHandler, getBlogById);

export default router;
