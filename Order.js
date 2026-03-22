const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items: [],
    totalAmount: Number,
    status: {
      type: String,
      default: "ordered",
    },

  
    shippingAddress: {
      address: String,
      city: String,
      pincode: String,
      landmark: String,
      phone: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);