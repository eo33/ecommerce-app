const mongoose = require("mongoose");

// Create cart schema
const ordersSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1,
      },
      shipping: {
        type: String,
        required: true,
        enum: ["Next day", "Regular", "Budget"],
      },
    },
  ],
  status: {
    type: String,
    required: true,
    enum: ["pending", "delivery", "completed"],
  },
  address: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("orders", ordersSchema);
