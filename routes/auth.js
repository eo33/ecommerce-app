// Main library
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// Libraries for encryption
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Import mongoose model
const User = require("../model/user");

// Import middleware functions
const findUser = require("../middleware/findUser");

// @route   POST auth/register
// @desc    Register user and get token
// @acess   Public

router.post(
  "/register",
  [
    check("name", "Include a valid name").not().isEmpty(),
    check("email", "Include a valid email").isEmail(),
    check("password", "password required").exists(),
  ],
  findUser,
  async (req, res) => {
    // Server side validation
    // Check form to see if valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Check to see if user already exist
    if (req.user) {
      return res.status(400).json({ msg: "user already exist!" });
    }
    // Send data to MongoDB
    try {
      let { name, email, password, admin } = req.body;
      let newUser = new User({
        name,
        email,
        password,
        admin,
      });

      // Encrypt the password by hashing it with Bcyrpt
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

// @route   POST auth/login
// @desc    Login user and get token
// @acess   Public

router.post(
  "/login",
  [
    check("email", "Include a valid email").isEmail(),
    check("password", "password required").exists(),
  ],
  async (req, res) => {
    // Server side validation
    // Check form to see if valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Send data to MongoDB
    try {
      const { email, password } = req.body;
      // See if user exist
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      // If match, compare hashed password from MongoDB with submitted password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      // User email and password found, send back JWT
      const payload = {
        user: {
          id: user.id,
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
