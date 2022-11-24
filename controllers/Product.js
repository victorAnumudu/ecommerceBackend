const { productModel } = require("../models/Products");

exports.handleGetAllProduct = (req, res) => {
  productModel.find({}, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Opps! something happened. Try again",
      });
    }
    return res.status(201).json({ status: true, message: result });
  });
};


exports.handleGetProductById = (req, res) => {
    let {id} = req.params
    productModel.findById(id, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Opps! something happened. Try again",
        });
      }
      return res.status(200).json({ status: true, message: result });
    });
  };
