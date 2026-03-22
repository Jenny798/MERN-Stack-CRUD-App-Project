const Order = require("../models/Order");



exports.createOrder = async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress } = req.body;

    const newOrder = new Order({
  userId: req.user.id,
  items,
  totalAmount,
  shippingAddress,
  status: "ordered"
});

    await newOrder.save();

    res.status(201).json({ message: "Order placed", order: newOrder });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.user.id, 
    }).sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
