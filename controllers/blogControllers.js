import {
  findAllBlogs,
  createBlog,
  updateBlogById,
  deleteBlogById,
  getBlogId,
  getAllBlogsByAuthor,
} from "../services/blogService.js";
import constentNegotiation  from "../utils/response.js";
import  blogService from "../services/blogService.js";

export async function getAllBlogs(req, res, next) {
  try {
    const page = Number.parseInt(req.query.page);
    const size = Number.parseInt(req.query.size);
    const blogs = await findAllBlogs(page, size);

    constentNegotiation.sendResponse(req, res, blogs, 200);
  } catch (err) {
    next(err);
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
    constentNegotiation.sendResponse(req, res, blogObject, 201);
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
    const updatedBlog = await updateBlogById(info);
    constentNegotiation.sendResponse(req, res, updatedBlog, 200);
  } catch (error) {
    next(error);
  }
}

export async function getAllByAuthor(req, res, next) {
  const authorId = req.userId;
  try {
    const blogs = await getAllBlogsByAuthor(authorId);
    constentNegotiation.sendResponse(req, res, blogs, 200);
  } catch (error) {
    next(error);
  }
}

export async function getBlogById(req, res, next) {
  const blogId = req.params.id;
  try {
    const blog = await getBlogId(blogId);
    constentNegotiation.sendResponse(req, res, blog, 200);
  } catch (error) {
    next(error);
  }
}

export async function deleteBlog(req, res, next) {
  try {
    const blogId = req.params.id;
    await deleteBlogById(blogId);
    const message = "blog has been deleted succesfully.";
    constentNegotiation.sendResponse(req, res, blogId, 200);
  } catch (error) {
    next(error);
  }
}
