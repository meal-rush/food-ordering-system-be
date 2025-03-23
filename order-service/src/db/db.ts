import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../utils/logger'; // Import the logger

// Load environment variables from .env file
dotenv.config();

const mongoURI = process.env.MONGO_URI;

export const connectDB = async () => {
    try {
        if (!mongoURI) {
            throw new Error('MONGO_URI is not defined in the .env file');
        }

        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        logger.info('Database connected successfully'); // Log success

        // Ensure at least one collection exists
        const db = mongoose.connection;
        const collections = await db.db.listCollections().toArray();
        if (collections.length === 0) {
            logger.info('No collections found. Creating a default collection...');
            const defaultCollection = db.collection('defaultCollection');
            await defaultCollection.insertOne({ initialized: true });
            logger.info('Default collection created with a sample document.');
        }
    } catch (error) {
        logger.error(`Database connection failed: ${(error as Error).message}`); // Log error
        process.exit(1);
    }
};