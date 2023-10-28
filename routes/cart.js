// Main libraries
const express = require("express");
const router = express.Router();
const authToken = require("../middleware/authToken");
const jwt = require("jsonwebtoken");
const config = require("config");

// Import mongoose model
const Cart = require("../model/cart");

// API routes

// @route   POST cart/add
// @desc    Add item to cart
// @acess   private

router.post("/add", authToken, async (req, res) => {
  try {
    //Get the payload (user) from authToken middleware
    const user = req.user;
    res.json(user);
  } catch {
    console.error(err.message);
    return res.status(500).json({ msg: "request error" });
  }
});

module.exports = router;
