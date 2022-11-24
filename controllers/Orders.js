const { orderModel } = require("../models/Orders");

exports.handleOrder = (req, res) => {
  let newOrder = new orderModel({
    user_id: res.locals.id,
    email: req.body.email,
    items: req.body.cart,
    total_amount: req.body.totalAmount,
    payment_type: req.body.paymentType,
    payment_status: req.body.paymentStatus,
  });
  newOrder.save((err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Opps! something happened. Try again",
      });
    }
    return res.status(201).json({ status: true, message: "Order successful" });
  });
};

exports.handleViewOrders = (req, res) => {
  let userId = res.locals.id;

  orderModel.find({ userId }, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Opps! something happened. Try again",
      });
    }
    return res.status(201).json({ status: true, message: result });
  });
};
