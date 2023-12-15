const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  // productId:{
  //   type: String,
  //   required: true

  // },
  company: {
    type: String,
    required: true,
  },
  image: {
    type: [String], // Define images as an array of strings
    default: [], // Default to an empty array if no images are provided
  },
});

const Products = mongoose.model("products", productsSchema);

module.exports = Products;
