import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { connectDB } from './db/db';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 9002; // Use PORT from .env or default to 9002

// Middleware
app.use(express.json());

// Connect to the database
connectDB();

// Create an HTTP server
const server = createServer(app);

// Set up WebSocket server
const wss = new WebSocketServer({ server });

wss.on('connection', (ws: WebSocket) => {
    console.log('New WebSocket connection established');

    // Handle incoming messages
    ws.on('message', (message: string) => {
        console.log(`Received message: ${message}`);
        ws.send(`Echo: ${message}`); // Echo the message back to the client
    });

    // Handle connection close
    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});