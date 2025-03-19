import WebSocket, { WebSocketServer } from 'ws';
import { registerUser, loginUser, authenticate } from './services/authService';
import { connectToDatabase } from './services/dbService';
import { Role } from './models/roles';
import logger from './utils/logger';

// Connect to the database
connectToDatabase();

const wss = new WebSocketServer({ port: 9001 });

wss.on('connection', (ws: WebSocket) => {
  logger.info('New WebSocket connection established');
  ws.on('message', async (message: string) => {
    try {
      const { route, data }: { route: string; data: any } = JSON.parse(message);
      logger.info(`Received message on route: ${route}`);

      if (route === '/api/v1/register') {
        await registerUser(data);
        ws.send(JSON.stringify({ message: 'User registered successfully' }));
      } else if (route === '/api/v1/login') {
        const token = await loginUser(data);
        ws.send(JSON.stringify({ token }));
      } else if (route === '/api/v1/protected') {
        authenticate([Role.Customer, Role.RestaurantAdmin])(
          { send: ws.send.bind(ws) } as any,
          { headers: { authorization: data.token } } as any,
          () => ws.send(JSON.stringify({ message: 'Access granted to protected route' }))
        );
      } else {
        ws.send(JSON.stringify({ error: 'Unknown route' }));
      }
    } catch (err) {
      if (err instanceof Error) {
        logger.error(`Error processing message: ${err.message}`);
        ws.send(JSON.stringify({ error: err.message }));
      } else {
        logger.error('An unknown error occurred');
        ws.send(JSON.stringify({ error: 'An unknown error occurred' }));
      }
    }
  });
});

logger.info('Auth microservice running on port 9001');
