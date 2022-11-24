const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

//USER SCHEMA
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // trim: true,
      // required: true,
      // maxlength: 32
    },
    email: {
      type: String,
      // trim: true,
      // required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      data: String,
      contentType: String,
    },
    role: {
      type: String,
      default: 'user',
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

exports.userModel = mongoose.model("userDetails", userSchema);
