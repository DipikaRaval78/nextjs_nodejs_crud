const mongoose = require("mongoose");
const { error } = require("console");
const Product = require("../models/Products");
const multer = require("multer");
// const upload = multer({ dest: "uploads/" });
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      path.join(__dirname, "../public/ProductImages"),
      function (error, success) {
        if (error) throw error;
      }
    );
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + "-" + file.originalname;
    cb(null, filename, function (error1, success1) {
      if (error1) throw error1;
    });
    console.log(filename, "-------------filename");
  },
});

const filefilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB limit per file
  },
  fileFilter: filefilter,
});

const validateProducts = async (req, res) => {
  const { name, price, category, userId, company } = req.body;
  console.log(req.body, "------------------------------body");
  //   const image1 = req.body.image
  //   console.log(image1,"hhhhhhhhhhhhhhhhhhh")

  if (!name || !price || !category || !userId || !company) {
    res
      .status(400)
      .json({ message: "Invalid request. Missing required fields." });
    return false;
  }

  // Check if product already exists in DB using the productId field
  const existingProduct = await Product.findOne({ name: name }).exec();
  if (existingProduct) {
    console.log("Product Already in database");
    res.status(400).json({ message: "Product Already in database" });
    return false;
  }

  return true;
};

const addProduct = async (req, res) => {
  const isValidRequest = await validateProducts(req, res);

  if (isValidRequest) {
    try {
      const { name, price, category, userId, company } = req.body;
      let image = [];

      // if (req.file) {
      //     image.push(req.file.path);
      //     console.log(image,"-----------------image")
      // }

      //  If multiple files are uploaded, req.files contains an array of file information
      if (req.files && req.files.length > 0) {
        image = req.files.map((file) => file.filename);
      }

      console.log(image, "----------------jjjjjjjjjjjjjj");
      const productData = await Product.create({
        name,
        price,
        category,
        userId,
        company,
        image: image,
      });

      const imageUrls = productData.image.map(
        (image) => `${process.env.baseURL}/public/ProductImages/${image}`
      );
      // const imageUrl = `${process.env.baseURL}/public/ProductImages/${productData.image}`;
      console.log(productData, "-----------------productData");

      return res.status(200).json({
        message: "Product Added Successfully",
        productData: {
          name: productData.name,
          price: productData.price,
          category: productData.category,
          userId: productData.userId,
          company: productData.company,
          productImage: imageUrls,
        },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    console.log(products, "-------------------->");

    if (products.length > 0) {
      const productsWithImageURLs = products.map((product) => {
        return {
          ...product._doc,
          image: product.image.map(
            (imagePath) =>
              `${process.env.baseURL}/public/ProductImages/${imagePath}`
          ),
        };
      });
      res.json({
        message: `Total ${products.length} Products Found`,
        products: productsWithImageURLs,
      });
    } else {
      res.json({
        message: "No Products Found",
      });
    }
  } catch (error) {
    // Handle errors, such as database errors
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteProducts = async (req, res) => {
  console.log("working", req.params.id);
  try {
    const deleteProduct = await Product.deleteOne({ _id: req.params.id });
    res.send(deleteProduct);
  } catch (error) {
    // Handle errors, such as database errors
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateProducts = async (req, res) => {
  try {
    const updateProduct = await Product.updateOne(
      { _id: req.params.id },
      {
        $set: req.body,
      }
    );
    res.json({ message: "Product updated successfully" ,
  updateProduct:updateProduct,});
   
  } catch (error) {
    // Handle errors, such as database errors
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = {
  upload, // Export upload separately
  addProduct,
  getProducts,
  updateProducts,
  deleteProducts, // Export addproduct separately
};
