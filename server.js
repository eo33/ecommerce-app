// Express application
const express = require("express");
const app = express();

// Allow CORS origins
const cors = require("cors");

// Using mongoose to connect with MongoDB
const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");
const path = require("path");

// Use swagger
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Import routes
const auth = require("./routes/auth");
const products = require("./routes/products");
const cart = require("./routes/cart");
const address = require("./routes/address");
const orders = require("./routes/orders");
const stats = require("./routes/stats");
const users = require("./routes/users");

// Enable all CORS origin
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Authorization", "Content-Type"],
  preflightContinue: false,
};

// Connect to MongoDB atlas cluster using mongoose
mongoose
  .connect(db)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error(error.message);
  });

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API docs",
      version: "1.0.0",
      description:
        "This is the documentation for the Furniture Bro's API. It follows the OpenAPI 3.0 specification. The docs were written alongisde the code, rendered using JSDoc, and published with SwaggerUI in ExpressJS. ",
    },
    tags: [
      {
        name: "Auth",
        description:
          "The account endpoints allow you to register an account, get an API key, validate your key, get users' details, and edit a user's details. ",
      },
      {
        name: "Products",
        description:
          "The product endpoints allow you to get the list of products available and the details. You can also get the picture of the product. If your account has administrative rights, you can modify and delete a product.",
      },
      {
        name: "Cart",
        description: "The cart endpoints allow you to add items in your cart, and look at what you currently have in there. You can also modify the number of items and remove items in the cart.",
      },
      {
        name: "Address",
        description:
          "The address endpoints allow you to add, modify, select and delete an address. You can view the list of addresses that you have. ",
      },
      {
        name: "Orders",
        description:
          "The orders endpoints allow you to view your current orders. You can also add, modify and delete your orders with these endpoints.",
      },
      {
        name: "Stats",
        description:
          "The statistics endpoints allow you to get the statistics of the users, products and orders. These metrics give you insights to the number of users, the most ordered items, and the status of the different orders. `",
      },
    ],
    components: {
      securitySchemes: {
        APIKey: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
          description: "Enter the JSON Web Token (JWT) ",
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Init middleware (to parse body in JSON format)
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors(corsOptions));

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
