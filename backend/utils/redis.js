import { createClient } from 'redis';

const redisClient = createClient();

// Handle Redis connection errors
redisClient.on('error', err => console.log('Redis Client Error', err));
await redisClient.connect()

const redisIsAlive = async () => {
    try {
        await redisClient.ping();
        return true;
    } catch (error) {
        console.error('Error checking Redis status:', error);
        return false;
    }
};

const setAuthToken = async (token, userId, expirationTime = 3600) => {
    try {
        await redisClient.setEx(userId.toString(), expirationTime, token);
    } catch (error) {
        console.error('Error setting auth token:', error);
        throw error;
    }
};

const getAuthToken = async (userId) => {
    try {
        const authToken = await redisClient.get(userId.toString());
        return authToken;
    } catch (error) {
        console.error('Error getting auth token:', error);
        throw error;
    }
};

export { setAuthToken, getAuthToken, redisIsAlive };
