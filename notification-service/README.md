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

## How to Run
1. Install dependencies: `npm install`
2. Start the server: `npm start`
3. The service will run on `http://localhost:3001`.
