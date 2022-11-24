const productRoutes = require("express").Router();

// USER CONTROLLERS AND MIDDLEWARES
const {
  handleGetAllProduct,
  handleGetProductById,
} = require("../controllers/Product");
// const { Authorized } = require('../middlewares/Authorization')

//ROUTES
//User login route
productRoutes.get("/product", handleGetAllProduct);
productRoutes.get("/product/:id", handleGetProductById);

module.exports = productRoutes;
