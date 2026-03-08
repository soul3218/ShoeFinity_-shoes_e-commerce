const mongoose = require("mongoose");

const shoeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, default: "" },
    category: { type: String, default: "" },
    sizes: [{ type: Number }],
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Shoe", shoeSchema);

