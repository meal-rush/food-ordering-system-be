const express = require("express");
const UserController = require("../controllers/userController");
const UserService = require("../services/authService");
const UserModel = require("../models/userModel");

const userService = new UserService(UserModel);
const userController = new UserController(userService);

const router = express.Router();

router.get("/:id", (req, res) => userController.getUserDetails(req, res));
router.put("/:id", (req, res) => userController.updateUser(req, res));

module.exports = router;
