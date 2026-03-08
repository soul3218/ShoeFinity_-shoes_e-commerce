const Shoe = require("../models/Shoe");

async function seedShoes() {
  const seedFlag = process.env.SEED_SHOES;
  const enabled =
    seedFlag == null
      ? String(process.env.NODE_ENV || "").toLowerCase() !== "production"
      : String(seedFlag).toLowerCase() === "true";
  if (!enabled) return;

  const existingCount = await Shoe.countDocuments();
  if (existingCount > 0) return;

  await Shoe.insertMany([
    {
      name: "Blaze Runner X",
      price: 149.99,
      image: "/shoes/shoe-1.png",
      description:
        "High-performance running shoe with responsive cushioning and breathable mesh upper. Perfect for marathon training and daily runs.",
      category: "Running",
      sizes: [7, 8, 9, 10, 11, 12],
      inStock: true,
    },
    {
      name: "Classic Court",
      price: 99.99,
      image: "/shoes/shoe-2.png",
      description:
        "Timeless casual sneaker with premium leather upper and iconic three-stripe design. A streetwear staple.",
      category: "Casual",
      sizes: [6, 7, 8, 9, 10, 11],
      inStock: true,
    },
    {
      name: "Emerald High Top",
      price: 189.99,
      image: "/shoes/shoe-3.png",
      description: "Retro basketball shoe with premium green leather and ankle support. Stand out on and off the court.",
      category: "Basketball",
      sizes: [8, 9, 10, 11, 12, 13],
      inStock: true,
    },
    {
      name: "Terra Leather",
      price: 129.99,
      image: "/shoes/shoe-4.png",
      description: "Minimalist leather sneaker with handcrafted details and premium materials. Effortless everyday elegance.",
      category: "Lifestyle",
      sizes: [7, 8, 9, 10, 11],
      inStock: true,
    },
    {
      name: "Trail Storm",
      price: 169.99,
      image: "/shoes/shoe-5.png",
      description: "Rugged trail running shoe with aggressive tread pattern and waterproof construction. Conquer any terrain.",
      category: "Trail",
      sizes: [8, 9, 10, 11, 12],
      inStock: true,
    },
    {
      name: "Aura Flex",
      price: 119.99,
      image: "/shoes/shoe-6.png",
      description:
        "Lightweight women's running shoe with flexible knit upper and cloud-like cushioning. Run in comfort and style.",
      category: "Running",
      sizes: [5, 6, 7, 8, 9, 10],
      inStock: true,
    },
  ]);

  // eslint-disable-next-line no-console
  console.log("Seeded sample shoes");
}

module.exports = seedShoes;

