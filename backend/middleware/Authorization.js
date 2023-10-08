const jwt = require('jsonwebtoken');
const redisClient = require('../utils/redis');
const { internalError } = require('../utils/errors');
const { Users } = require('../utils/db');

const BEARER_AUTH = 'Bearer';
const BASIC_AUTH = 'Basic';

const validateBearerToken = async (token, res) => {
    try {
        const userId = await redisClient.getAuthToken(token);

        if (!userId) {
            console.error('Invalid Token');
            return res.status(401).json({
                message: 'Invalid Token',
            });
        }

        return { userId };
    } catch (error) {
        internalError(error, res);
    }
};

const validateBasicAuth = async (credentials, res) => {
    try {
        const decodedCredentials = Buffer.from(credentials, 'base64').toString('utf-8');
        const [username, password] = decodedCredentials.split(':');

        // Call the checkCreds function to validate the credentials
        const authResult = await Users.checkCreds(username, password);

        if (authResult.success) {
            // Credentials are valid, you might want to do additional checks here if needed
            return { success: true, user: authResult.user };
        } else {
            // Credentials are invalid
            return { success: false, message: authResult.message };
        }
    } catch (error) {
        console.error('Error during basic authentication:', error);
        return { success: false, message: 'Internal server error' };
    }
};

const Jwt = async (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({
            message: 'No Authorization Header',
        });
    }

    try {
        const [authType, credentials] = authorization.split(' ');

        if (authType === BEARER_AUTH) {
            const { userId } = await validateBearerToken(credentials, res);
            req.user = { userId };
            next();
        } else if (authType === BASIC_AUTH) {
            const basicAuthResult = await validateBasicAuth(credentials, res);

            if (basicAuthResult.success) {
                req.user = { userId: basicAuthResult.user._id };
                next();
            } else {
                return res.status(401).json({
                    message: basicAuthResult.message,
                });
            }
        } else {
            return res.status(401).json({
                message: 'Invalid Authorization Header',
            });
        }
    } catch (error) {
        internalError(error, res);
    }
};

module.exports = Jwt;
