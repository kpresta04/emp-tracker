const validator = require("validator");

const intValidator = input => {
  if (input === "Enter a number or press Enter to skip") {
    return true;
  } else if (!validator.isInt(input)) {
    return "You can only enter a whole number!";
  }
  return true;
};

const alphaValidator = input => {
  if (input === "") {
    return "You must enter a name!";
  } else if (!validator.isAlpha(input)) {
    return "You can only enter letters!";
  }
  return true;
};
