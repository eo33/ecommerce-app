// Main libraries
const express = require("express");
const router = express.Router();
const authToken = require("../middleware/authToken");
const authTokenAdmin = require("../middleware/authTokenAdmin");

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

// @route   POST orders/change-status
// @desc    Change the order(s) status. This includes all the items in the order.
// @acess   private

router.post("/change-status", authTokenAdmin, async (req, res) => {
  try {
    // Get the object Ids of the orders
    const items = req.body.items;
    const updateOperations = items.map((item) => ({
      updateOne: {
        filter: { _id: item.orderId },
        update: { $set: { status: item.status } },
      },
    }));

    // Perform bulk write operation and get the result
    await Orders.bulkWrite(updateOperations);

    // Fetch the updated documents based on the orderIds
    const updatedOrders = await Orders.find({
      _id: { $in: items.map((item) => item.orderId) },
    });

    // Send the updated orders as the response
    res.json(updatedOrders);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "request error", error: err.message });
  }
});

// @route   POST orders/delete
// @desc    Delete the order(s) status. This includes all the items in the order.
// @acess   private
router.post("/delete", authTokenAdmin, async (req, res) => {
  try {
    // Get the object Ids of the orders
    const orderId = req.body.orderId;
    const result = await Orders.deleteMany({ _id: { $in: orderId } });

    // Send the updated orders as the response
    res.json(result);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "request error", error: err.message });
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
