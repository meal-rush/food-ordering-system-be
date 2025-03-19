import WebSocket, { WebSocketServer } from 'ws';
import { registerUser, loginUser, authenticate } from './services/authService';
import { connectToDatabase } from './services/dbService';
import { Role } from './models/roles';

// Connect to the database
connectToDatabase();

const wss = new WebSocketServer({ port: 9001 });

wss.on('connection', (ws: WebSocket) => {
  ws.on('message', async (message: string) => {
    try {
      const { route, data }: { route: string; data: any } = JSON.parse(message);

      if (route === '/register') {
        await registerUser(data);
        ws.send(JSON.stringify({ message: 'User registered successfully' }));
      } else if (route === '/login') {
        const token = await loginUser(data);
        ws.send(JSON.stringify({ token }));
      } else if (route === '/protected') {
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
        ws.send(JSON.stringify({ error: err.message }));
      } else {
        ws.send(JSON.stringify({ error: 'An unknown error occurred' }));
      }
    }
  });
});

console.log('Auth microservice running on port 9001');
