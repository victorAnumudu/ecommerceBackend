//usermodel database for user
const { userModel } = require("../models/Users");

//function to check if user already exist
exports.userExist = async (email) => {
  try {
    let user = await userModel.findOne({ email });
    if (user != null) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return "server error";
  }
};

//FUNCTION TO CHECK IF REQUIRED INPUT FIELDS ARE EMPTY
exports.isEmpty = (requiredArr, inputs) => {
  let error = [];
  let requiredArray = requiredArr;
  for (let input in inputs) {
    if ((inputs[input] === "" || !inputs[input]) && requiredArray.includes(input)) {
      error.push(input);
    }
  }
  return error;
};
