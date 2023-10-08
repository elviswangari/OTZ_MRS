const { createClient } = require('redis');
const { promisify } = require('util');
const mongoose = require('mongoose');

class RedisClient {
  constructor() {
    this.client = createClient();

    // Promisify relevant Redis functions
    this.client.setAsync = promisify(this.client.set).bind(this.client);
    this.client.getAsync = promisify(this.client.get).bind(this.client);
  }

  async setAuthToken(token, userId, expirationTime = 3600) {
    try {
      const userIdString = userId.toString();
      console.log(userIdString)
      await this.client.setAsync(`auth:${token}`, userIdString, 'EX', expirationTime);
    } catch (error) {
      console.error('Error setting auth token:', error);
      throw error;
    }
  }


  async getAuthToken(token) {
    try {
      const userIdString = await this.client.getAsync(`auth:${token}`);
      return userIdString ? new mongoose.Types.ObjectId(userIdString) : null;
    } catch (error) {
      console.error('Error getting auth token:', error);
      throw error;
    }
  }

}

const redisClient = new RedisClient();
module.exports = redisClient;
