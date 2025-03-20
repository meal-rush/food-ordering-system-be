# Notification Service

This is a basic notification microservice for the food ordering system.

## Features
- Send notifications (e.g., email, SMS) via a simple API.

## API Endpoints

### POST /send-notification
Send a notification.

#### Request Body
```json
{
  "type": "email", // or "sms"
  "recipient": "recipient@example.com",
  "message": "Your order has been placed successfully!"
}
```

#### Response
```json
{
  "success": true,
  "message": "Notification sent successfully"
}
```

### POST /send-payment-notification
Send a payment notification.

#### Request Body
```json
{
  "recipient": "recipient@example.com",
  "paymentId": "98765",
  "status": "successful" // or "failed", "pending", etc.
}
```

#### Response
```json
{
  "success": true,
  "message": "Payment notification sent successfully"
}
```

### POST /trigger-create-order-notification
Trigger a notification for creating an order.

#### Request Body
```json
{
  "recipient": "recipient@example.com",
  "orderId": "12345",
  "items": ["Pizza", "Burger", "Soda"]
}
```

#### Response
```json
{
  "success": true,
  "message": "Create order notification sent successfully"
}
```

### POST /orders/status-update
Trigger a notification for an order status update.

#### Request Body
```json
{
  "recipient": "recipient@example.com",
  "orderId": "12345",
  "status": "confirmed", // or "prepared", "out for delivery", "delivered"
  "notificationType": "email", // or "sms", "push"
  "subscription": { /* Push subscription object, required if notificationType is "push" */ }
}
```

#### Response
```json
{
  "success": true,
  "message": "Order status notification sent successfully"
}
```

### POST /webhooks/order-status
Webhook endpoint to listen for order status changes and send notifications.

#### Request Body
```json
{
  "recipient": "recipient@example.com",
  "orderId": "12345",
  "status": "confirmed", // or "prepared", "out for delivery", "delivered"
  "notificationType": "email", // or "sms", "push"
  "subscription": { /* Push subscription object, required if notificationType is "push" */ }
}
```

#### Response
```json
{
  "success": true,
  "message": "Order status notification sent successfully"
}

### GET /users/:userId/preferences
Retrieve a user's notification preferences.

#### Response
```json
{
  "success": true,
  "preferences": {
    "email": true,
    "sms": false,
    "push": true
  }
}
```

### PUT /users/:userId/preferences
Update a user's notification preferences.

#### Request Body
```json
{
  "email": true, // Optional
  "sms": false,  // Optional
  "push": true   // Optional
}
```

#### Response
```json
{
  "success": true,
  "preferences": {
    "email": true,
    "sms": false,
    "push": true
  }
}
```

## How to Run
1. Install dependencies: `npm install`
2. Create a `.env` file in the `notification-service` directory with the following content:
   ```
   PORT=3004
   ```
3. Start the server: `npm start`
4. The service will run on the port specified in the `.env` file (default is `3004`).
