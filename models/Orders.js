const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

//ORDER SCHEMA
const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
    },
    email: {
      type: String,
    },
    items: [
      {
        image: { type: String },
        price: { type: Number },
        quantity: { type: Number },
        category: { type: String },
        title: { type: String },
      },
    ],
    total_amount: {
      type: String,
    },
    payment_type: {
      type: String,
    },
    payment_status: {
      type: String,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

exports.orderModel = mongoose.model("orderDetails", orderSchema);
