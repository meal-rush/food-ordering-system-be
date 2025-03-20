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

## How to Run
1. Install dependencies: `npm install`
2. Create a `.env` file in the `notification-service` directory with the following content:
   ```
   PORT=3004
   ```
3. Start the server: `npm start`
4. The service will run on the port specified in the `.env` file (default is `3004`).
