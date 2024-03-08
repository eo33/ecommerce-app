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
 *     summary: Edit user's details by ID.
 *     description: Edit the user's details, such as _name_, _email_, and _admin status_. Values can be specified in the request body. Requires administrator's token. You can get admin's token by logging in to `john_doe@gmail.com` with the password of `123456`
 *     tags:
 *       - Auth
 *     security:
 *       - APIKey: []
 *     requestBody:
 *       description: JSON containing the _userId_, _newName_, _newEmail_, and _newAdminStatus_ to update the current value of the fields. Some field(s) are required. See schema for more details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The user's ID can be obtained from the `/auth/login` endpoint (required).
 *               newName:
 *                 type: string
 *                 description: The new name to replace the current name. If none provided, the existing name will remain (optional).
 *               newEmail:
 *                 type: string
 *                 description: The new email to replace the current email. If none provided, the existing email will remain (optional).
 *               newAdminStatus:
 *                 type: boolean
 *                 description: The new status to replace the current admin status. If none provided, the existing status will remain (optional).
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
 *     summary: Get all user's details, limit by page.
 *     description: Get the user's details, such as _id_, _name_, _email_,_password_ and _admin status_. Also return the total number of _totalUsers_, _adminUsers_, and _regularUsers_. Each page will show 20 users. Requires administrator's privilege.
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
