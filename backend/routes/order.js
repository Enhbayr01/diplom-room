// routes/order.js
const express = require("express");
const router = express.Router();
const protect = require("../middleware/protect"); 
const { 
  getAllOrders, 
  getOrderById, 
  createOrder, 
  updateOrder, 
  deleteOrder 
} = require("../controller/orders");

// Protect middleware ашиглах
router.get("/", protect, getAllOrders);
router.get("/:id", protect, getOrderById);
router.post("/", protect, createOrder);
router.put("/:id", protect, updateOrder);
router.delete("/:id", protect, deleteOrder);

module.exports = router;  