// src/tests/e2e/app.e2e.test.js

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../main/app'); // Import your Express app
const User = require('../../main/models/userModel');

describe('End-to-End User Flow', () => {
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

    it('should register, log in, retrieve, update, and delete a user', async () => {
        // Step 1: Register a new user
        const registerResponse = await request(app)
            .post('/api/users/register')
            .send({
                username: 'testuser',
                password: 'password123',
                email: 'test@example.com',
            });

        expect(registerResponse.status).toBe(201);
        expect(registerResponse.body.message).toBe('User registered successfully.');

        // Step 2: Log in the user
        const loginResponse = await request(app)
            .post('/api/users/login')
            .send({
                username: 'testuser',
                password: 'password123',
            });

        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body).toHaveProperty('token');

        const token = loginResponse.body.token;

        // Step 3: Retrieve the user profile
        const profileResponse = await request(app)
            .get('/api/users/profile')
            .set('Authorization', `Bearer ${token}`);

        expect(profileResponse.status).toBe(200);
        expect(profileResponse.body.username).toBe('testuser');
        expect(profileResponse.body.email).toBe('test@example.com');

        // Step 4: Update the user profile
        const updateResponse = await request(app)
            .put('/api/users/profile')
            .set('Authorization', `Bearer ${token}`)
            .send({
                email: 'newemail@example.com',
            });

        expect(updateResponse.status).toBe(200);
        expect(updateResponse.body.message).toBe('Profile updated successfully.');

        // Step 5: Retrieve the updated profile
        const updatedProfileResponse = await request(app)
            .get('/api/users/profile')
            .set('Authorization', `Bearer ${token}`);

        expect(updatedProfileResponse.status).toBe(200);
        expect(updatedProfileResponse.body.email).toBe('newemail@example.com');

        // Step 6: Delete the user account
        const deleteResponse = await request(app)
            .delete('/api/users/profile')
            .set('Authorization', `Bearer ${token}`);

        expect(deleteResponse.status).toBe(204); // No content

        // Step 7: Attempt to retrieve the deleted profile
        const deletedProfileResponse = await request(app)
            .get('/api/users/profile')
            .set('Authorization', `Bearer ${token}`);

        expect(deletedProfileResponse.status).toBe(401);
        expect(deletedProfileResponse.body.error).toBe('No token provided.');
    });
});
