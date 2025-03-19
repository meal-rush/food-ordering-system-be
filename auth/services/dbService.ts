import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export async function connectToDatabase() {
  const dbUri = process.env.DB_URI;
  if (!dbUri) {
    throw new Error('Database URI is not defined in the environment variables');
  }

  try {
    await mongoose.connect(dbUri); // Simplified connection
    console.log('Connected to the database successfully');
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1); // Exit the process if the database connection fails
  }
}
