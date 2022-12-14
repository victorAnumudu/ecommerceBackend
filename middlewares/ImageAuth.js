const formidable = require("formidable");

exports.userImage = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        status: false,
        message: "Image could not be uploaded",
      });
    }
    if (fields.image == "") {
      return res
        .status(400)
        .json({ status: false, message: "Please select Image" });
    }
    res.locals = { files, fields };
    next();
    // check for all fields
    // const { name, description, price, category, quantity, shipping } = fields;

    // if (
    //   !name ||
    //   !description ||
    //   !price ||
    //   !category ||
    //   !quantity ||
    //   !shipping
    // ) {
    //   return res.status(400).json({
    //     error: "All fields are required",
    //   });
    // }

    // let product = new Product(fields);

    // // 1kb = 1000
    // // 1mb = 1000000

    // if (files.photo) {
    //   // console.log("FILES PHOTO: ", files.photo);
    //   if (files.photo.size > 1000000) {
    //     return res.status(400).json({
    //       error: "Image should be less than 1mb in size",
    //     });
    //   }
    //   product.photo.data = fs.readFileSync(files.photo.path);
    //   product.photo.contentType = files.photo.type;
    // }

    // product.save((err, result) => {
    //   if (err) {
    //     console.log("PRODUCT CREATE ERROR ", err);
    //     return res.status(400).json({
    //       error: errorHandler(err),
    //     });
    //   }
    //   res.json(result);
    // });
  });
};
