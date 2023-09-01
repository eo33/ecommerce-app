const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

// Import mongoose model
const User = require("../model/user");

// Import middleware functions
const findUser = require("../middleware/findUser");

// @route   POST register/create
// @desc    Register user
// @acess   Public

router.post(
  "/",
  [
    body("email", "Include a valid email").isEmail(),
    body("password", "password required").exists(),
  ],
  findUser,
  async (req, res) => {
    try {
      if (req.user) {
        return res.status("400").json({ msg: "user already exist!" });
      }
      let { email, password, admin } = req.body;

      let newUser = new User({
        email,
        password,
        admin,
      });
      await newUser.save();
      res.status("400").json({ msg: "user succesfully created!" });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: "request error" });
    }
  }
);

module.exports = router;
