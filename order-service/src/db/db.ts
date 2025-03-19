import mongoose from 'mongoose';
import dotenv from 'dotenv';

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
        console.log('Database connected successfully');

        // Ensure at least one collection exists
        const db = mongoose.connection;
        const collections = await db.db.listCollections().toArray();
        if (collections.length === 0) {
            console.log('No collections found. Creating a default collection...');
            const defaultCollection = db.collection('defaultCollection');
            await defaultCollection.insertOne({ initialized: true });
            console.log('Default collection created with a sample document.');
        }
    } catch (error) {
        console.error('Database connection failed:', (error as Error).message);
        process.exit(1);
    }
};