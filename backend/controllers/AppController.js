import { redisIsAlive } from '../utils/redis.js';
import { Roc } from '../utils/db.js';

const getStatus = async (req, res) => {
    const isRedisAlive = await redisIsAlive();

    if (isRedisAlive) {
        res.json({ redis: true, db: true });
    } else {
        res.json({ redis: false, db: true });
    }
};


const getStats = async (req, res) => {
    const users = await Roc.nbusers();
    // const files = await dbClient.nbFiles();
    res.json({ users });
};

export {
    getStats,
    getStatus,
};
