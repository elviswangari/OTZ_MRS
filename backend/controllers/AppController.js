import { redisClient } from '../utils/redis.js';
import { Roc } from '../utils/db.js';

const getStatus = (req, res) => {
    if (redisClient.isAlive() && dbClient.isAlive()) {
        res.json({ redis: true, db: true });
    }
};

const getStats = async (req, res) => {
    const users = await Roc.nbUsers();
    // const files = await dbClient.nbFiles();
    res.json({ users });
};

export {
    getStats,
    getStatus,
};
