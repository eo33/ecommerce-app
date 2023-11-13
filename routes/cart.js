// Main libraries
const express = require("express");
const router = express.Router();
const authToken = require("../middleware/authToken");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");

// Import mongoose model
const Cart = require("../model/cart");
//const User = require("../model/user");
//const Product = require("../model/Products");

// API routes

// @route   POST cart/add
// @desc    Add item to cart
// @acess   private

router.post("/add", authToken, async (req, res) => {
  try {
    //Get the user id from JWT payload
    const user = req.payload.user.id;
    //Get the items from the request body
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
    } else {
      // Step 3: If user doesnt have a new cart, instantiate a new cart
      const newCart = new Cart({
        user: user,
        items: [{ product: productId, quantity: quantity }],
      });
      await newCart.save(); // Save the new cart
    }

    res.send("POST REQUEST SUCCESS");
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "request error" });
  }
});

// @route   GET cart/items
// @desc    Get the cart items of the logged in user
// @acess   private

router.get("/items", authToken, async (req, res) => {
  try {
    //Get the user id from JWT payload
    const userID = req.payload.user.id;
    // Get the user cart
    const cartData = await Cart.findOne({ user: userID })
      .populate("user", ["name", "email"])
      .populate("items.product");

    res.json(cartData);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "request error" });
  }
});

// @route   GET cart/delete
// @desc    Delete the cart item(s) of the logged in user
// @acess   private
router.delete("/delete", authToken, async (req, res) => {
  try {
    //Get the user id from JWT payload
    const userID = req.payload.user.id;
    //Get the items to delete from the request body
    const items = req.body.items;

    const cartData = await Cart.findOneAndUpdate(
      { user: userID },
      { $pull: { items: { _id: { $in: items } } } },
      { new: true }
    );
    return res.json(cartData);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "request error" });
  }
});

// @route   PUT cart/edit
// @desc    Edit the product quantity by the specified amount
// @acess   private

router.put("/edit", authToken, async (req, res) => {
  try {
    //Get the user id from JWT payload
    const user = req.payload.user.id;
    //Get the productId and quantity from the request body
    const { productId, quantity } = req.body;

    if (quantity == null) {
      return res.status(404).json({ msg: "product qty null" });
    }

    // Find cart and modify the items array
    const updatedCart = await Cart.findOneAndUpdate(
      { user, "items.product": new mongoose.Types.ObjectId(productId) },
      { $set: { "items.$.quantity": quantity } },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    res.json(updatedCart);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "request error" });
  }
});

module.exports = router;
