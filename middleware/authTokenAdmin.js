const jwt = require("jsonwebtoken");
const config = require("config");

function authenticateJWT(req, res, next) {
  // Get token from header
  const token = req.header("Authorization");

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Verify and check if token is admin or not
  jwt.verify(token, config.get("jwtSecret"), (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }
    if (user.admin === false) {
      return res
        .status(403)
        .json({ msg: "unauthorized user, you are not an administrator" });
    }
    req.user = user; // Store user information in the request for further processing.
    next();
  });
}

module.exports = authenticateJWT;
