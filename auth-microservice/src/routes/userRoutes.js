const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();
const userController = new UserController();

// Route to get user details
router.get('/:id', userController.getUserDetails);

// Route to update user information
router.put('/:id', userController.updateUserInformation);

module.exports = router;