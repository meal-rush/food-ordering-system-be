# Auth Microservice

This project is an authentication microservice built with Node.js. It provides user authentication and role-based access control for a food delivery application. The microservice supports three user roles: Customer, Restaurant Admin, and Delivery Personnel.

## Features

- User registration and login
- Role-based access control
- JWT authentication
- User management for different roles

## Project Structure

```
auth-microservice
├── src
│   ├── controllers         # Contains controllers for handling requests
│   │   ├── authController.js
│   │   └── userController.js
│   ├── models              # Contains data models
│   │   └── userModel.js
│   ├── routes              # Contains route definitions
│   │   ├── authRoutes.js
│   │   └── userRoutes.js
│   ├── middlewares         # Contains middleware for authentication
│   │   └── authMiddleware.js
│   ├── services            # Contains business logic
│   │   └── authService.js
│   └── app.js             # Entry point of the application
├── config                  # Configuration files
│   └── dbConfig.js
├── package.json            # NPM package configuration
├── .env                    # Environment variables
└── README.md               # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd auth-microservice
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your environment variables, such as database connection strings and JWT secret keys.

## Usage

To start the application, run the following command:

```
npm start
```

The application will be running on `http://localhost:3000` by default.

## API Endpoints

- **Authentication**
  - `POST /api/auth/register` - Register a new user
  - `POST /api/auth/login` - Log in a user
  - `POST /api/auth/logout` - Log out a user

- **User Management**
  - `GET /api/users/:id` - Get user details
  - `PUT /api/users/:id` - Update user information

## Roles

- **Customer**: Can browse, order food, and track deliveries.
- **Restaurant Admin**: Can manage menus, accept orders, and handle payments.
- **Delivery Personnel**: Can accept and fulfill deliveries.

## License

This project is licensed under the MIT License.