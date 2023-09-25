import validator from "validator";

function isEmailValid(email) {
  return validator.isEmail(email);
}

function isPasswordValid(password) {
  return validator.isLength(password, { min: 8 });
}
function isUsernameValid(username) {
  return validator.isLength(username, { min: 4 });
}

export default { isEmailValid, isPasswordValid, isUsernameValid,validator };
