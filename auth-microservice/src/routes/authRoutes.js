const express = require('express');
const AuthController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
const authController = new AuthController();

// User registration route
router.post('/register', authController.register);

// User login route
router.post('/login', authController.login);

// User logout route
router.post('/logout', authMiddleware.verifyToken, authController.logout);

module.exports = router;