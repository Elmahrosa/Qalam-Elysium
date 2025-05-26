#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Print a message indicating the start of the setup process
echo "Setting up the development environment for Qalam-Elysium..."

# Define the project directory
PROJECT_DIR=$(dirname "$(realpath "$0")")

# Change to the project directory
cd "$PROJECT_DIR"

# Install Node.js and npm if not already installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Installing Node.js..."
    # Install Node.js (adjust the version as needed)
    curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    echo "Node.js is already installed."
fi

# Install MongoDB if not already installed
if ! command -v mongo &> /dev/null; then
    echo "MongoDB is not installed. Installing MongoDB..."
    # Install MongoDB (adjust the version as needed)
    wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/multiverse amd64 mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
    sudo apt-get update
    sudo apt-get install -y mongodb-org
else
    echo "MongoDB is already installed."
fi

# Install project dependencies
echo "Installing project dependencies..."
npm install

# Create a .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cat <<EOL > .env
# Environment variables for Qalam-Elysium
PORT=3000
MONGODB_URI=mongodb://localhost:27017/qalam_elysium
JWT_SECRET=your_jwt_secret
EOL
    echo ".env file created. Please update the values as needed."
else
    echo ".env file already exists."
fi

# Start MongoDB service
echo "Starting MongoDB service..."
sudo systemctl start mongod

# Print a message indicating the successful completion of the setup process
echo "Development environment setup completed successfully!"

# Optionally, you can add additional steps here, such as:
# - Running database migrations
# - Setting up a frontend framework
# - Installing additional tools or libraries

# Print a message indicating the end of the script
echo "You can now start developing with Qalam-Elysium!"
