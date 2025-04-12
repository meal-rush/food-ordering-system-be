import { WebSocket, WebSocketServer } from 'ws';

export const broadcastMessage = (wss: WebSocketServer, message: string) => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
};
