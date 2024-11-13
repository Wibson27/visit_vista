import pkg from 'pg';
import dotenv from 'dotenv';
const { Pool } = pkg;

// Load environment variables
dotenv.config();

// Debug: Log the config being used (exclude password)
console.log('Database Configuration:', {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// Verify password is a string
if (typeof process.env.DB_PASSWORD !== 'string') {
  console.error('DB_PASSWORD is not a string:', typeof process.env.DB_PASSWORD);
  process.exit(1);
}

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD.toString(), // Ensure it's a string
  port: parseInt(process.env.DB_PORT),
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Test the connection
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
});

// Secure query wrapper with better error logging
export const query = async (text, params) => {
  const client = await pool.connect();
  try {
      console.log('Executing query:', text);
      console.log('Query parameters:', params);
      const result = await client.query(text, params);
      console.log('Query result:', result.rows);
      return result;
  } catch (error) {
      console.error('Detailed Database Error:', {
          error: error.message,
          detail: error.detail,
          table: error.table,
          constraint: error.constraint
      });
      throw error;
  } finally {
      client.release();
  }
};

// Test connection
const testConnection = async () => {
  try {
      const result = await query('SELECT NOW()');
      console.log('✅ Database connected successfully!');
  } catch (error) {
      console.error('❌ Database connection failed:', error.message);
      // Don't exit process, let the application handle the error
  }
};

testConnection();

export default pool;