import customError from "../../utils/customErrorHandler.js";

describe("customError", () => {
  it("should create a custom error with the provided error message and status code", () => {
    const errorMessage = "This is a custom error message";
    const statusCode = 400;
    const error = customError(errorMessage, statusCode);
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe(errorMessage);
    expect(error.statusCode).toBe(statusCode);
  });
});
