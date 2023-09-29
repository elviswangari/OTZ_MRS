const redis = require('redis');

class RedisClient {
  constructor() {
    this.client = redis.createClient();
  }

  setAuthToken(token, userId, expirationTime = 3600) {
    this.client.setex(`auth:${token}`, expirationTime, userId);
  }

  getAuthToken(token, callback) {
    this.client.get(`auth:${token}`, (err, userId) => {
      if (err) {
        console.error(err);
        callback(err, null);
        return;
      }

      callback(null, userId || null);
    });
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
