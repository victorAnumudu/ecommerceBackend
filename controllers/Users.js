const { userModel } = require("../models/Users");
const bcryptjs = require("bcryptjs");
const fs = require("fs");
const jwt = require("jsonwebtoken");

//HELPER FUNCTIONS
//function to check if user exist
const { userExist, isEmpty } = require("./Functions");


//function to register user
exports.handleRegister = async (req, res) => {
  let { email, name, password, confirm_pwd } = req.body;

  //varible to hold error in event of any error in validation
  let errorExist;

  let requiredArr = ["name", "email", "password"];
  let inputs = { email, name, password };

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

  // checking if user already exists and returns failed status
  errorExist = await userExist(email);
  if (errorExist == true) {
    fs.unlinkSync(req.file.path); // deletes the image
    return res
      .status(401)
      .json({ status: false, message: "User already exists" });
  } else if (errorExist == "server error") {
    fs.unlinkSync(req.file.path); // deletes the image
    return res
      .status(500)
      .json({ status: false, message: "Opps! something went wrong" });
  }

  //   TRY CREATING THE USER IF NO ERROR EXISTS
  let newPwd = bcryptjs.hashSync(password);
  let imageUrl =
    req.protocol +
    "://" +
    req.hostname +
    ":" +
    5000 +
    "/static/" +
    req.file.filename;
  let newUser = new userModel({
    name,
    email,
    password: newPwd,
    image: {
      data: imageUrl,
      contentType: "image/png",
    },
  });

  newUser.save((err, result) => {
    if (err) {
      fs.unlinkSync(req.file.path); // deletes the image
      return res.status(500).json({
        status: false,
        message: "Opps! something happened. Try again",
      });
    }
    return res
      .status(201)
      .json({ status: true, message: "User created successfully" });
  });
};

// FUNCTION TO LOGIN USER IN
exports.handleLogin = async (req, res) => {
  let { email, password } = req.body;

  //varible to hold error in event of any error in validation
  let errorExist;

  let requiredArr = ["email", "password"];
  let inputs = { email, password };

  //check to see if any required field is empty
  errorExist = isEmpty(requiredArr, inputs);
  if (errorExist.length > 0) {
    return res.status(401).json({
      status: false,
      message: `Please enter ${errorExist.join(", ")}`,
    });
  }

  // getting user from database
  try {
    let user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: "User does not exist" });
    }

    // comparing to see if user password does not match
    if (!bcryptjs.compareSync(req.body.password, user.password)) {
      return res
        .status(400)
        .json({ status: false, message: "User password/email does not match" });
    }

    //proceed if the password matched
    let token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    return res
      .status(200)
      .json({ status: true, message: "Logging user in", token });
  } catch (error) {
    return res
      .status(400)
      .json({ status: false, message: "Opps! something went wrong" });
  }
};

exports.handleGetUserInfo = async (req, res) => {
  let userId = res.locals.id;
  try {
    const userInfo = await userModel.findById(userId);
    if (!userInfo) {
      return res.status(400).json({ status: false, message: "User not found" });
    }
    res.status(200).json({
      status: true,
      message: {
        name: userInfo.name,
        email: userInfo.email,
        image: userInfo.image.data,
        role: userInfo.role,
      },
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Something went wrong!" });
  }
};

//FUNCTION TO UPDATE USER INFO
exports.handleUpdateUser = async (req, res) => {
  let userId = res.locals.id;

  // CHECKING IF USER CHANGED PASSWORD AND HASHING IT
  if (req.body.password) {
    req.body.password = bcryptjs.hashSync(req.body.password);
  }

  //CHECKING TO SEE IF USER SUBMITTED NEW IMAGE
  if(req.file){
    let imageUrl =req.protocol +"://" +req.hostname +":" +5000 +"/static/" +req.file.filename;
    req.body.image = {
      data: imageUrl,
      contentType: "image/png",
    }
  }

  // TRYING TO UPDATE USER
  try {
    let userImage = await userModel.findById(userId) // gets user in case there is need to delete the former image
    const updatedUser = await userModel.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    if (!updatedUser) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res
      .status(400)
      .json({ status: false, message: "Failed to Update" });
    }
    
    //IF SUCCESSFUL AND USER SELECTED AN IMAGE FOR UPLOAD GET THE USERS FORMER IMAGE AND REMOVE IT
    if(req.file){
      let oldUserImage = userImage.image.data.split('/')[userImage.image.data.split('/').length-1]
      fs.unlinkSync(`uploads/users/${oldUserImage}`);
    }
    res.status(200).json({
      status: true,
      message: "User Updated",
    });
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ status: false, message: "Something went wrong!" });
  }
};

//FUNCTION TO GET USER
exports.getUser = async (req, res) => {
  let userId = req.params.id;
  try {
    let user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: "User does not exist" });
    }
    return res.status(200).json({ status: true, message: user });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Opps! something happened" });
  }
};
