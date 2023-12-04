// Express application
const express = require("express");
const app = express();

// Using mongoose to connect with MongoDB
const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");
const path = require("path");

// Import routes
const auth = require("./routes/auth");
const products = require("./routes/products");
const cart = require("./routes/cart");
const address = require("./routes/address");
const orders = require("./routes/orders");
const stats = require("./routes/stats");
const users = require("./routes/users");

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

// Setup routes
app.use("/auth", auth);
app.use("/products", products);
app.use("/cart", cart);
app.use("/address", address);
app.use("/orders", orders);
app.use("/stats", stats);
app.use("/users", users);

// Serve static assets in production
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Setup port
const PORT = process.env.PORT || 5000;

// Run server
app.listen(PORT, () => console.log(`running server on PORT: ${PORT}`));
