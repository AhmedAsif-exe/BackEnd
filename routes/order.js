const express = require("express");
const { getOrders, addOrders, get } = require("../data/user");

const router = express.Router();
router.post("/orders", async (req, res) => {
  const { email } = req.body;
  const orders = await getOrders(email);
  if (!orders) {
    return res.status(212).json({ message: "Failed to fetch orders" });
  }
  res.status(209).json({ orders: orders });
});
router.post("/add-orders", async (req, res) => {
  const { email, order } = req.body;
  const orderPlace = await addOrders(email, order);
  res.status(210).json({ message: "successfully added" });
});
module.exports = router;
