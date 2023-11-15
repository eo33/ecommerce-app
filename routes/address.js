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
    /*Get the items from the request body
    const { productId, quantity } = req.body;

    // Step 1: Check if user already has a cart
    const existingCart = await Cart.findOne({ user: user });
    if (existingCart) {
      // Step 2: If user has an existing cart, check and update the items
      let itemExists = false;
      for (let item of existingCart.items) {
        if (item.product.toString() === productId.toString()) {
          item.quantity += quantity; // Update the quantity if the item already exists
          itemExists = true;
          break;
        }
      }
      if (!itemExists) {
        existingCart.items.push({ product: productId, quantity: quantity }); // Add the new item to the cart
      }
      await existingCart.save(); // Save the updated car
      */
    //Get the items from the request body
    res.send(id);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "request error" });
  }
});

module.exports = router;
