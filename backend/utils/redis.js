import { createClient } from 'redis';
// import { promisify } from 'util';
import mongoose from 'mongoose';


const redisClient = createClient();
redisClient.on('error', err => console.log('Redis Client Error', err));
await redisClient.connect();

const setAuthToken = async (token, userId, expirationTime = 3600) => {
    try {
        // const userIdString = ;
        // console.log(userIdString)
        await redisClient.setEx(userId.toString(), expirationTime, token);
    } catch (error) {
        console.error('Error setting auth token:', error);
        throw error;
    }
}

const getAuthToken = async (userId) => {
    try {
        // console.log(`this is user id ${userId}`);
        const authToken = await redisClient.get(userId.toString());
        // return authToken ? new mongoose.Types.ObjectId(authToken) : null;
        // console.log(userIdString)
        return authToken;

    } catch (error) {
        console.error('Error getting auth token:', error);
        throw error;
    }
}

export { setAuthToken, getAuthToken, redisClient };