const jwt = require("jsonwebtoken");
const config = require("config");
require("dotenv/config");

module.exports = function (req, res, next) {
  // Get Token
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "no token, authorization denied " });
  }

  // verify token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
