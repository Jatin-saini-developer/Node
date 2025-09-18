const jwt = require("jsonwebtoken");
const User = require("../modal/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    // Verify token
    const decodedObj = jwt.verify(token, "DEV@TINDER69"); // no need for await

    const { _id } = decodedObj;

    // Find user
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token is not valid", error: err.message });
  }
};

module.exports = { userAuth };
