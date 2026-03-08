import shoe1 from "@/assets/shoe-1.png";
import shoe2 from "@/assets/shoe-2.png";
import shoe3 from "@/assets/shoe-3.png";
import shoe4 from "@/assets/shoe-4.png";
import shoe5 from "@/assets/shoe-5.png";
import shoe6 from "@/assets/shoe-6.png";
import type { Shoe, Order } from "@/types";

export const mockShoes: Shoe[] = [
  {
    _id: "1",
    name: "Blaze Runner X",
    price: 149.99,
    image: shoe1,
    description: "High-performance running shoe with responsive cushioning and breathable mesh upper. Perfect for marathon training and daily runs.",
    category: "Running",
    sizes: [7, 8, 9, 10, 11, 12],
    inStock: true,
  },
  {
    _id: "2",
    name: "Classic Court",
    price: 99.99,
    image: shoe2,
    description: "Timeless casual sneaker with premium leather upper and iconic three-stripe design. A streetwear staple.",
    category: "Casual",
    sizes: [6, 7, 8, 9, 10, 11],
    inStock: true,
  },
  {
    _id: "3",
    name: "Emerald High Top",
    price: 189.99,
    image: shoe3,
    description: "Retro basketball shoe with premium green leather and ankle support. Stand out on and off the court.",
    category: "Basketball",
    sizes: [8, 9, 10, 11, 12, 13],
    inStock: true,
  },
  {
    _id: "4",
    name: "Terra Leather",
    price: 129.99,
    image: shoe4,
    description: "Minimalist leather sneaker with handcrafted details and premium materials. Effortless everyday elegance.",
    category: "Lifestyle",
    sizes: [7, 8, 9, 10, 11],
    inStock: true,
  },
  {
    _id: "5",
    name: "Trail Storm",
    price: 169.99,
    image: shoe5,
    description: "Rugged trail running shoe with aggressive tread pattern and waterproof construction. Conquer any terrain.",
    category: "Trail",
    sizes: [8, 9, 10, 11, 12],
    inStock: true,
  },
  {
    _id: "6",
    name: "Aura Flex",
    price: 119.99,
    image: shoe6,
    description: "Lightweight women's running shoe with flexible knit upper and cloud-like cushioning. Run in comfort and style.",
    category: "Running",
    sizes: [5, 6, 7, 8, 9, 10],
    inStock: true,
  },
];

export const mockOrders: Order[] = [
  {
    _id: "ord-1",
    userId: "user-1",
    userName: "John Doe",
    items: [
      { shoe: mockShoes[0], quantity: 1, size: 10 },
      { shoe: mockShoes[2], quantity: 1, size: 11 },
    ],
    total: 339.98,
    paymentMethod: "card",
    status: "confirmed",
    createdAt: "2026-03-05T10:30:00Z",
  },
  {
    _id: "ord-2",
    userId: "user-2",
    userName: "Jane Smith",
    items: [
      { shoe: mockShoes[5], quantity: 2, size: 7 },
    ],
    total: 239.98,
    paymentMethod: "online",
    status: "shipped",
    createdAt: "2026-03-06T14:15:00Z",
  },
];
