import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

//verifytoken
export async function verifyToken(req, res, next) {
  try {
    const bearerHeader = req.headers["authorization"];
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    if (!token) {
      const error = new Error("Token not given!");
      error.statusCode = 401;
      throw error;
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, authdata) => {
      if (err) {
        const error = new Error("Invalid token!");
        error.statusCode = 401;
        throw error;
      }
      req.userId = authdata.userId;
      next();
    });
  } catch (error) {
    next(error);
  }
}
