// src/main/services/userService.js

const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// Register a new user
exports.registerUser  = async (username, password, email) => {
    const existingUser  = await User.findOne({ username });
    if (existingUser ) {
        throw new Error('User  already exists.');
    }

    const newUser  = new User({ username, password, email });
    await newUser .save();
    return newUser ;
};

// Login a user
exports.loginUser  = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('Invalid credentials.');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new Error('Invalid credentials.');
    }

    return user; // Return the user object for further processing (e.g., token generation)
};

// Get user profile
exports.getUser Profile = async (userId) => {
    const user = await User.findById(userId).select('-password'); // Exclude password
    if (!user) {
        throw new Error('User  not found.');
    }
    return user;
};

// Update user profile
exports.updateUser Profile = async (userId, email) => {
    const updatedUser  = await User.findByIdAndUpdate(
        userId,
        { email },
        { new: true, runValidators: true }
    );

    if (!updatedUser ) {
        throw new Error('User  not found.');
    }
    return updatedUser ;
};

// Delete user account
exports.deleteUser Account = async (userId) => {
    const deletedUser  = await User.findByIdAndDelete(userId);
    if (!deletedUser ) {
        throw new Error('User  not found.');
    }
    return deletedUser ;
};
