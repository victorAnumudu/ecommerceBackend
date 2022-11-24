const orderRoutes = require("express").Router();

// USER CONTROLLERS AND MIDDLEWARES
const { handleOrder, handleViewOrders } = require("../controllers/Orders");
const { Authorized } = require("../middlewares/Authorization");

//ROUTES
//User login route
orderRoutes.post("/order", Authorized, handleOrder);

orderRoutes.get("/view/orders", Authorized, handleViewOrders);

module.exports = orderRoutes;
