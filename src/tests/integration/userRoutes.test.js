// src/tests/integration/userRoutes.test.js

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../main/app'); // Import your Express app
const User = require('../../main/models/userModel');

describe('User  Routes', () => {
    beforeAll(async () => {
        // Connect to the test database
        await mongoose.connect('mongodb://localhost:27017/qalam_test', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        // Clean up the database and close the connection
        await User.deleteMany({});
        await mongoose.connection.close();
    });

    describe('POST /api/users/register', () => {
        it('should register a new user successfully', async () => {
            const response = await request(app)
                .post('/api/users/register')
                .send({
                    username: 'testuser',
                    password: 'password123',
                    email: 'test@example.com',
                });

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('User  registered successfully.');
        });

        it('should return an error if the user already exists', async () => {
            await request(app)
                .post('/api/users/register')
                .send({
                    username: 'testuser',
                    password: 'password123',
                    email: 'test@example.com',
                });

            const response = await request(app)
                .post('/api/users/register')
                .send({
                    username: 'testuser',
                    password: 'password123',
                    email: 'test@example.com',
                });

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('User  already exists.');
        });
    });

    describe('POST /api/users/login', () => {
        it('should log in a user successfully', async () => {
            await request(app)
                .post('/api/users/register')
                .send({
                    username: 'testuser',
                    password: 'password123',
                    email: 'test@example.com',
                });

            const response = await request(app)
                .post('/api/users/login')
                .send({
                    username: 'testuser',
                    password: 'password123',
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
        });

        it('should return an error for invalid credentials', async () => {
            const response = await request(app)
                .post('/api/users/login')
                .send({
                    username: 'invaliduser',
                    password: 'wrongpassword',
                });

            expect(response.status).toBe(401);
            expect(response.body.error).toBe('Invalid credentials.');
        });
    });

    describe('GET /api/users/profile', () => {
        it('should retrieve the user profile successfully', async () => {
            const registerResponse = await request(app)
                .post('/api/users/register')
                .send({
                    username: 'testuser',
                    password: 'password123',
                    email: 'test@example.com',
                });

            const loginResponse = await request(app)
                .post('/api/users/login')
                .send({
                    username: 'testuser',
                    password: 'password123',
                });

            const response = await request(app)
                .get('/api/users/profile')
                .set('Authorization', `Bearer ${loginResponse.body.token}`);

            expect(response.status).toBe(200);
            expect(response.body.username).toBe('testuser');
            expect(response.body.email).toBe('test@example.com');
        });

        it('should return an error if the user is not authenticated', async () => {
            const response = await request(app)
                .get('/api/users/profile');

            expect(response.status).toBe(401);
            expect(response.body.error).toBe('No token provided.');
        });
    });

    describe('PUT /api/users/profile', () => {
        it('should update the user profile successfully', async () => {
            const registerResponse = await request(app)
                .post('/api/users/register')
                .send({
                    username: 'testuser',
                    password: 'password123',
                    email: 'test@example.com',
                });

            const loginResponse = await request(app)
                .post('/api/users/login')
                .send({
                    username: 'testuser',
                    password: 'password123',
                });

            const response = await request(app)
                .put('/api/users/profile')
                .set('Authorization', `Bearer ${loginResponse.body.token}`)
                .send({
                    email: 'newemail@example.com',
                });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Profile updated successfully.');
        });

        it('should return an error if the user is not authenticated', async () => {
            const response = await request(app)
                .put('/api/users/profile')
                .send({
                    email: 'newemail@example.com',
                });

            expect(response.status).toBe(401);
            expect(response.body.error).toBe('No token provided.');
        });
    });

    describe('DELETE /api/users/profile', () => {
        it('should delete the user account successfully', async () => {
            const registerResponse = await request(app)
                .post('/api/users/register')
                .send({
                    username: 'testuser',
                    password: 'password123',
                    email: 'test@example.com',
                });

            const loginResponse = await request(app)
                .post('/api/users/login')
                .send({
                    username: 'testuser',
                    password: 'password123',
                });

            const response = await request(app)
                .delete('/api/users/profile')
                .set('Authorization', `Bearer ${loginResponse.body.token}`);

            expect(response.status).toBe(204); // No content
        });

        it('should return an error if the user is not authenticated', async () => {
            const response = await request(app)
                .delete('/api/users/profile');

            expect(response.status).toBe(401);
            expect(response.body.error).toBe('No token provided.');
        });
    });
});
