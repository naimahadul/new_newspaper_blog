import customError from "../utils/customErrorHandler.js";
export async function validToken(req, res, next) {
  try {
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader) {
      throw customError("Token not given!", 400);
    }
    const bearer = bearerHeader.split(" ");
    if (!bearer) {
      throw customError("Token not given!", 400);
    }
    const token = bearer[1];
    if (!token) {
      throw customError("Token not given!", 400);
    }
    req.token = token;
    next();
  } catch (error) {
    next(error);
  }
}
