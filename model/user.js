const mongoose = require("mongoose");

// Create user schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  admin: { type: Boolean, default: false },
});

// export mongoose model as default
module.exports = mongoose.model("User", userSchema);
