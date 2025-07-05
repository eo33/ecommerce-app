// Main libraries
const express = require("express");
const router = express.Router();
const authTokenAdmin = require("../middleware/authTokenAdmin");

// Models
const Users = require("../model/user");

/**
 * @swagger
 * /users/edit:
 *   post:
 *     summary: Edit User Details
 *     description: This endpoint allows you to edit a user's details. This requires admin privileges.
 *     tags:
 *       - Auth
 *     security:
 *       - APIKey: []
 *     requestBody:
 *       description: A JSON object containing the user's ID, new name, new email, and new admin status. The user ID is required, while the others are optional. If no new values are provided, the existing values will remain unchanged.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The user ID of the account to modify. You can get the list of user ID by using the POST /users/get_all/{page} endpoint.
 *               newName:
 *                 type: string
 *                 description: The new name for the user. If none provided, the existing name will remain (optional).
 *               newEmail:
 *                 type: string
 *                 description: The new email for the user. If none provided, the existing email will remain (optional).
 *               newAdminStatus:
 *                 type: boolean
 *                 description: The new admin status for the user.(optional). If true, the user will have admin privileges; if false, the user will be a regular user. If none provided, the existing admin status will remain unchanged.
 *     responses:
 *       200:
 *         description: Successful response
 */
router.post("/edit", authTokenAdmin, async (req, res) => {
  try {
    const { userId, newName, newEmail, newAdminStatus } = req.body;
    // Find the user by userId
    const user = await Users.findById(userId);
    // Update user details based on the provided values
    user.name = newName;
    user.email = newEmail;
    user.admin = newAdminStatus;

    // Save the updated user
    await user.save();
    // Send a success response
    res.json({ user });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Request error" });
  }
});

module.exports = router;

/**
 * @swagger
 * /users/get_all/{page}:
 *   get:
 *     summary: Get Users
 *     description: This endpoint allows you to get the info about the users in the application. It returns the total number of users, the number of admin users, the number of regular users, and a list of users on the specified page. By default, each page contains 20 users, .
 *     tags:
 *       - Auth
 *     security:
 *       - APIKey: []
 *     parameters:
 *       - in: path
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number. It specifies which 20 users will be shown (e.g. page 1 returns the first 20, page 2 returns the next 20, etc).
 *         required: true
 *     responses:
 *       200:
 *         description: Successful response
 *       403:
 *         description: Unauthorized, requires administrator privilege
 */

router.get("/get_all/:page", authTokenAdmin, async (req, res) => {
  const page = req.params.page;
  const pageSize = 20; // Number of users per page

  try {
    // Skip users based on the page number and limit the results to pageSize
    const usersOnPage = await Users.find({})
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    // Get the total number of users (total, admin, regular)
    const totalUsers = await Users.countDocuments({});
    const adminUsers = await Users.countDocuments({ admin: true });
    const regularUsers = totalUsers - adminUsers;

    // Prepare the response object
    const response = {
      totalUsers,
      adminUsers,
      regularUsers,
      users: usersOnPage,
    };

    res.json(response);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "request error" });
  }
});
