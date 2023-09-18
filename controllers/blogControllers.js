import dotenv from "dotenv";
import {
  createBlog,
  updateBlogById,
  deleteBlogById,
  getBlogId,
  getAllBlogsByAuthor,
} from "../services/blogService.js";
import { sendResponse } from "../utils/response.js";
dotenv.config();

//blogs create
export async function blogsCreate(req, res, next) {
  try {
    const info = {
      title: req.body.title,
      description: req.body.description,
      authorId: req.userId,
    };
    const blogObject = await createBlog(info);
    sendResponse(res, blogObject, 201);
  } catch (error) {
    next(error);
  }
}

// Update a blog (protected route)
export async function updateBlog(req, res, next) {
  try {
    const info = {
      title: req.body.title,
      description: req.body.description,
      blogId: req.params.id,
    };
    const updatedBlog = await updateBlogById(info);
    sendResponse(res, updatedBlog, 200);
  } catch (error) {
    next(error);
  }
}

// Get Blogs by Author
export async function getAllByAuthor(req, res, next) {
  const authorId = req.userId;
  try {
    const blogs = await getAllBlogsByAuthor(authorId);
    sendResponse(res, blogs, 200);
  } catch (error) {
    next(error);
  }
}

// Get Blog by blogId
export async function getBlogById(req, res, next) {
  const blogId = req.params.id;
  try {
    const blog = await getBlogId(blogId);
    sendResponse(res, blog, 200);
  } catch (error) {
    next(error);
  }
}

//delete blogs
export async function deleteBlog(req, res, next) {
  try {
    const blogId = req.params.id;
    await deleteBlogById(blogId);
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    next(error);
  }
}
