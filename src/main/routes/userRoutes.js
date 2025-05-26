// src/main/routes/userRoutes.js

const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// User Registration
router.post('/register', userController.register);

// User Login
router.post('/login', userController.login);

// Get User Profile
router.get('/profile', authMiddleware, userController.getProfile);

// Update User Profile
router.put('/profile', authMiddleware, userController.updateProfile);

// Delete User Account
router.delete('/profile', authMiddleware, userController.deleteAccount);

module.exports = router;
