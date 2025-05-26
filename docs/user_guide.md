# Qalam-Elysium User Guide

## Introduction

Welcome to the Qalam-Elysium User Guide! This document will help you set up and use the application effectively. Qalam-Elysium is designed to provide a seamless experience for users, with features that enhance productivity and collaboration.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Features](#features)
5. [Troubleshooting](#troubleshooting)
6. [Support](#support)

## Getting Started

To get started with Qalam-Elysium, you will need to have the following prerequisites:

- Node.js (version 14 or higher)
- npm (Node Package Manager)
- A MongoDB database (local or cloud-based)

## Installation

Follow these steps to install and set up the Qalam-Elysium application:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Elmahrosa/qalam-elysium.git
   cd qalam-elysium
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add the following variables:
   ```plaintext
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/qalam_db
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the Application**:
   ```bash
   npm start
   ```

   The application will be running at `http://localhost:3000`.

## Usage

### User Registration

1. Navigate to the registration page.
2. Fill in the required fields: username, password, and email.
3. Click on the "Register" button.
4. You will receive a confirmation message upon successful registration.

### User Login

1. Navigate to the login page.
2. Enter your username and password.
3. Click on the "Login" button.
4. Upon successful login, you will be redirected to your profile page.

### Accessing User Profile

- After logging in, you can view your profile by clicking on the "Profile" link in the navigation menu.
- Here, you can see your user information and update your email if needed.

### Updating User Profile

1. Go to your profile page.
2. Update the email field as necessary.
3. Click on the "Update Profile" button.
4. You will receive a confirmation message upon successful update.

### Deleting User Account

- To delete your account, navigate to your profile page and click on the "Delete Account" button.
- Confirm the action when prompted. Your account will be permanently deleted.

## Features

- **User  Authentication**: Secure login and registration with JWT.
- **Profile Management**: Easily update and manage your user profile.
- **Responsive Design**: Access the application on various devices with a user-friendly interface.

## Troubleshooting

- **Issue**: Unable to log in.
  - **Solution**: Ensure that you are using the correct username and password. If you forgot your password, use the password recovery option.

- **Issue**: Application not starting.
  - **Solution**: Check if all environment variables are set correctly in the `.env` file. Ensure that MongoDB is running.

## Support

If you encounter any issues or have questions, please reach out to our support team:

- **Email**: support@qalam-elysium.com
- **GitHub Issues**: [Report an issue](https://github.com/yourusername/qalam-elysium/issues)

## Conclusion

Thank you for using Qalam-Elysium! We hope this guide helps you navigate and utilize the application effectively. For further information, please refer to the [API Documentation](API.md) and [Architecture Overview](architecture.md).
