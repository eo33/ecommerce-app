// Main library
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

// Libraries for encryption
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
    body("name", "Include a valid name").not().isEmpty(),
    body("email", "Include a valid email").isEmail(),
    body("password", "password required").exists(),
  ],
  findUser,
  async (req, res) => {
    try {
      if (req.user) {
        return res.status(400).json({ msg: "user already exist!" });
      }
      let { name, email, password, admin } = req.body;

      let newUser = new User({
        name,
        email,
        password,
        admin,
      });

      // Encrypt password, by hashing it with Bcyrpt
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);
      await newUser.save();

      // Send the JWT in the response header
      const payload = {
        user: {
          id: newUser.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      return res.status("500").json({ msg: "request error" });
    }
  }
);

module.exports = router;
