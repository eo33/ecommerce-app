const mongoose = require("mongoose");

// Create cart schema
const addressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  addresses: [
    {
      address: {
        type: String,
        required: true,
      },
      main: {
        type: Boolean,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("address", addressSchema);
