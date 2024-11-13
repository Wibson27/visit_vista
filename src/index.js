import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { query } from './config/database.js';
import dotenv from 'dotenv';

// Initialize dotenv
dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.static('public'));

// Places API endpoint
app.get('/api/places', async (req, res) => {
  try {
      console.log('Starting places fetch...');
      console.log('Database config:', {
          host: process.env.DB_HOST,
          database: process.env.DB_NAME,
          port: process.env.DB_PORT,
          user: process.env.DB_USER,
          // Don't log password
      });

      const result = await query(
          `SELECT id, name, description, images, price
           FROM places
           ORDER BY created_at DESC`,
          []
      );

      console.log(`Successfully fetched ${result.rows.length} places`);
      res.json(result.rows);
  } catch (error) {
      console.error('Detailed error in /api/places:', error);
      res.status(500).json({
          error: 'Failed to fetch places',
          details: error.message,
          // In production, you might want to remove error details
      });
  }
});

// Serve static files
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});