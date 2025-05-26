#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Define the project directory
PROJECT_DIR=$(dirname "$(realpath "$0")")

# Change to the project directory
cd "$PROJECT_DIR"

# Print a message indicating the start of the deployment process
echo "Starting the deployment process for Qalam-Elysium..."

# Build the project
echo "Building the project..."
./src/scripts/build.sh

# Define the environment (default to production)
ENVIRONMENT=${1:-production}

# Print the environment being used
echo "Deploying to the $ENVIRONMENT environment..."

# Stop the currently running application (if applicable)
if [ "$ENVIRONMENT" == "production" ]; then
    echo "Stopping the currently running application..."
    # Replace with your process manager command (e.g., PM2, Docker, etc.)
    pm2 stop qalam-elysium || true
fi

# Start the application
echo "Starting the application..."
# Replace with your process manager command (e.g., PM2, Docker, etc.)
pm2 start src/main/app.js --name qalam-elysium --env $ENVIRONMENT

# Print a message indicating the successful completion of the deployment process
echo "Deployment completed successfully!"

# Optionally, you can add additional steps here, such as:
# - Running database migrations
# - Clearing caches
# - Notifying team members

# Print a message indicating the end of the script
echo "Your application is now live!"
