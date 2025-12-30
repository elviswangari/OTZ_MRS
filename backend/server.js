import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { rocRoutes } from './routes/rocRoutes.js';
import { hcwRoutes } from './routes/hcwRoutes.js';
import { register, login } from './controllers/AuthController.js';
import { authenticateToken } from './middleware/AuthMiddleware.js';

const app = express();

// ✅ Fail fast if env is missing
if (!process.env.MONGO_URI) {
  throw new Error('❌ MONGO_URI is missing from .env');
}

// ✅ Connect to MongoDB (Node 24 + Mongoose 9 safe)
await mongoose.connect(process.env.MONGO_URI);
console.log('✅ MongoDB connected');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.status(200).json({ message: 'server homepage' });
});

app.post('/register', register);
app.post('/login', login);

app.use('/roc', authenticateToken, rocRoutes);
app.use('/hcw', hcwRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 App running on port: ${PORT}`);
});
