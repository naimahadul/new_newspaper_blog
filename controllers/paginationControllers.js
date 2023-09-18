import db from "../models/index.js";
import { sendResponse } from "../utils/response.js";
const Blog = db.Blog;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: blogs } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, blogs, totalPages, currentPage };
};

// Retrieve all Tutorials from the database.
export async function findAll(req, res, next) {
  const { page, size, title } = req.query;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  Blog.findAndCountAll({ where: condition, limit, offset })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      sendResponse(res, response, 200);
    })
    .catch((err) => {
      const error = new Error("internel server error!" + err.message);
      error.statusCode = 500;
      next(error);
    });
}

export default { findAll };
