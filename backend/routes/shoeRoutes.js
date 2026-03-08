const express = require("express");
const { getShoes, addShoe, updateShoe, deleteShoe } = require("../controllers/shoeController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getShoes);
router.post("/", protect, adminOnly, addShoe);
router.put("/:id", protect, adminOnly, updateShoe);
router.delete("/:id", protect, adminOnly, deleteShoe);

module.exports = router;

