const customError = (errorMessage, statusCode) => {
    const error = new Error(errorMessage);
    error.statusCode = statusCode;
    return error;
  };
  
  export default customError;