const { createClient } = require('redis');
const { promisify } = require('util');

class RedisClient {
  constructor() {
    this.client = createClient();

    // Promisify relevant Redis functions
    this.client.setAsync = promisify(this.client.set).bind(this.client);
    this.client.getAsync = promisify(this.client.get).bind(this.client);
  }

  async setAuthToken(token, userId, expirationTime = 3600) {
    try {
      await this.client.setAsync(`auth:${token}`, userId, 'EX', expirationTime);
    } catch (error) {
      console.error('Error setting auth token:', error);
      throw error;
    }
  }

  async getAuthToken(token) {
    try {
      const userId = await this.client.getAsync(`auth:${token}`);
      return userId || null;
    } catch (error) {
      console.error('Error getting auth token:', error);
      throw error;
    }
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
