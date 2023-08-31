const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// Import mongoose model
const User = require("../model/user");

// @route   POST register/create
// @desc    Register user
// @acess   Public
router.post("/", async (req, res) => {
  // destructure
  let { email, password, admin } = req.body;
  console.log(req.body);
  try {
    // Check if already exist
    let user = await User.findOne({ email: email });

    if (user) {
      res.status(400).json({ msg: "user already exist" });
    } else {
      let newUser = new User({
        email: email,
        password: password,
        admin: admin,
      });
      await newUser.save();
      res.status(200).json({ msg: "successfully create user" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "request error" });
  }
});

module.exports = router;
