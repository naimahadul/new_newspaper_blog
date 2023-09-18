import dotenv from "dotenv";
import db from "../models/index.js";
dotenv.config();
const Blog = db.Blog;
const Op = db.Sequelize.Op;

//create blog
export async function createBlog(info) {
  const blogObject = await Blog.create(info);
  return blogObject;
}

// Update a blog
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

//delete blogs by id
export async function deleteBlogById(blogId) {
  try {
    const blog = await Blog.findByPk(blogId);
    await blog.destroy();
  } catch (error) {
    throw error;
  }
}

// Get a blog by ID
export async function getBlogId(blogId) {
  const blog = await Blog.findByPk(blogId);
  return blog;
}

// Get blogs by author
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
