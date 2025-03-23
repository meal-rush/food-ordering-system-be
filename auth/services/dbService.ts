import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../utils/logger';

dotenv.config();

export async function connectToDatabase() {
  const dbUri = process.env.DB_URI;
  if (!dbUri) {
    logger.error('Database URI is not defined in the environment variables');
    throw new Error('Database URI is not defined in the environment variables');
  }

  try {
    await mongoose.connect(dbUri); // Simplified connection
    logger.info('Connected to the database successfully');
  } catch (error) {
    logger.error(`Failed to connect to the database: ${error}`);
    process.exit(1); // Exit the process if the database connection fails
  }
}
