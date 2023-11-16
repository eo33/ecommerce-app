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

// Database validation to ensure only one main address
/*
addressSchema.path("address").validate(function (value) {
  const mainAddresses = value.filter((address) => address.main);
  return mainAddresses.length <= 1; // There should be at most one main address
}, "Only one main address is allowed");
*/
// export mongoose model as default
module.exports = mongoose.model("address", addressSchema);
