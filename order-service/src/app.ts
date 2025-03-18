import express from 'express';
import { connectDB } from './db/db';
import { setOrderRoutes } from './routes/orderRoutes';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Connect to the database
connectDB();

// Set up routes
setOrderRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});