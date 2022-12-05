const userRoutes = require("express").Router();

// USER CONTROLLERS AND MIDDLEWARES
const { handleRegister, handleLogin, handleGetUserInfo, handleUpdateUser } = require("../controllers/Users");
const { userDetailUpload, upload } = require('../multer/Multer'); //for user image upload
const { Authorized } = require('../middlewares/Authorization')

//ROUTES
//User login route
userRoutes.post("/login", handleLogin);

//User register route
// userRoutes.post("/register", userDetailUpload.single("image"), handleRegister);
userRoutes.post("/register", upload.single("image"), handleRegister);


//Get User info
userRoutes.get("/info", Authorized, handleGetUserInfo);

//User update route
userRoutes.put("/update", Authorized, userDetailUpload.single("image"), handleUpdateUser);

//User checkout route
// userRoutes.post("/checkout", (req, res) => {
//   console.log("working");
//   res.status(200).json({ status: true, message: "good to go" });
// });

//User order route
// userRoutes.get("/order", (req, res) => {
//   console.log("working");
//   res.status(200).json({ status: true, message: "good to go" });
// });



module.exports = userRoutes;
