import express, { Request, Response, NextFunction } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';
import logger from './utils/logger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9001;

// Middleware for logging requests
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Proxy configuration
const services = {
  '/api/orders': 'http://localhost:9002', // Order service
  '/api/notifications': 'http://localhost:3004', // Notification service
  '/api/payments': 'http://localhost:9003', // Payment service
};

// Set up proxy routes
Object.entries(services).forEach(([route, target]) => {
  app.use(
    route,
    createProxyMiddleware({
      target,
      changeOrigin: true,
      pathRewrite: (path) => path.replace(route, ''), // Remove the base route
      onProxyReq: (proxyReq, req: Request) => {
        logger.info(`Proxying request to: ${target}${req.url}`);
      },
    })
  );
});

// Start the API gateway
app.listen(PORT, () => {
  logger.info(`API Gateway running on http://localhost:${PORT}`);
});
