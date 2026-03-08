const express = require("express");
const { createOrder, getAllOrders, getMyOrders } = require("../controllers/orderController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/", protect, adminOnly, getAllOrders);
router.get("/mine", protect, getMyOrders);

module.exports = router;

