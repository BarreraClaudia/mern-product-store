import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

import { connectDB } from './config/database.js';

import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

const __dirname = path.resolve();

app.use(express.json()); // parses incoming requests with JSON payloads.. allows us to accept JSON data in the req.body

app.use('/api/products', productRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log(`Listening on port: ${PORT}`);
});
