import db from "../models/index.js";
const Blog = db.Blog;
export async function findBlogById(req, res, next) {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
      const error = new Error("Blog not found!");
      error.statusCode = 400;
      throw error;
    }
    next();
  } catch (error) {
    next(error);
  }
}
