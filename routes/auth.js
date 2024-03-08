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

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register user and get it's token
 *     description: Register a user with the _name_, _email_, _password_, and _admin status_. This end point will return the authentication token (JWT) link to this account.
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: JSON containing the _name_, _email_, _password_, and _admin status_ to create a new user. See description for more details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: john doe
 *               email:
 *                 type: string
 *                 example: john_doe12@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *               admin:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: See message decription
 */

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
          admin: newUser.admin,
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
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login to an existing acocunt and get it's token.
 *     description: Login to an account using the _email_ and _password_. It will also return the user's details.
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: JSON containing _email_ and _password_ to login to an account. All fields are required.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john_doe@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: See message decription
 */

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
          admin: user.admin,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token, user });
        }
      );
    } catch (err) {
      console.error(err.message);
      return res.status("500").json({ msg: "request error" });
    }
  }
);

// @route   POST auth/validate
// @desc    Check if token is valid or not, and is an admin or not
// @acess   Public

router.get("/validate", async (req, res) => {
  // Get token from header
  const token = req.header("Authorization");

  // Check if no token
  if (!token) {
    return res.send({ authenticate: false, admin: false });
  }

  // Verify
  jwt.verify(token, config.get("jwtSecret"), (err, user) => {
    if (err) {
      return res.send({ authenticate: false, admin: false });
    }
    return res.send({ authenticate: true, admin: user.user.admin });
  });
});

module.exports = router;
