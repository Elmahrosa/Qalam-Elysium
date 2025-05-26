// src/main/utils/logger.js

const fs = require('fs');
const path = require('path');
const winston = require('winston');

// Create a logs directory if it doesn't exist
const logDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

// Create a Winston logger instance
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info', // Default log level
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        // Console transport
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
        // File transport
        new winston.transports.File({
            filename: path.join(logDir, 'app.log'),
            level: 'info',
        }),
        // Error file transport
        new winston.transports.File({
            filename: path.join(logDir, 'error.log'),
            level: 'error',
        }),
    ],
});

// Log a message
const logMessage = (level, message) => {
    logger.log({ level, message });
};

// Export the logger and logMessage function
module.exports = {
    logger,
    logMessage,
};
