const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("UserName is Not Valid");
  } else if (firstName < 4 || firstName > 40) {
    throw new Error("First Name should be b/w 4-40 characters");
  } else if (!validator.isEmail(email)) {
    throw new Error("EmailId is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please Enter a Strong Password");
  }
};

module.exports = {
  validateSignUpData,
};
