const mongoose = require("mongoose");

// Create cart schema
const cartSchema = new mongoose.Schema({});

// export mongoose model as default
module.exports = mongoose.model("cart", cartSchema);
