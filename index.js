const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express(); // initializing express

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/static", express.static("uploads/users")); // allows user navigate to backend uploads/users folder
app.use("/static/products", express.static("uploads/products")); // allows user navigate to backend uploads/users folder

const port = process.env.PORT || 5000; // default port for sever

// connecting to mongoDB using mongoose
let databaseConnection = "";
if (process.env.NODE_ENV === "production") {
  databaseConnection = process.env.MONGO_URL_PRO;
} else if (process.env.NODE_ENV === "development") {
  databaseConnection = process.env.MONGO_URL_DEV;
} else {
  databaseConnection = process.env.MONGO_URL_PRO;
}
mongoose
  .connect(databaseConnection)
  .then(() => {
    console.log("Database running");
  })
  .catch((err) => {
    console.log(`Database connection went wrong, ${err}`);
  });

//APP ROUTERS
const userRoutes = require("./routes/Users"); //user routes
const adminRoutes = require("./routes/Admin") // admin routes
const orderRoutes = require("./routes/Orders") // order routes
const productRoutes = require("./routes/Product") // order routes


//APP ROUTES
app.get("/", (req, res) =>
  res.status(200).json({ status: true, message: "API IS WORKING" })
);

app.use("/api/auth", userRoutes); // All User routes
app.use("/api/user", userRoutes); // All User routes
app.use("/api/user", orderRoutes) // ALL ORDER ROUTES

app.use("/api/admin", adminRoutes) // ALL ADMN ROUTES


app.use("/api", productRoutes) // ALL PRODUCT ROUTES

//sever connection
app.listen(port, () =>
  console.log(
    `Server listening to port ${port} your environment is ${process.env.NODE_ENV}`
  )
);
