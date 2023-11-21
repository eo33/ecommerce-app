// Express application
const express = require("express");
const app = express();

// Using mongoose to connect with MongoDB
const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

// Import routes
const auth = require("./routes/auth");
const products = require("./routes/products");
const cart = require("./routes/cart");
const address = require("./routes/address");
const orders = require("./routes/orders");

// Connect to MongoDB atlas cluster using mongoose
mongoose
  .connect(db)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error(error.message);
  });

// Init middleware (to parse body in JSON format)
app.use(express.json());

// Setup main route
app.get("/", (req, res) => {
  console.log("Test");
  res.json({ msg: "de" });
});

// Setup routes
app.use("/auth", auth);
app.use("/products", products);
app.use("/cart", cart);
app.use("/address", address);
app.use("/orders", orders);

// Setup port
const PORT = process.env.PORT || 5000;

// Run server
app.listen(PORT, () => console.log(`running server on PORT: ${PORT}`));
