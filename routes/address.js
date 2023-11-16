// Main libraries
const express = require("express");
const router = express.Router();
const authToken = require("../middleware/authToken");

// Import mongoose model
const Address = require("../model/address");

// API routes

// @route   POST address/add
// @desc    Add address of a user
// @acess   private

router.post("/add", authToken, async (req, res) => {
  try {
    //Get the user id from JWT payload
    const { id } = req.payload.user;

    // Get the address from the request body
    const { address } = req.body;

    // Step 1: Check if user already has a cart
    const existingAddress = await Address.findOne({ user: id });
    if (existingAddress) {
      // Step 2: If user has an existing address, check and update the addresses
      // Make old addresses not main, and new address main
      existingAddress.addresses.map(
        (currAddress) => (currAddress.main = false)
      );
      existingAddress.addresses.push({ address, main: true });
      await existingAddress.save();
    } else {
      const newAddress = new Address({
        user: id,
        addresses: [{ address, main: true }],
      });
      await newAddress.save();
    }
    res.send("success");
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "request error" });
  }
});

// @route   GET address/main
// @desc    Get the main address of the user
// @acess   private

router.get("/main", authToken, async (req, res) => {
  try {
    const { id } = req.payload.user;
    const existingAddress = await Address.findOne({ user: id });

    if (existingAddress) {
      const result = existingAddress.addresses.filter(
        (address) => address.main
      );
      res.send(result[0].address);
    } else {
      res.send("-");
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "request error" });
  }
});

module.exports = router;
