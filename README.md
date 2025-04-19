# Food Ordering System Backend

This repository contains the backend services for the **Meal Rush** food ordering platform. The system is built using a microservices architecture, with each service handling a specific domain of the application.

## Setting Up Each Microservice

Follow the steps below to set up each service.



### Microservices Overview
- **Cart Service**: Manages the user's shopping cart, including adding, removing, and updating items.
- **Order Service**: Handles order placement, tracking, and history.
- **Payment Service**: Processes payments and manages payment-related information.
- **User Service**: Manages user authentication, profiles, and account settings.
- **Restaurant Service**: Handles restaurant data, including menus and availability.
- **Notification Service**: Sends notifications to users about order updates, promotions, etc.

### Prerequisites
- **Node.js** (v16 or later)
- **Docker** (for containerized deployment)
- **Kubernetes** (optional, for orchestration)
- **A package manager** like `npm` or `yarn`

---

###  Example Set up ( Cart Service )
**Path**: `cart-service`  
**Setup**:
```bash
cd cart-service
npm install
npm start

```

### Note
When setting up the backend locally, ensure that all microservices (e.g., Cart Service, Order Service, Payment Service, etc.) are running simultaneously. Each service is interdependent and required for the backend to operate as intended.