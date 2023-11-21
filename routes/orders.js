// Main libraries
const express = require("express");
const router = express.Router();
const authToken = require("../middleware/authToken");
const authTokenAdmin = require("../middleware/authTokenAdmin");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");

// Import mongoose model
const Orders = require("../model/orders");

// API routes

// @route   POST orders/add
// @desc    Submit orders to DB as a user
// @acess   private

router.post("/add", authToken, async (req, res) => {
  try {
    //Get the user id from JWT payload
    const { id } = req.payload.user;
    // Get the items from the request body
    const { items, address } = req.body;
    const newOrder = new Orders({
      user: id,
      items,
      status: "pending",
      address,
    });
    const response = await newOrder.save();
    res.send("ORDER SUCCESS");
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "request error" });
  }
});

// @route   POST orders/change-status/:id
// @desc    Edit orders to DB as an admin
// @acess   private
router.post("/change-status/:id", authTokenAdmin, async (req, res) => {
  try {
    // get the object Id of the order
    const orderId = req.params.id;
    const newStatus = req.body.status;
    // validate status
    if (
      !(
        newStatus === "pending" ||
        newStatus === "delivery" ||
        newStatus === "completed"
      )
    ) {
      throw new Error("Invalid status");
    }
    const order = await Orders.findOne({ _id: orderId });
    order.status = newStatus;
    order.save();
    res.send(order);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "request error" });
  }
});

/**
 * router.post("/add", authToken, async (req, res) => {
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
 */

module.exports = router;
