import express from "express";
const router = express.Router();
import { verifyToken } from "../middleware/middleware.js";
import { findAuthorById } from "../middleware/authMiddleware.js";
import { validToken } from "../middleware/tokenValidationMiddleware.js";
import {
  getAllBlogs,
  blogsCreate,
  deleteBlog,
  getAllByAuthor,
  updateBlog,
  getBlogById,
  getBlogsSize,
  getByUsername,
} from "../controllers/blogControllers.js";
import { findBlogById } from "../middleware/blogMiddleware.js";
import ErrorHandler from "../middleware/errorHandler.js";
router.get("/size", getBlogsSize);
router.get("/username/:id",getByUsername);
router.get("/", ErrorHandler, getAllBlogs);
router.post("/", validToken, verifyToken, ErrorHandler, blogsCreate);
router.put(
  "/:id",
  validToken,
  verifyToken,
  findBlogById,
  ErrorHandler,
  updateBlog
);
router.delete(
  "/:id",
  validToken,
  verifyToken,
  findBlogById,
  ErrorHandler,
  deleteBlog
);
router.get(
  "/authorBlogs",
  validToken,
  verifyToken,
  findAuthorById,
  ErrorHandler,
  getAllByAuthor
);
router.get("/:id", findBlogById, ErrorHandler, getBlogById);

export default router;
