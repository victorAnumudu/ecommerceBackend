const { userModel } = require("../models/Users");
const jwt = require("jsonwebtoken");

exports.Authorized = (req, res, next) => {
  let token = req.headers.authorization;

  try {
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    let userId = verifyToken.id;
    res.locals.id = userId;
    next();
  } catch (error) {
    return res
      .status(400)
      .json({ status: false, message: "You're not Authorized, Please Login" });
  }
};

exports.isAdmin = async (req, res, next) => {
    let id = res.locals.id;
  try {
      const userIsAdmin = await userModel.findById(id);
      if(!userIsAdmin){
        return res.status(400).json({status: false, message: "User is not recognized"})
      }
      if(userIsAdmin.role != 'admin'){
        return res.status(400).json({status: false, message: "You're not Authorized to perform the action"})
      }
      next()
  } catch (error) {
      return res.status(500).json({status: false, message: "Opps! something went wrong"})
  }
};
