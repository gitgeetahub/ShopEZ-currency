export type Product = {
  id: string;
  name: string;
  category: string;
  priceINR: number;
  rating: number;
  reviews: number;
  discount: number;
  image: string;
  description: string;
  seller: string;
};

const img = (seed: string) =>
  `https://picsum.photos/seed/${seed}/600/600`;

export const products: Product[] = [
  { id: "p1", name: "Wireless Bluetooth Headphones", category: "Electronics", priceINR: 2499, rating: 4.5, reviews: 1284, discount: 20, image: img("headphones"), description: "Immersive sound with active noise cancellation and 30-hour battery life.", seller: "SoundHub" },
  { id: "p2", name: "Smartphone 128GB", category: "Electronics", priceINR: 18999, rating: 4.3, reviews: 923, discount: 10, image: img("smartphone"), description: "6.5\" AMOLED, 50MP camera, 5000mAh battery.", seller: "MobileMart" },
  { id: "p3", name: "Men's Cotton T-Shirt", category: "Fashion", priceINR: 499, rating: 4.1, reviews: 340, discount: 30, image: img("tshirt"), description: "100% breathable cotton, regular fit.", seller: "UrbanWear" },
  { id: "p4", name: "Running Shoes", category: "Fashion", priceINR: 2199, rating: 4.6, reviews: 812, discount: 15, image: img("shoes"), description: "Lightweight mesh upper with cushioned sole.", seller: "FitStep" },
  { id: "p5", name: "Stainless Steel Water Bottle", category: "Home", priceINR: 799, rating: 4.7, reviews: 502, discount: 5, image: img("bottle"), description: "Keeps drinks cold for 24h, hot for 12h.", seller: "HydroLife" },
  { id: "p6", name: "Ergonomic Office Chair", category: "Home", priceINR: 8999, rating: 4.2, reviews: 189, discount: 25, image: img("chair"), description: "Adjustable lumbar support, breathable mesh back.", seller: "WorkWell" },
  { id: "p7", name: "Non-stick Cookware Set", category: "Home", priceINR: 3499, rating: 3.9, reviews: 233, discount: 18, image: img("cookware"), description: "5-piece induction-friendly cookware set.", seller: "KitchenPro" },
  { id: "p8", name: "Yoga Mat 6mm", category: "Sports", priceINR: 899, rating: 4.4, reviews: 611, discount: 12, image: img("yogamat"), description: "Anti-slip TPE mat with carry strap.", seller: "FitStep" },
  { id: "p9", name: "Novel: The Silent Patient", category: "Books", priceINR: 349, rating: 4.8, reviews: 4210, discount: 22, image: img("book"), description: "A gripping psychological thriller.", seller: "BookNest" },
  { id: "p10", name: "Programming in Python", category: "Books", priceINR: 599, rating: 4.5, reviews: 890, discount: 15, image: img("pythonbook"), description: "Comprehensive guide from beginner to advanced.", seller: "BookNest" },
  { id: "p11", name: "Smart LED Bulb", category: "Electronics", priceINR: 449, rating: 3.6, reviews: 421, discount: 10, image: img("bulb"), description: "Wi-Fi enabled, 16M colors, voice control.", seller: "SmartHome" },
  { id: "p12", name: "Leather Wallet", category: "Fashion", priceINR: 1199, rating: 4.0, reviews: 267, discount: 20, image: img("wallet"), description: "Genuine leather with RFID blocking.", seller: "UrbanWear" },
  { id: "p13", name: "Gaming Mouse RGB", category: "Electronics", priceINR: 1299, rating: 4.6, reviews: 733, discount: 15, image: img("mouse"), description: "16000 DPI sensor with customizable RGB.", seller: "GameZone" },
  { id: "p14", name: "Backpack 30L", category: "Fashion", priceINR: 1499, rating: 4.3, reviews: 512, discount: 25, image: img("backpack"), description: "Water-resistant with laptop compartment.", seller: "TravelMate" },
  { id: "p15", name: "Coffee Maker", category: "Home", priceINR: 4299, rating: 4.1, reviews: 178, discount: 12, image: img("coffee"), description: "Programmable 12-cup drip coffee maker.", seller: "KitchenPro" },
  { id: "p16", name: "Fitness Smartwatch", category: "Electronics", priceINR: 3999, rating: 4.4, reviews: 1120, discount: 30, image: img("watch"), description: "Heart rate, SpO2, 7-day battery.", seller: "FitStep" },
];

export const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];

export const currencies = {
  INR: { symbol: "₹", rate: 1, label: "Indian Rupee" },
  USD: { symbol: "$", rate: 0.012, label: "US Dollar" },
  EUR: { symbol: "€", rate: 0.011, label: "Euro" },
  GBP: { symbol: "£", rate: 0.0094, label: "British Pound" },
  AED: { symbol: "AED ", rate: 0.044, label: "UAE Dirham" },
  JPY: { symbol: "¥", rate: 1.87, label: "Japanese Yen" },
} as const;

export type CurrencyCode = keyof typeof currencies;

export const formatPrice = (inr: number, code: CurrencyCode) => {
  const { symbol, rate } = currencies[code];
  const val = inr * rate;
  return `${symbol}${val.toLocaleString(undefined, { maximumFractionDigits: code === "JPY" || code === "INR" ? 0 : 2 })}`;
};