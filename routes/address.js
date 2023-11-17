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

router.get("/list", authToken, async (req, res) => {
  try {
    const { id } = req.payload.user;
    const existingAddress = await Address.findOne({ user: id }).populate(
      "user",
      ["name"]
    );
    res.json(existingAddress);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "request error" });
  }
});

// @route   DELETE address/delete
// @desc    Delete an address of a user
// @acess   private

router.delete("/delete", authToken, async (req, res) => {
  try {
    const { id } = req.payload.user;
    const addressId = req.body.addressId;

    // Remove the address with the given addressId
    const result = await Address.findOneAndUpdate(
      { user: id },
      { $pull: { addresses: { _id: addressId } } },
      { new: true }
    );

    // Check if the address was found and updated
    if (result) {
      return res.json(result);
    } else {
      return res.status(404).json({ msg: "Address not found" });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "request error" });
  }
});

// @route   POST address/select
// @desc    Change the main address of a user
// @acess   private
router.put("/select", authToken, async (req, res) => {
  try {
    const { id } = req.payload.user;
    const addressId = req.body.addressId;

    // Step 1: Set all main fields to false for the given user
    await Address.updateOne(
      { user: id },
      { $set: { "addresses.$[].main": false } }
    );

    // Step 2: Set the main field to true for the selected address
    const result = await Address.findOneAndUpdate(
      { user: id, "addresses._id": addressId },
      { $set: { "addresses.$.main": true } },
      { new: true } // Return the modified document
    );

    return res.json(result);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "request error" });
  }
});

module.exports = router;
