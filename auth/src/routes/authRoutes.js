const express = require("express");
const AuthController = require("../controllers/authController");
const AuthService = require("../services/authService");
const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const authService = new AuthService(UserModel, jwt, bcrypt);
const authController = new AuthController(authService);

const router = express.Router();

router.post("/register", (req, res) => authController.register(req, res));
router.post("/login", (req, res) => authController.login(req, res));
router.post("/logout", (req, res) => authController.logout(req, res));

module.exports = router;
