const User = require("../model/user");
const { validationResult } = require("express-validator");

// middleware
module.exports = async (req, res, next) => {
  // Validate errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let { email } = req.body;

  try {
    let user = await User.findOne({ email: email });
    if (user) {
      req.user = user;
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "request error" });
  }

  next();
};
