//const redisClient = require('../utils/redis');
const {Roc} = require('../utils/db');

class AppController {
  static getStatus(req, res) {
    if (redisClient.isAlive() && dbClient.isAlive()) {
      res.json({ redis: true, db: true });
    }
  }

  static async getStats(req, res) {
    const users = await Roc.nbUsers();
    //const files = await dbClient.nbFiles();
    res.json({ users });
  }
}

module.exports = AppController;