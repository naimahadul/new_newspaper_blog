import customError from "../utils/customErrorHandler.js";
export async function validToken(req, res, next) {
  try {
    const bearerHeader = req.headers["authorization"];

    if (!bearerHeader || !bearerHeader.split(" ")[1]) {
      throw customError("Token not given!", 400);
    }
    req.token = bearerHeader.split(" ")[1];
    next();
  } catch (error) {
    next(error);
  }
}
