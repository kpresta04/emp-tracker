const validator = require("validator");

exports.intValidator = input => {
  if (input === "") {
    return "You must enter a number!";
  } else if (!validator.isInt(input)) {
    return "You can only enter a whole number!";
  }
  return true;
};

exports.alphaValidator = input => {
  if (input === "") {
    return "You must enter a name!";
  } else if (!validator.isAlpha(input)) {
    return "You can only enter letters!";
  }
  return true;
};
