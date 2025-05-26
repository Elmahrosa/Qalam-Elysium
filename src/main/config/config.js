// src/main/config/config.js

require('dotenv').config(); // Load environment variables from .env file

const config = {
    // Server settings
    server: {
        port: process.env.PORT || 3000,
        host: process.env.HOST || 'localhost',
    },

    // Database settings
    database: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/qalam_db',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        },
    },

    // JWT settings
    jwt: {
        secret: process.env.JWT_SECRET || 'your_jwt_secret',
        expiresIn: process.env.JWT_EXPIRES_IN || '1h', // Token expiration time
    },

    // Logging settings
    logging: {
        level: process.env.LOG_LEVEL || 'info', // Log level (info, warn, error)
        file: process.env.LOG_FILE || 'logs/app.log', // Log file path
    },

    // API settings
    api: {
        version: process.env.API_VERSION || 'v1',
        baseUrl: process.env.API_BASE_URL || '/api',
    },

    // Feature flags
    features: {
        enableFeatureX: process.env.ENABLE_FEATURE_X === 'true', // Example feature flag
    },
};

module.exports = config;
