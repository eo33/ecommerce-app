// Main libraries
const express = require("express");
const router = express.Router();
const authTokenAdmin = require("../middleware/authTokenAdmin");

// Models
const Users = require("../model/user");

// @route   GET users/get_users/:page
// @desc    Get users details by page
// @access  private
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

// @route   POST users/edit
// @desc    Delete users
// @acess   private
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
