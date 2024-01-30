import jwt from 'jsonwebtoken';
import { getAuthToken } from '../utils/redis.js';


const authenticateToken = async (req, res, next) => {
    const tokenHeader = req.header('Authorization');

    // console.log(`token header: ${tokenHeader}`)
    if (!tokenHeader) {
        return res.status(401).json({ status: 'error', message: 'Unauthorized - Missing token' });
    }

    try {
        // split bearer

        const tokenSplit = tokenHeader.split(' ')[1];

        // console.log(tokenSplit)
        // Verify the token
        const decoded = jwt.verify(tokenSplit, process.env.SECRET_KEY);

        // console.log(decoded)
        const userId = decoded.userId;

        // console.log(userId)
        // Check if the token is blacklisted (revoked)
        const storedToken = await getAuthToken(userId);
        if (!storedToken) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized - Invalid token' });
        }

        // Attach user information to the request
        req.user = { userId };

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        return res.status(401).json(error);
    }
};

export { authenticateToken };
