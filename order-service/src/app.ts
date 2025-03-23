import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/db';
import orderRoutes from './routes/orderRoutes'; // Import order routes

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 9002; // Use PORT from .env or default to 9002

// Middleware
app.use(express.json());

// Connect to the database
connectDB();

// Set up routes
app.use('/api/orders', orderRoutes); // Use order routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});