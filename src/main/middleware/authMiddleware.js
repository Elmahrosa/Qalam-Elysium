// src/main/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { logMessage } = require('../utils/logger');

// Authentication middleware
const authMiddleware = (req, res, next) => {
    // Get the token from the Authorization header
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        logMessage('warn', 'No token provided.');
        return res.status(401).json({ error: 'No token provided.' });
    }

    // Verify the token
    jwt.verify(token, config.jwt.secret, (err, decoded) => {
        if (err) {
            logMessage('error', 'Failed to authenticate token.');
            return res.status(401).json({ error: 'Failed to authenticate token.' });
        }

        // Save the decoded user ID to the request object for use in other routes
        req.user = { id: decoded.id };
        logMessage('info', `User  authenticated: ${req.user.id}`);
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = authMiddleware;
