import dotenv from "dotenv";
import db from "../models/index.js";
dotenv.config();
const Blog = db.Blog;

export async function findAllBlogs(page, size) {
  const blogs = await Blog.findAndCountAll({
    limit: size,
    offset: page * size,
  });
  return blogs;
}

export async function createBlog(info) {
  const blogObject = await Blog.create(info);
  return blogObject;
}

export async function updateBlogById(info) {
  try {
    const blog = await Blog.findByPk(info.blogId);
    blog.title = info.title;
    blog.description = info.description;
    await blog.save();
    return blog;
  } catch (error) {
    throw error;
  }
}

export async function deleteBlogById(blogId) {
  try {
    const blog = await Blog.findByPk(blogId);
    await blog.destroy();
  } catch (error) {
    throw error;
  }
}

export async function getBlogId(blogId) {
  const blog = await Blog.findByPk(blogId);
  return blog;
}

export async function getAllBlogsByAuthor(authorId) {
  try {
    const blogs = await Blog.findAll({
      where: { authorId: authorId },
    });
    return blogs;
  } catch (error) {
    throw error;
  }
}
export default { createBlog, getBlogId, findAllBlogs,deleteBlogById,updateBlogById };
