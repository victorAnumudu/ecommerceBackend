const adminRoutes = require("express").Router();

// USER CONTROLLERS AND MIDDLEWARES
const { handleAddProduct } = require("../controllers/Admin");
const { productUpload } = require("../multer/Multer"); //for user image upload
const { Authorized, isAdmin } = require("../middlewares/Authorization");

//ADMIN ROUTES
//Add Product Route
// adminRoutes.post("/product/add", productUpload.single("image"), Authorized, /*isAdmin, */handleAddProduct);


adminRoutes.post("/product/add", Authorized, isAdmin, productUpload.single("image"), handleAddProduct);

adminRoutes.put("/product/add/pid", Authorized, isAdmin, productUpload.single("image"), handleAddProduct);

adminRoutes.delete("/product/add/pid", Authorized, isAdmin, handleAddProduct);


module.exports = adminRoutes;
