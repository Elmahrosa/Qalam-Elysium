// src/main/controllers/userController.js

const User = require('../models/userModel');
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// User Registration
exports.register = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const existingUser  = await User.findOne({ username });
        if (existingUser ) {
            return res.status(400).json({ error: 'User  already exists.' });
        }

        const newUser  = new User({ username, password, email });
        await newUser .save();

        res.status(201).json({ message: 'User  registered successfully.' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

// User Login
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user || !(await userService.comparePassword(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        const token = jwt.sign({ id: user._id }, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

// Get User Profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password from response
        if (!user) {
            return res.status(404).json({ error: 'User  not found.' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

// Update User Profile
exports.updateProfile = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findByIdAndUpdate(req.user.id, { email }, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({ error: 'User  not found.' });
        }

        res.status(200).json({ message: 'Profile updated successfully.' });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

// Delete User Account
exports.deleteAccount = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User  not found.' });
        }

        res.status(204).send(); // No content response
    } catch (error) {
        console.error('Delete account error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};
