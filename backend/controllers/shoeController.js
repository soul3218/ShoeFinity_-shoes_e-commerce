const Shoe = require("../models/Shoe");

const getShoes = async (_req, res) => {
  const shoes = await Shoe.find().sort({ createdAt: -1 });
  res.json(shoes);
};

const addShoe = async (req, res) => {
  const { name, price, image, description, category, sizes, inStock } = req.body || {};
  if (!name || price == null || !image) return res.status(400).json({ message: "Name, price, and image are required" });

  const shoe = await Shoe.create({
    name,
    price,
    image,
    description: description ?? "",
    category: category ?? "",
    sizes: Array.isArray(sizes) ? sizes : [],
    inStock: inStock ?? true,
  });
  res.status(201).json(shoe);
};

const updateShoe = async (req, res) => {
  const { id } = req.params;
  const shoe = await Shoe.findByIdAndUpdate(id, req.body, { new: true });
  if (!shoe) return res.status(404).json({ message: "Shoe not found" });
  res.json(shoe);
};

const deleteShoe = async (req, res) => {
  const { id } = req.params;
  const shoe = await Shoe.findByIdAndDelete(id);
  if (!shoe) return res.status(404).json({ message: "Shoe not found" });
  res.json({ message: "Deleted" });
};

module.exports = { getShoes, addShoe, updateShoe, deleteShoe };

