import mysql from 'mysql2/promise';

// Database configuration
const dbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'Learnable',
  port: 13306
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Helper function to get a connection from the pool
export async function getConnection() {
  try {
    const connection = await pool.getConnection();
    return connection;
  } catch (error) {
    console.error('Error getting database connection:', error);
    throw error;
  }
}

// Example query function
export async function query<T>(sql: string, params?: any[]): Promise<T> {
  const connection = await getConnection();
  try {
    const [results] = await connection.query(sql, params);
    return results as T;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  } finally {
    connection.release();
  }
}

// Test the database connection
export async function testConnection() {
  try {
    const connection = await getConnection();
    console.log('Database connection successful!');
    connection.release();
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
} 