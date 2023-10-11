// Main library
const express = require("express");
const router = express.Router();
const authToken = require("../middleware/authToken");

// Import mongoose model
const Products = require("../model/Products");

// Multer: libraries
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Destination of uploaded file
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    // Filename of uploaded file
    // TODO: Find a way to uniquely name uploaded files
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  // Check if the file is an image (you can use mime-type checking libraries)
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("File type not supported"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter: fileFilter,
});

// Multer: check file type middleware
const checkFile = async (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ error: "File size should be less than 1MB (1024x1024)" });
    }
  } else if (err) {
    return res
      .status(500)
      .json({ error: "Only upload images file (e.g. JPEG, WEBP, etc)" });
  }
  next();
};

// API Routes

// @route   POST products/upload
// @desc    Upload item name, images, price, description and sold count
// @acess   private

router.post(
  "/upload",
  authToken,
  upload.single("image"),
  checkFile,
  async (req, res) => {
    try {
      const { name, price, description, soldCount } = req.body;
      const image = req.file.filename;

      // Send data to DB
      let newProduct = new Products({
        name,
        image,
        price,
        description,
        soldCount,
      });
      await newProduct.save();

      res.json({ msg: "product saved succesfully" });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: "request error" });
    }
  }
);

// @route   GET products
// @desc    Get the information about the product
// @acess   private

router.get("/", async (req, res) => {
  // Start from the root directory
  const uploadDirectory = "./uploads";
  const { name, images, price, description, soldCount } = req.body;

  try {
    // read the contents of the uploads directory
    const uploads = fs.readdirSync(uploadDirectory);

    res.json({ files: uploads });
  } catch (err) {
    console.error(err.message);
    return res.status("500").json({ msg: "request error" });
  }
});

module.exports = router;
