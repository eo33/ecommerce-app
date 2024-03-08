// Main libraries
const express = require("express");
const router = express.Router();
const authToken = require("../middleware/authToken");
const config = require("config");

// Import mongoose model
const Address = require("../model/address");

// API routes

// @route   GET address/list
// @desc    Get the list of addresses of the user
// @acess   private
/**
 * @swagger
 * /address/list:
 *   get:
 *     summary: Get the list of addresses.
 *     description: Get the list of address of the logged in user.
 *     tags:
 *       - Checkout
 *     security:
 *       - APIKey: []
 *     responses:
 *       200:
 *         description: Successful response
 */
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

// @route   POST address/api_key
// @desc    Change the main address of a user
// @acess   private
/**
 * @swagger
 * /address/api_key:
 *   get:
 *     summary: Get the API key for Google Places.
 *     description: Get the API key for Google Places. This is currently deprecated until Google Places subscription is renewed.
 *     deprecated: true
 *     tags:
 *       - Checkout
 *     security:
 *       - APIKey: []
 *     responses:
 *       200:
 *         description: Successful response
 *     externalDocs:
 *       description: Learn more about Google places.
 *       url: https://developers.google.com/maps/documentation/places/web-service/overview
 */
router.get("/api_key", authToken, async (req, res) => {
  try {
    const apiKey = config.get("googleApiKey");
    res.json(apiKey);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "request error" });
  }
});

// @route   POST address/add
// @desc    Add address of a user
// @acess   private
/**
 * @swagger
 * /address/add:
 *   post:
 *     summary: Add an address.
 *     description: Add an address for the logged in user.
 *     tags:
 *       - Checkout
 *     security:
 *       - APIKey: []
 *     requestBody:
 *       description:
 *         JSON containing the _address_ of the user.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *                 description: The address of the user. (required).
 *                 example: "699 Collins Street, Docklands VIC, Australia"
 *     responses:
 *       200:
 *         description: Successful response
 */
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

// @route   PUT address/select
// @desc    Change the main address of a user
// @acess   private
/**
 * @swagger
 * /address/select:
 *   put:
 *     summary: Select the main address.
 *     description: Change the main address of the logged in user to the specified address in the request body. Each user can have only 1 main address.
 *     tags:
 *       - Checkout
 *     security:
 *       - APIKey: []
 *     requestBody:
 *       description: JSON containing the _addressId_ to be selected as the main address. The _addressId_ should correspond to an address that a user has.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               addressId:
 *                 type: string
 *                 description: The ID of the address to be selected as the main address.
 *                 example: 656bf54c99723847983a9714
 *     responses:
 *       200:
 *         description: Successful response
 */
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

// @route   DELETE address/delete
// @desc    Delete an address of a user
// @acess   private
/**
 * @swagger
 * /address/delete:
 *   delete:
 *     summary: Delete an address of a user.
 *     description: Delete an address of the logged in user. The address to be deleted is specified in the request body. If the deleted address is a main address, the next address will be the main address.
 *     tags:
 *       - Checkout
 *     security:
 *       - APIKey: []
 *     requestBody:
 *       description: JSON containing the _addressId_ to be deleted. The _addressId_ should correspond to an address that a user has.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               addressId:
 *                 type: string
 *                 description: The ID of the address to be deleted.
 *                 example: 65eacf844c51b2f201d9502d
 *     responses:
 *       200:
 *         description: Successful response
 */
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

module.exports = router;
