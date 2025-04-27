# Driver Management API Documentation

## 1. Delivery Assignment and Management

### 1.1 Get Available Deliveries
- **Endpoint:** GET `/api/deliveries/all`
- **Description:** Retrieve all deliveries that need drivers
- **Response:**
```json
[
  {
    "_id": "delivery_id",
    "orderId": "123456789",
    "customerName": "John Doe",
    "customerPhone": "1234567890",
    "status": "SEARCHING_DRIVER",
    "locationUpdates": [
      {
        "timestamp": "2023-01-01T12:00:00Z",
        "location": "Restaurant",
        "status": "Order Created"
      }
    ]
  }
]
```

### 1.2 Accept Delivery Assignment
- **Endpoint:** PUT `/api/deliveries/:id/assign-driver`
- **Description:** Driver accepts a delivery assignment
- **Request Body:**
```json
{
  "driverId": "driver_id"
}
```
- **Response:**
```json
{
  "_id": "delivery_id",
  "driver": "driver_id",
  "driverName": "Driver Name",
  "driverPhone": "1234567890",
  "status": "DRIVER_ASSIGNED",
  "locationUpdates": [
    {
      "timestamp": "2023-01-01T12:00:00Z",
      "location": "Restaurant",
      "status": "Driver Assigned"
    }
  ]
}
```

### 1.3 Update Delivery Location
- **Endpoint:** PUT `/api/deliveries/:id/update-location`
- **Description:** Update delivery status and location
- **Request Body:**
```json
{
  "location": "Current Location",
  "status": "ON_THE_WAY"
}
```
- **Response:**
```json
{
  "_id": "delivery_id",
  "status": "ON_THE_WAY",
  "locationUpdates": [
    {
      "timestamp": "2023-01-01T12:05:00Z",
      "location": "Current Location",
      "status": "ON_THE_WAY"
    }
  ]
}
```

### 1.4 Get Specific Delivery Details
- **Endpoint:** GET `/api/deliveries/get/:id`
- **Description:** Get details of a specific delivery
- **Response:**
```json
{
  "_id": "delivery_id",
  "orderId": "123456789",
  "customerName": "John Doe",
  "customerPhone": "1234567890",
  "customerEmail": "john@example.com",
  "deliveryServiceName": "MealRush Delivery",
  "status": "ON_THE_WAY",
  "driver": "driver_id",
  "driverName": "Driver Name",
  "locationUpdates": []
}
```

## 2. Implementation Guide

### 2.1 Driver Dashboard Flow

1. **Login Process**
   - Driver logs in to the system
   - Store authentication token for subsequent requests

2. **View Available Deliveries**
   ```javascript
   const getAvailableDeliveries = async () => {
     try {
       const response = await axios.get('/api/deliveries/all');
       const availableDeliveries = response.data.filter(
         delivery => delivery.status === 'SEARCHING_DRIVER'
       );
       return availableDeliveries;
     } catch (error) {
       console.error('Error fetching deliveries:', error);
     }
   };
   ```

3. **Accept Delivery**
   ```javascript
   const acceptDelivery = async (deliveryId, driverId) => {
     try {
       const response = await axios.put(
         `/api/deliveries/${deliveryId}/assign-driver`,
         { driverId }
       );
       return response.data;
     } catch (error) {
       console.error('Error accepting delivery:', error);
     }
   };
   ```

4. **Update Delivery Status**
   ```javascript
   const updateDeliveryStatus = async (deliveryId, location, status) => {
     try {
       const response = await axios.put(
         `/api/deliveries/${deliveryId}/update-location`,
         { location, status }
       );
       return response.data;
     } catch (error) {
       console.error('Error updating status:', error);
     }
   };
   ```

### 2.2 Status Flow Management

1. **Status Progression**
   ```javascript
   const DELIVERY_STATUSES = {
     ORDER_CREATED: "Order Created",
     PREPARING: "Preparing Order",
     READY_TO_PICKUP: "Ready to Pickup",
     SEARCHING_DRIVER: "Searching for Driver",
     DRIVER_ASSIGNED: "Driver Assigned",
     WAITING_PICKUP: "Waiting for Driver Pickup",
     ON_THE_WAY: "On the Way",
     ARRIVED: "Arrived",
     COMPLETED: "Completed"
   };
   ```

2. **Status Update Flow**
   - Driver Assigned → Waiting for Pickup
   - Waiting for Pickup → On the Way
   - On the Way → Arrived
   - Arrived → Completed

### 2.3 Location Updates

1. **Regular Location Updates**
   ```javascript
   const startLocationUpdates = (deliveryId) => {
     return setInterval(async () => {
       // Get current location
       navigator.geolocation.getCurrentPosition(async (position) => {
         const location = `${position.coords.latitude},${position.coords.longitude}`;
         await updateDeliveryStatus(deliveryId, location, 'ON_THE_WAY');
       });
     }, 300000); // Update every 5 minutes
   };
   ```

2. **Manual Status Updates**
   ```javascript
   const updateDeliveryProgress = async (deliveryId, newStatus) => {
     const location = await getCurrentLocation();
     await updateDeliveryStatus(deliveryId, location, newStatus);
   };
   ```

## 3. Error Handling

```javascript
const handleAPIError = (error) => {
  if (error.response) {
    // Server responded with error
    console.error('Server Error:', error.response.data.message);
    return error.response.data.message;
  } else if (error.request) {
    // Request made but no response
    console.error('Network Error');
    return 'Network error occurred';
  } else {
    // Other errors
    console.error('Error:', error.message);
    return 'An error occurred';
  }
};
```

## 4. Best Practices

1. **Authentication**
   - Always include authentication token in requests
   - Handle token expiration and renewal

2. **Real-time Updates**
   - Implement WebSocket connection for real-time status updates
   - Handle offline scenarios gracefully

3. **Location Services**
   - Request location permissions at appropriate time
   - Handle cases where location services are disabled

4. **User Experience**
   - Show loading states during API calls
   - Provide clear feedback for all actions
   - Implement error recovery mechanisms
