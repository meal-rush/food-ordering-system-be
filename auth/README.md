# Auth Service (API Gateway)

This service now acts as an API gateway for the food ordering system, routing requests to the appropriate microservices.

## Proxy Routes

- `/api/orders` → Order Service (`http://localhost:9002`)
- `/api/notifications` → Notification Service (`http://localhost:3004`)
- `/api/payments` → Payment Service (`http://localhost:9003`)

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the API Gateway:**
   ```bash
   npm start
   ```

3. **Usage:**
   - Send requests to `http://localhost:9001/api/orders`, `http://localhost:9001/api/notifications`, or `http://localhost:9001/api/payments`.
   - The gateway will forward the requests to the respective services.
