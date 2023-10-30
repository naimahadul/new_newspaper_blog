import {
  findAllBlogs,
  createBlog,
  updateBlogById,
  deleteBlogById,
  getBlogId,
  getAllBlogsByAuthor,
} from "../services/blogService.js";
import sendResponse from "../utils/response.js";
import blogService from "../services/blogService.js";
import db from "../models/index.js";
const Blog = db.Blog;
export async function getAllBlogs(req, res, next) {
  try {
    const page = Number.parseInt(req.query.page);
    const size = Number.parseInt(req.query.size);
    const blogs = await blogService.findAllBlogs(page, size);

    return sendResponse(req, res, blogs, 200);
  } catch (err) {
    next(err);
  }
}

export async function getBlogsSize(req, res) {
  try {
    const count = await Blog.count();
    res.status(200).json({ count });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while getting blog size." });
  }
}

export async function getByUsername(req, res) {
  const authorId = req.params.id;
  try {
    const username = await blogService.getUsername(authorId);
    res.status(200).json(username);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while getting blog size." });
  }
}

export async function blogsCreate(req, res, next) {
  try {
    const info = {
      title: req.body.title,
      description: req.body.description,
      authorId: req.userId,
    };
    const blogObject = await blogService.createBlog(info);
    return sendResponse(req, res, blogObject, 201);
  } catch (error) {
    next(error);
  }
}

export async function updateBlog(req, res, next) {
  try {
    const info = {
      title: req.body.title,
      description: req.body.description,
      blogId: req.params.id,
    };
    const updatedBlog = await blogService.updateBlogById(info);
    return sendResponse(req, res, updatedBlog, 200);
  } catch (error) {
    next(error);
  }
}

export async function getAllByAuthor(req, res, next) {
  const authorId = req.userId;
  try {
    const blogs = await getAllBlogsByAuthor(authorId);
    return sendResponse(req, res, blogs, 200);
  } catch (error) {
    next(error);
  }
}

export async function getBlogById(req, res, next) {
  const blogId = req.params.id;
  try {
    const blog = await blogService.getBlogId(blogId);
    return sendResponse(req, res, blog, 200);
  } catch (error) {
    next(error);
  }
}

export async function deleteBlog(req, res, next) {
  try {
    const blogId = req.params.id;
    await blogService.deleteBlogById(blogId);
    const message = "blog has been deleted succesfully.";
    return sendResponse(req, res, blogId, 204);
  } catch (error) {
    next(error);
  }
}
export default { getAllBlogs, deleteBlog, updateBlog, getByUsername };
