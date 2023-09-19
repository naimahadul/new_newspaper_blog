import db from "../models/index.js";
import customError from "../utils/customErrorHandler.js";
const Blog = db.Blog;
export async function findBlogById(req, res, next) {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
     throw customError("Blog not found!", 400);
    }
    next();
  } catch (error) {
    next(error);
  }
}
