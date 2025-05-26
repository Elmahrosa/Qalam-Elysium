#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Define the project directory
PROJECT_DIR=$(dirname "$(dirname "$(realpath "$0")")")

# Change to the project directory
cd "$PROJECT_DIR"

# Print a message indicating the start of the build process
echo "Starting the build process for Qalam-Elysium..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Run tests
echo "Running unit and integration tests..."
npm test

# Build the application (if applicable)
# Uncomment the following line if you have a build step (e.g., for a frontend framework)
# npm run build

# Print a message indicating the successful completion of the build process
echo "Build process completed successfully!"

# Optionally, you can add additional steps here, such as:
# - Linting the code
# - Running database migrations
# - Creating a production-ready build

# Print a message indicating the end of the script
echo "You can now deploy your application."
