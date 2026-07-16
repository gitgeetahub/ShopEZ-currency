const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { MongoMemoryServer } = require('mongodb-memory-server');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

const products = [
  { id: 'p1', name: 'Wireless Bluetooth Headphones', category: 'Electronics', priceINR: 2499, rating: 4.5, reviews: 1284, discount: 20, image: 'https://picsum.photos/seed/headphones/600/600', description: 'Immersive sound with active noise cancellation and 30-hour battery life.', seller: 'SoundHub' },
  { id: 'p2', name: 'Smartphone 128GB', category: 'Electronics', priceINR: 18999, rating: 4.3, reviews: 923, discount: 10, image: 'https://picsum.photos/seed/smartphone/600/600', description: '6.5" AMOLED, 50MP camera, 5000mAh battery.', seller: 'MobileMart' },
  { id: 'p3', name: 'Men\'s Cotton T-Shirt', category: 'Fashion', priceINR: 499, rating: 4.1, reviews: 340, discount: 30, image: 'https://picsum.photos/seed/tshirt/600/600', description: '100% breathable cotton, regular fit.', seller: 'UrbanWear' },
  { id: 'p4', name: 'Running Shoes', category: 'Fashion', priceINR: 2199, rating: 4.6, reviews: 812, discount: 15, image: 'https://picsum.photos/seed/shoes/600/600', description: 'Lightweight mesh upper with cushioned sole.', seller: 'FitStep' },
  { id: 'p5', name: 'Stainless Steel Water Bottle', category: 'Home', priceINR: 799, rating: 4.7, reviews: 502, discount: 5, image: 'https://picsum.photos/seed/bottle/600/600', description: 'Keeps drinks cold for 24h, hot for 12h.', seller: 'HydroLife' },
  { id: 'p6', name: 'Ergonomic Office Chair', category: 'Home', priceINR: 8999, rating: 4.2, reviews: 189, discount: 25, image: 'https://picsum.photos/seed/chair/600/600', description: 'Adjustable lumbar support, breathable mesh back.', seller: 'WorkWell' },
  { id: 'p7', name: 'Non-stick Cookware Set', category: 'Home', priceINR: 3499, rating: 3.9, reviews: 233, discount: 18, image: 'https://picsum.photos/seed/cookware/600/600', description: '5-piece induction-friendly cookware set.', seller: 'KitchenPro' },
  { id: 'p8', name: 'Yoga Mat 6mm', category: 'Sports', priceINR: 899, rating: 4.4, reviews: 611, discount: 12, image: 'https://picsum.photos/seed/yogamat/600/600', description: 'Anti-slip TPE mat with carry strap.', seller: 'FitStep' },
  { id: 'p9', name: 'Novel: The Silent Patient', category: 'Books', priceINR: 349, rating: 4.8, reviews: 4210, discount: 22, image: 'https://picsum.photos/seed/book/600/600', description: 'A gripping psychological thriller.', seller: 'BookNest' },
  { id: 'p10', name: 'Programming in Python', category: 'Books', priceINR: 599, rating: 4.5, reviews: 890, discount: 15, image: 'https://picsum.photos/seed/pythonbook/600/600', description: 'Comprehensive guide from beginner to advanced.', seller: 'BookNest' },
  { id: 'p11', name: 'Smart LED Bulb', category: 'Electronics', priceINR: 449, rating: 3.6, reviews: 421, discount: 10, image: 'https://picsum.photos/seed/bulb/600/600', description: 'Wi-Fi enabled, 16M colors, voice control.', seller: 'SmartHome' },
  { id: 'p12', name: 'Leather Wallet', category: 'Fashion', priceINR: 1199, rating: 4.0, reviews: 267, discount: 20, image: 'https://picsum.photos/seed/wallet/600/600', description: 'Genuine leather with RFID blocking.', seller: 'UrbanWear' },
  { id: 'p13', name: 'Gaming Mouse RGB', category: 'Electronics', priceINR: 1299, rating: 4.6, reviews: 733, discount: 15, image: 'https://picsum.photos/seed/mouse/600/600', description: '16000 DPI sensor with customizable RGB.', seller: 'GameZone' },
  { id: 'p14', name: 'Backpack 30L', category: 'Fashion', priceINR: 1499, rating: 4.3, reviews: 512, discount: 25, image: 'https://picsum.photos/seed/backpack/600/600', description: 'Water-resistant with laptop compartment.', seller: 'TravelMate' },
  { id: 'p15', name: 'Coffee Maker', category: 'Home', priceINR: 4299, rating: 4.1, reviews: 178, discount: 12, image: 'https://picsum.photos/seed/coffee/600/600', description: 'Programmable 12-cup drip coffee maker.', seller: 'KitchenPro' },
  { id: 'p16', name: 'Fitness Smartwatch', category: 'Electronics', priceINR: 3999, rating: 4.4, reviews: 1120, discount: 30, image: 'https://picsum.photos/seed/watch/600/600', description: 'Heart rate, SpO2, 7-day battery.', seller: 'FitStep' }
];

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
}, { timestamps: true });

userSchema.methods.toJSON = function toJSON() {
  const obj = this.toObject();
  delete obj.passwordHash;
  return obj;
};

const User = mongoose.model('User', userSchema);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'ShopEZ backend is running' });
});

app.get('/api/products', (_req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((item) => item.id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide a name, email, and password.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: 'A user with that email already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email: email.toLowerCase(), passwordHash });
    const token = jwt.sign({ sub: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ token, user: user.toJSON() });
  } catch (error) {
    res.status(500).json({ message: 'Unable to create account.', error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide an email and password.' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign({ sub: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: user.toJSON() });
  } catch (error) {
    res.status(500).json({ message: 'Unable to sign in.', error: error.message });
  }
});

app.get('/api/auth/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!token) {
      return res.status(401).json({ message: 'No token provided.' });
    }

    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.sub);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ user: user.toJSON() });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
});

async function connectDatabase() {
  if (mongoose.connection.readyState === 1) return;

  let mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    const memoryServer = await MongoMemoryServer.create();
    mongoUri = memoryServer.getUri();
    global.__mongoMemoryServer = memoryServer;
  }

  await mongoose.connect(mongoUri, { dbName: process.env.MONGO_DB_NAME || 'shopez' });
}

async function startServer(port = PORT) {
  await connectDatabase();
  return app.listen(port, () => {
    console.log(`ShopEZ backend listening on http://localhost:${port}`);
  });
}

if (require.main === module) {
  startServer().catch((error) => {
    console.error('Failed to start ShopEZ backend', error);
    process.exit(1);
  });
}

module.exports = { app, startServer, connectDatabase, User };
