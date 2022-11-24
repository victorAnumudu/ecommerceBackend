const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

//USER SCHEMA
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    category: {
      type: String,
    },
    price: {
      type: Number,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
    },
    image: {
      data: String,
      contentType: String,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

exports.productModel = mongoose.model("productDetails", productSchema);
