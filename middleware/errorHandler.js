import { sendResponse } from "../utils/response.js";
const ErrorHandler = (err, req, res, next) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  const data = {
    success: false,
    message: errMsg,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  };
  sendResponse(req, res, data, errStatus);
};

export default ErrorHandler;
