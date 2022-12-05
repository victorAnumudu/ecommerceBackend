const multer = require("multer");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

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
    cb(null, "upload/products");
  },
  filename: (req, file, cb) => {
    const uniquePrefix = `${Math.random() * Math.random() * Math.random()}`;
    cb(null, `${uniquePrefix}_${file.originalname}`);
    // cb(null, file.originalname);
  },
});
exports.productUpload = multer({ storage: productStorage }); // setting multer to use the above storage

/*using multer together with cloudinary */

// Multer setup
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    const uniquePrefix = `${Math.random() * Math.random() * Math.random()}`;
    cb(null, `${uniquePrefix}_${file.originalname}`);
    // cb(null, file.originalname);
  },
});

exports.upload = multer({ storage: storage });

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
exports.uploadToCloudinary = async (locaFilePath) => {
  // locaFilePath: path of image which was just
  // uploaded to "uploads" folder

  var mainFolderName = "ecommerce";
  // filePathOnCloudinary: path of image we want
  // to set when it is uploaded to cloudinary
  var filePathOnCloudinary = mainFolderName + "/" + locaFilePath;
 return cloudinary.uploader
    .upload(locaFilePath, { public_id: filePathOnCloudinary })
    .then((result) => {
      // Image has been successfully uploaded on
      // cloudinary So we dont need local image
      // file anymore
      // Remove file from local uploads folder
      fs.unlinkSync(locaFilePath);
      return {
        status: true,
        url: result.url,
        publicId: result.public_id
      };
    })
    .catch((error) => {
      // Remove file from local uploads folder
      fs.unlinkSync(locaFilePath);
      return { status: false };
    });
};


//DELETING FROM CLOUDINARY
exports.delFromCloudinary = async (imageName) => {
  return cloudinary.uploader.destroy(`ecommerce/upload/${imageName}`, (err, result)=>{
    if(err){
      return {status: false}
    }
  })
}