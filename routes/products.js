// Main library
const express = require("express");
const router = express.Router();
const authToken = require("../middleware/authToken");
const authTokenAdmin = require("../middleware/authTokenAdmin");

// Import mongoose model
const Products = require("../model/products");

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

// @route   GET products
// @desc    Get the list of products from MongoDB
// @acess   public

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get the list of available products and it's details.
 *     description: Get the _id_, _name_, _image_, _price_, _description_, and _soldCount_ of all of the products.
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get("/", async (req, res) => {
  try {
    const products = await Products.find({});
    res.send(products);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "request error" });
  }
});

// @route   POST products/upload
// @desc    Upload item name, images, price, description and sold count
// @acess   private
/**
 * @swagger
 * /products/upload:
 *   post:
 *     summary: Upload a product as an admin.
 *     description: Upload a product, including its _name_, _image_, _price_, _description_, and _soldCount_.
 *     tags:
 *       - Products
 *     security:
 *       - APIKey: []
 *     requestBody:
 *       description:
 *         Multipart form data containing the following fields to create a new product.
 *         All fields are required.
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the item (required).
 *                 example: "sample product"
 *               image:
 *                 type: file
 *                 description:
 *                   Local path to image. Image will be uploaded to the backend filesystem using _Multer_.
 *                   Can only accept files less than 1MB (1024x1024px) and must be an image file (required).
 *                 example: "/C:/Users/Documents/Sample_Directory/Sample_Table.webp"
 *               price:
 *                 type: integer
 *                 description: The price of the item (required).
 *                 example: 50
 *               description:
 *                 type: string
 *                 description: The description of the item (required).
 *               soldCount:
 *                 type: integer
 *                 description: The current sold count of the item (required).
 *     responses:
 *       200:
 *         description: Successful response
 *       403:
 *         description: Unauthorized, reuqires adminitrator privilege
 */

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

// @route   GET products/:filename
// @desc    Get the image of the product from filesystem
// @acess   public

/**
 * @swagger
 * /products/{filename}:
 *   get:
 *     summary: Get the image of the product.
 *     description: Get the image of the specified product in the parameter.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: filename
 *         schema:
 *           type: string
 *         description: The filename of the product. This name is also the same as the name of the file in the directory.
 *         required: true
 *         example: 1700110836527.webp
 *     responses:
 *       200:
 *         description: Successful response
 *       403:
 *         description: Unauthorized, reuqires adminitrator privilege
 */
router.get("/:filename", async (req, res) => {
  try {
    const filename = req.params.filename;
    const uploadDirectory = path.join(__dirname, "../uploads");
    res.sendFile(path.join(uploadDirectory, `${filename}`));
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "request error" });
  }
});

// @route   PUT products/:image
// @desc    Update a product image and it's details
// @acess   private
/**
 * @swagger
 * /products/{filename}:
 *   put:
 *     summary: Update a product image and it's details.
 *     description: Edit a product's details, such as the _name_, _image_, _price_, _description_, and _soldCount_. Product is specified in the filename parameter.
 *     tags:
 *       - Products
 *     security:
 *       - APIKey: []
 *     parameters:
 *       - in: path
 *         name: filename
 *         schema:
 *           type: string
 *         description: The filename of the product. This name is also the same as the name of the file in the directory.
 *         required: true
 *         example: 1700110836527.webp
 *     requestBody:
 *       description:
 *         Multipart form data containing the following fields to create a new product. See description for more details.
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The **new** name of the item.
 *                 example: "new product"
 *               image:
 *                 type: file
 *                 description:
 *                   Local path to the **new** image. Image will be uploaded to the backend filesystem using _Multer_.
 *                   Can only accept files less than 1MB (1024x1024px) and must be an image file.
 *                 example: "/C:/Users/Documents/Sample_Directory/Sample_Table.webp"
 *               price:
 *                 type: integer
 *                 description: The **new** price of the item.
 *                 example: 50
 *               description:
 *                 type: string
 *                 description: The **new** description of the item.
 *               soldCount:
 *                 type: integer
 *                 description: The **new** sold count of the item.
 *     responses:
 *       200:
 *         description: Successful response
 *       403:
 *         description: Unauthorized, reuqires adminitrator privilege
 */

router.put(
  "/:image",
  authTokenAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      const oldImage = req.params.image;
      const { name, price, description, soldCount } = req.body;
      let image = oldImage;
      // Check if a new file is uploaded
      if (req.file) {
        image = req.file.filename; // Set the new image to the uploaded file's filename
        // Delete the old file from the file system
        const filePath = path.join(__dirname, "..", "uploads", oldImage);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ msg: "Error deleting old file" });
          }
          console.log(`File ${oldImage} deleted`);
        });
      }
      // Update in MongoDB
      const filter = { image: oldImage };
      const update = { name, image, price, description, soldCount };
      const updatedProduct = await Products.findOneAndUpdate(filter, update, {
        new: true,
      });

      if (!updatedProduct) {
        return res.status(404).json({ msg: "Product not found" });
      }
      return res.json({
        msg: "Product updated successfully",
        updatedProduct,
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: "Request error" });
    }
  }
);

// @route   DELETE products/:image
// @desc    Delete a product image and it's details
// @acess   private

/**
 * @swagger
 * /products/{filename}:
 *   delete:
 *     summary: Delete the product
 *     description: Delete the product by its filename. Requires administrator's privilege.
 *     tags:
 *       - Products
 *     security:
 *       - APIKey: []
 *     parameters:
 *       - in: path
 *         name: filename
 *         schema:
 *           type: string
 *         description: The filename of the product. This name is also the same as the name of the file in the directory.
 *         required: true
 *         example: 1701574147387.webp
 *     responses:
 *       200:
 *         description: Successful response
 *       403:
 *         description: Unauthorized, reuqires adminitrator privilege.
 */

router.delete("/:image", authTokenAdmin, async (req, res) => {
  try {
    const image = req.params.image;
    // Delete from MongoDB
    await Products.findOneAndDelete({ image: image });
    // Delete from File system
    const filePath = path.join(__dirname, "..", "uploads", image);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ msg: "Error deleting file" });
      }
      console.log(`File ${image} deleted`);
      return res.status(200).json({ msg: "Item deleted" });
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "request error" });
  }
});

// @route   GET products/details/:filename
// @desc    Get the product details of a file
// @acess   private
/**
 * @swagger
 * /products/details/{filename}:
 *   get:
 *     summary: Get the details of a product.
 *     description: Get the details of a product from the filename.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: filename
 *         schema:
 *           type: string
 *         description: The filename of the product. This name is also the same as the name of the file in the directory.
 *         required: true
 *         example: 1700110836527.webp
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get("/details/:filename", async (req, res) => {
  try {
    const filename = req.params.filename;
    const selectedProduct = await Products.findOne({ image: filename });
    res.json(selectedProduct);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "request error" });
  }
});

// @route   GET products/random/:count
// @desc    Get X (count) random number of products
// @acess   public
/**
 * @swagger
 * /products/random/{count}:
 *   get:
 *     summary: Get random products
 *     description: Get _count_ number of random products for display on the landing page.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: count
 *         schema:
 *           type: integer
 *         description: The number of random products.
 *         required: true
 *         example: 3
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get("/random/:count", async (req, res) => {
  try {
    const count = parseInt(req.params.count, 10);

    if (isNaN(count) || count <= 0) {
      return res.status(400).json({ msg: "Invalid count parameter" });
    }
    const randomProducts = await Products.aggregate([
      { $sample: { size: count } },
    ]);

    res.json(randomProducts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

module.exports = router;
