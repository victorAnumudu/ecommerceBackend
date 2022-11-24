const multer = require("multer");

const userDetailStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/users");
  },
  filename: (req, file, cb) => {
    const uniquePrefix = `${Math.random() * Math.random() * Math.random()}`;
    cb(null, `${uniquePrefix}_${file.originalname}`);
    // cb(null, file.originalname);
  },
});
exports.userDetailUpload = multer({ storage: userDetailStorage }); // setting multer to use the above storage

const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/products");
  },
  filename: (req, file, cb) => {
    const uniquePrefix = `${Math.random() * Math.random() * Math.random()}`;
    cb(null, `${uniquePrefix}_${file.originalname}`);
    // cb(null, file.originalname);
  },
});
exports.productUpload = multer({ storage: productStorage }); // setting multer to use the above storage
