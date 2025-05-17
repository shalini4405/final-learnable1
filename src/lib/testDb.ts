import { testConnection } from './db';

async function runTest() {
  try {
    await testConnection();
  } catch (error) {
    console.error('Failed to connect to database:', error);
  }
}

runTest(); 