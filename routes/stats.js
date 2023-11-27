// Main libraries
const express = require("express");
const router = express.Router();
const authTokenAdmin = require("../middleware/authTokenAdmin");

// Models
const Orders = require("../model/orders");
const Users = require("../model/user");
const Products = require("../model/Products");

// @route   GET stats/dashboard
// @desc    GET all the dashboard statistics, including order (pending, delivery, complete),
//          product and user stats
// @acess   private

router.get("/dashboard", authTokenAdmin, async (req, res) => {
  try {
    const pendingOrders = await Orders.count({ status: "pending" });
    const deliveredOrders = await Orders.count({ status: "delivery" });
    const completedOrders = await Orders.count({ status: "completed" });
    const totalUsers = await Users.count({});
    const totalProducts = await Products.count({});

    const result = [
      {
        text: "All orders",
        count: pendingOrders + deliveredOrders + completedOrders,
        link: "orders",
      },
      {
        text: "Pedning orders",
        count: pendingOrders,
        link: "orders/pending",
      },
      {
        text: "Delivered orders",
        count: deliveredOrders,
        link: "orders/delivery",
      },
      {
        text: "Completed orders",
        count: completedOrders,
        link: "orders/completed",
      },
      {
        text: "Total users",
        count: totalUsers,
        link: "users",
      },
      {
        text: "Total products",
        count: totalProducts,
        link: "products",
      },
    ];
    res.send(result);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "request error" });
  }
});

// @route   GET stats/productTable/:page
// @desc    GET pending orders
// @acess   private

module.exports = router;
