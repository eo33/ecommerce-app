const mongoose = require("mongoose");

// Create user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  images: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: "No available description",
  },
});

// export mongoose model as default
module.exports = mongoose.model("Product", productSchema);
