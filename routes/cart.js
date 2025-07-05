// Main libraries
const express = require("express");
const router = express.Router();
const authToken = require("../middleware/authToken");
const mongoose = require("mongoose");

// Import mongoose model
const Cart = require("../model/cart");

// API routes

// @route   GET cart/items
// @desc    Get the cart items of the logged in user
// @acess   private
/**
 * @swagger
 * /cart/items:
 *   get:
 *     summary: Get Cart Items.
 *     description: This endpoint allows you add items to your cart.
 *     tags:
 *       - Cart
 *     security:
 *       - APIKey: []
 *     responses:
 *       200:
 *         description: Successful response
 */
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

// @route   POST cart/add
// @desc    Add Items to cart
// @acess   private
/**
 * @swagger
 * /cart/add:
 *   post:
 *     summary: Add Items to Cart.
 *     description: This endpoint allows you add items to your cart.
 *     tags:
 *       - Cart
 *     security:
 *       - APIKey: []
 *     requestBody:
 *       description:
 *         A JSON object containing the _productId_ and the _quantity_ of the item to add. All fields are required. See schema for more details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The id of the item. (required).
 *                 example: "6555a1f49feeac7dccd9b1ee"
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the item to add (required).
 *                 example: "40"
 *     responses:
 *       200:
 *         description: Successful response
 */
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

// @route   PUT cart/edit
// @desc    Edit the product quantity by the specified amount
// @acess   private
/**
 * @swagger
 * /cart/edit:
 *   put:
 *     summary: Edit Cart Items.
 *     description: This endpoint allows you to update the quantity of a product in the cart.
 *     tags:
 *       - Cart
 *     security:
 *       - APIKey: []
 *     requestBody:
 *       description:
 *         A JSON object containing the _productId_ and the _quantity_ of the item to edit. All fields are required. See schema for more details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The id of the item. (required).
 *                 example: "6555a1f49feeac7dccd9b1ee"
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the item to add (required).
 *                 example: "40"
 *     responses:
 *       200:
 *         description: Successful response
 */
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

// @route   GET cart/delete
// @desc    Delete the cart item(s) of the logged in user
// @acess   private
/**
 * @swagger
 * /cart/delete:
 *   delete:
 *     summary: Remove Items from Cart.
 *     description: This endpoint allows you to delete specified items from the user's cart.
 *     tags:
 *       - Cart
 *     security:
 *       - APIKey: []
 *     requestBody:
 *       description:
 *         A JSON object containing the _items_, which contains an array of the item(s) ID inside the cart to delete.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 description: An array of the item(s) ID inside the cart. Each item inside a cart will have a unique ID. This is different from the item id. (required).
 *                 example: ["65eabef4d53c0d67eea62c54"]
 *     responses:
 *       200:
 *         description: Successful response
 */
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

module.exports = router;
