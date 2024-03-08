// Main libraries
const express = require("express");
const router = express.Router();
const authToken = require("../middleware/authToken");
const authTokenAdmin = require("../middleware/authTokenAdmin");

// Import mongoose model
const Orders = require("../model/orders");

// API routes

// @route   GET orders/get_all
// @desc    GET All orders
// @acess   private
/**
 * @swagger
 * /orders/get_all:
 *   get:
 *     summary: Get the orders of the user.
 *     description: Get all of the orders made by the logged in user. This includes _pending_, _delivery_, and _completed_ orders.
 *     tags:
 *       - Orders
 *     security:
 *       - APIKey: []
 *     responses:
 *       200:
 *         description: Successful response
 */
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

// @route   POST orders/add
// @desc    Submit orders to DB as a user
// @acess   private
/**
 * @swagger
 * /orders/add:
 *   post:
 *     summary: Add an order.
 *     description: Add an order made by the logged in user.
 *     tags:
 *       - Orders
 *     security:
 *       - APIKey: []
 *     requestBody:
 *       description: JSON containing the _items_ to add to the order. Each item contains the _productId_ and the _quantity_ to add. See schema for more details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 description: The list of item(s) to add (required).
 *                 example:
 *                   - product: "6555a2269feeac7dccd9b1f2"
 *                     quantity: 2
 *                   - product: "6555a2779feeac7dccd9b201"
 *                     quantity: 3
 *     responses:
 *       200:
 *         description: Successful response
 */

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
/**
 * @swagger
 * /orders/change-status:
 *   post:
 *     summary: Change the status the order(s).
 *     description: Change the status of the order(s) of the logged in user.
 *     tags:
 *       - Orders
 *     security:
 *       - APIKey: []
 *     requestBody:
 *       description: JSON containing the _items_ to add to the order. Each item contains the _orderId_ and the _status_. See schema for more details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 description: The list of order(s) status to update (required).
 *                 example:
 *                   - orderId: "6555a2269feeac7dccd9b1f2"
 *                     status: delivery
 *                   - orderId: "6555a2779feeac7dccd9b201"
 *                     status: completed
 *     responses:
 *       200:
 *         description: Successful response
 */
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
/**
 * @swagger
 * /orders/delete:
 *   post:
 *     summary: Delete the order(s) status. This includes all the items in the order.
 *     description: Change the status of the order(s) of the logged in user.
 *     tags:
 *       - Orders
 *     security:
 *       - APIKey: []
 *     requestBody:
 *       description: JSON containing the _items_ to add to the order. Each item contains the _orderId_ and the _status_. See schema for more details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 description: The list of order(s) status to update (required).
 *                 example:
 *                   - orderId: "6555a2269feeac7dccd9b1f2"
 *                     status: delivery
 *                   - orderId: "6555a2779feeac7dccd9b201"
 *                     status: completed
 *     responses:
 *       200:
 *         description: Successful response
 */
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

module.exports = router;
