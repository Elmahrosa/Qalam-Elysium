// src/tests/unit/userService.test.js

const mongoose = require('mongoose');
const User = require('../../main/models/userModel');
const userService = require('../../main/services/userService');

describe('User  Service', () => {
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

    describe('registerUser ', () => {
        it('should register a new user successfully', async () => {
            const userData = { username: 'testuser', password: 'password123', email: 'test@example.com' };
            const newUser  = await userService.registerUser (userData.username, userData.password, userData.email);
            expect(newUser ).toHaveProperty('_id');
            expect(newUser .username).toBe(userData.username);
            expect(newUser .email).toBe(userData.email);
        });

        it('should throw an error if the user already exists', async () => {
            const userData = { username: 'testuser', password: 'password123', email: 'test@example.com' };
            await expect(userService.registerUser (userData.username, userData.password, userData.email)).rejects.toThrow('User  already exists.');
        });
    });

    describe('loginUser ', () => {
        it('should log in a user successfully', async () => {
            const userData = { username: 'testuser', password: 'password123' };
            const user = await userService.loginUser (userData.username, userData.password);
            expect(user).toHaveProperty('_id');
            expect(user.username).toBe(userData.username);
        });

        it('should throw an error for invalid credentials', async () => {
            await expect(userService.loginUser ('invaliduser', 'wrongpassword')).rejects.toThrow('Invalid credentials.');
        });
    });

    describe('getUser Profile', () => {
        it('should retrieve the user profile successfully', async () => {
            const userData = { username: 'testuser', password: 'password123', email: 'test@example.com' };
            const newUser  = await userService.registerUser (userData.username, userData.password, userData.email);
            const userProfile = await userService.getUser Profile(newUser ._id);
            expect(userProfile).toHaveProperty('_id');
            expect(userProfile.username).toBe(userData.username);
            expect(userProfile.email).toBe(userData.email);
        });

        it('should throw an error if the user is not found', async () => {
            await expect(userService.getUser Profile('invalidUser Id')).rejects.toThrow('User  not found.');
        });
    });

    describe('updateUser Profile', () => {
        it('should update the user profile successfully', async () => {
            const userData = { username: 'testuser', password: 'password123', email: 'test@example.com' };
            const newUser  = await userService.registerUser (userData.username, userData.password, userData.email);
            const updatedUser  = await userService.updateUser Profile(newUser ._id, 'newemail@example.com');
            expect(updatedUser .email).toBe('newemail@example.com');
        });

        it('should throw an error if the user is not found', async () => {
            await expect(userService.updateUser Profile('invalidUser Id', 'newemail@example.com')).rejects.toThrow('User  not found.');
        });
    });

    describe('deleteUser Account', () => {
        it('should delete the user account successfully', async () => {
            const userData = { username: 'testuser', password: 'password123', email: 'test@example.com' };
            const newUser  = await userService.registerUser (userData.username, userData.password, userData.email);
            const deletedUser  = await userService.deleteUser Account(newUser ._id);
            expect(deletedUser ).toHaveProperty('_id');
            expect(deletedUser .username).toBe(userData.username);
        });

        it('should throw an error if the user is not found', async () => {
            await expect(userService.deleteUser Account('invalidUser Id')).rejects.toThrow('User  not found.');
        });
    });
});
