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

// @route   GET orders/get_all
// @desc    GET my orders based on the page number
// @acess   private
router.get("/get_all", authToken, async (req, res) => {
  try {
    //Get the user id from JWT payload
    const { id } = req.payload.user;

    // get the object Id of the order

    const orders = await Orders.find({ user: id })
      .select(["items", "status", "createdAt"])
      .populate("items.product")
      .sort({ createdAt: 1 });
    const itemList = [];
    // Logic for only returning the product
    orders.forEach((order, index) => {
      const { items } = order;
      const newItems = items.map(
        ({ product: { _id, image, name, price }, quantity, shipping }) => ({
          orderId: order._id,
          productId: _id,
          image,
          name,
          price,
          quantity,
          shipping,
          status: order.status,
          createdAt: new Date(order.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
          orderNum: index + 1,
        })
      );
      itemList.push(...newItems);
    });
    const sortedItemList = itemList.sort((a, b) => b.orderNum - a.orderNum);
    res.send(sortedItemList);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "request error" });
  }
});

module.exports = router;
/**
 * 
 *     // Logic for only returning the product
    orders.forEach((order) => {
      const { items } = order;
      const newItems = items.map(
        ({ product: { image, name, price }, quantity, shipping }) => ({
          image,
          name,
          price,
          quantity,
          shipping,
          status: order.status,
          createdAt: order.createdAt,
        })
      );
      itemList.push(...newItems);
    });
 */
