const { productModel } = require("../models/Products");
const fs = require("fs");

//HELPER FUNCTIONS
//function to check if user exist
const { isEmpty } = require("./Functions");


//function to register user
exports.handleAddProduct = async (req, res) => {
  let { title, category, price, description } = req.body;

  //varible to hold error in event of any error in validation
  let errorExist;

  let requiredArr = ["title", "category", "price", "description"];
  let inputs = { title, category, price, description };

  //TEST TO SEE IF USER SELECTED IMAGE
  errorExist = req.file;
  if (errorExist == undefined) {
    return res
      .status(400)
      .json({ status: false, message: "Please select an image" });
  }

  //check to see if any required field is empty
  errorExist = isEmpty(requiredArr, inputs);
  if (errorExist.length > 0) {
    fs.unlinkSync(req.file.path); // deletes the image
    return res.status(401).json({
      status: false,
      message: `Please enter ${errorExist.join(", ")}`,
    });
  }

  //   TRY CREATING THE PRODUCT
  let imageUrl =
    req.protocol +
    "://" +
    req.hostname +"/static/products/" +
    req.file.filename;
  let newProduct = new productModel({
    ...inputs,
    image: {
      data: imageUrl,
      contentType: "image/png",
    },
  });

  newProduct.save((err, result) => {
    if (err) {
      fs.unlinkSync(req.file.path); // deletes the image
      return res.status(500).json({
        status: false,
        message: "Opps! something happened. Try again",
      });
    }
    return res
      .status(201)
      .json({ status: true, message: "Product added successfully" });
  });
};