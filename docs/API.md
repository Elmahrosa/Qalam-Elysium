# Qalam-Elysium API Documentation

## Introduction

The Qalam-Elysium API provides a set of endpoints for interacting with the application. This document outlines the available endpoints, their methods, request parameters, and response formats.

## Base URL

```
http://api.qalam-elysium.com/v1
```

## Authentication

All endpoints require authentication via JSON Web Tokens (JWT). Include the token in the `Authorization` header as follows:

```
Authorization: Bearer <your_token>
```

## Endpoints

### 1. User Registration

- **Endpoint**: `/api/users/register`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "username": "string",
    "password": "string",
    "email": "string"
  }
  ```
- **Response**:
  - **201 Created**:
    ```json
    {
      "message": "User  registered successfully."
    }
    ```
  - **400 Bad Request**:
    ```json
    {
      "error": "User  already exists."
    }
    ```

### 2. User Login

- **Endpoint**: `/api/users/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "token": "your_jwt_token"
    }
    ```
  - **401 Unauthorized**:
    ```json
    {
      "error": "Invalid credentials."
    }
    ```

### 3. Get User Profile

- **Endpoint**: `/api/users/profile`
- **Method**: `GET`
- **Headers**:
  - `Authorization: Bearer <your_token>`
- **Response**:
  - **200 OK**:
    ```json
    {
      "username": "string",
      "email": "string",
      "createdAt": "date"
    }
    ```
  - **401 Unauthorized**:
    ```json
    {
      "error": "Unauthorized access."
    }
    ```

### 4. Update User Profile

- **Endpoint**: `/api/users/profile`
- **Method**: `PUT`
- **Headers**:
  - `Authorization: Bearer <your_token>`
- **Request Body**:
  ```json
  {
    "email": "string"  // Optional
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "message": "Profile updated successfully."
    }
    ```
  - **401 Unauthorized**:
    ```json
    {
      "error": "Unauthorized access."
    }
    ```

### 5. Delete User Account

- **Endpoint**: `/api/users/profile`
- **Method**: `DELETE`
- **Headers**:
  - `Authorization: Bearer <your_token>`
- **Response**:
  - **204 No Content**: (No response body)
  - **401 Unauthorized**:
    ```json
    {
      "error": "Unauthorized access."
    }
    ```

## Error Handling

All error responses will include an `error` field with a descriptive message. The following HTTP status codes are used:

- **400 Bad Request**: Invalid request parameters.
- **401 Unauthorized**: Authentication failed or token is missing/invalid.
- **404 Not Found**: Requested resource does not exist.
- **500 Internal Server Error**: An unexpected error occurred on the server.

## Conclusion

This API documentation provides a comprehensive overview of the available endpoints in the Qalam-Elysium application. For further details or updates, please refer to the [Architecture Document](architecture.md) and the [User  Guide](user_guide.md).
