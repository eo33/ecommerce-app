// Main libraries
const express = require("express");
const router = express.Router();
const authTokenAdmin = require("../middleware/authTokenAdmin");

// Models
const Orders = require("../model/orders");
const Users = require("../model/user");
const Products = require("../model/products");

// @route   GET stats/dashboard
// @desc    GET all the dashboard statistics, including order (pending, delivery, complete),
//          product and user stats
// @acess   private
/**
 * @swagger
 * /stats/dashboard:
 *   get:
 *     summary: Get User Stats
 *     description: This endpoint provides a summary of key metrics for the users shown in the admin dashboard.
 *     tags:
 *       - Stats
 *     security:
 *       - APIKey: []
 *     responses:
 *       200:
 *         description: Successful response
 *       403:
 *         description: Unauthorized, requires administrator privilege
 */
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
// @desc    GET product details
// @acess   private
/**
 * @swagger
 * /stats/productTable/{page}:
 *   get:
 *     summary: Get Prodcut Stats
 *     description: | 
 *        This endpoint retrieves product statistics for the specified page, including:
 *        - Total products sold (soldCount).
 *        - Breakdown of product orders by status (pending, delivery, completed) with counts and total quantities.
 *     tags:
 *       - Stats
 *     security:
 *       - APIKey: []
 *     parameters:
 *       - in: path
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number. It specifies which 7 products to show (e.g. page 1 returns the first 7, page 2 returns the next 7, etc).
 *         required: true
 *         example: 1
 *     responses:
 *       200:
 *         description: Successful response
 *       403:
 *         description: Unauthorized, requires administrator privilege
 */
router.get("/productTable/:page", authTokenAdmin, async (req, res) => {
  try {
    // Get 7 orders per page, and then collect productIds
    const productsPerPage = 7;
    const page = req.params.page || 1;
    const skipCount = (page - 1) * productsPerPage;
    const products = await Products.find()
      .skip(skipCount)
      .limit(productsPerPage);
    const productIds = products.map((product) => product._id);

    // Aggregate orders to count occurrences for each product and state
    const result = await Orders.aggregate([
      {
        $unwind: "$items",
      },
      {
        $match: {
          "items.product": { $in: productIds },
        },
      },
      {
        $group: {
          _id: {
            product: "$items.product",
            status: "$status",
          },
          totalQuantity: { $sum: "$items.quantity" }, // Sum the quantities
          count: { $sum: 1 },
        },
      },
    ]);
    // Organize the result with product information
    const productCounts = [];

    // Iterate over all products
    for (const product of products) {
      const productId = product._id.toString();

      // Find the corresponding counts in the result
      const countsInResult = result.filter(
        (item) => item._id.product.toString() === productId
      );

      // If counts are found, include them in the result
      if (countsInResult.length > 0) {
        const countsObject = countsInResult.reduce((acc, curr) => {
          acc[curr._id.status] = {
            count: curr.count,
            totalQuantity: curr.totalQuantity,
          };
          return acc;
        }, {});

        productCounts.push({
          product: productId,
          name: product.name,
          soldCount: product.soldCount,
          counts: countsObject,
        });
      } else {
        // If no counts are found, include the product with zero counts
        productCounts.push({
          product: productId,
          name: product.name,
          soldCount: product.soldCount,
          counts: {
            pending: { count: 0, totalQuantity: 0 },
            delivery: { count: 0, totalQuantity: 0 },
            completed: { count: 0, totalQuantity: 0 },
          },
        });
      }
    }

    res.send(productCounts);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "request error" });
  }
});

// @route   GET stats/orders/:status/:page
// @desc    GET product details
// @acess   private
/**
 * @swagger
 * /stats/orders/{status}/{page}:
 *   get:
 *     summary: Get Order Stats
 *     description: This endpoint retrieves order statistics for the specified page.
 *     tags:
 *       - Stats
 *     security:
 *       - APIKey: []
 *     parameters:
 *       - in: path
 *         name: status
 *         schema:
 *           type: string
 *         description: Can either be `all`, `pending`, `delivery` or `completed`.
 *         required: true
 *         example: pending
 *       - in: path
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number. It specifies which 7 products to show (e.g. page 1 returns the first 7, page 2 returns the next 7, etc).
 *         required: true
 *         example: 1
 *     responses:
 *       200:
 *         description: Successful response
 *       403:
 *         description: Unauthorized, requires administrator privilege
 */
router.get(
  "/orders/:orderStatus/:pageNumber",
  authTokenAdmin,
  async (req, res) => {
    try {
      const orderStatus = req.params.orderStatus; // Can be "all", "pending", "delivery", or "completed"
      const pageNumber = parseInt(req.params.pageNumber, 10);
      const pageSize = 15;

      let query = { status: orderStatus };
      // If orderStatus is "all", remove the status filter
      if (orderStatus === "all") {
        delete query.status;
      }
      // Retrieve paginated orders
      const result = await Orders.find(query)
        .populate("user", ["email"])
        .populate("items.product", ["name", "price"])
        .sort({ createdAt: -1 })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize);

      // Format the createdAt date in the result
      const formattedResult = result.map((data) => {
        const inputDate = new Date(data.createdAt);
        const day = inputDate.getDate();
        const month = new Intl.DateTimeFormat("en-US", {
          month: "short",
        }).format(inputDate);
        const year = inputDate.getFullYear();
        const formattedDate = `${day} ${month} ${year}`;
        return { ...data._doc, createdAt: formattedDate };
      });
      // Get the total number of orders matching the criteria
      const totalOrders = await Orders.countDocuments(query);

      res.json({ totalOrders, orders: formattedResult });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: "request error" });
    }
  }
);

module.exports = router;
