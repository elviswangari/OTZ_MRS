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
        // console.log('Decoded Credentials:', decodedCredentials);

        const [username, password] = decodedCredentials.split(':');

        // Call the checkCreds function to validate the credentials
        const authResult = await Users.checkCreds(username, password);
        // console.log('Auth Result:', authResult);

        if (authResult.success) {
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
            // const { userId } = await validateBearerToken(credentials, res);
            // req.user = { userId, };
            const { userId } = await validateBearerToken(credentials, res);

            // Fetch additional details from the database based on the user ID
            const user = await Users.findById(userId);

            if (!user) {
                return res.status(401).json({
                    message: 'User not found',
                });
            }

            req.user = {
                userId: user._id,
                cccNumber: user.cccNumber,
            };
            next();
        } else if (authType === BASIC_AUTH) {
            const basicAuthResult = await validateBasicAuth(credentials, res);
            if (basicAuthResult.success) {
                req.user = {
                    userId: basicAuthResult.user._id,
                    cccNumber: basicAuthResult.user.cccNumber,
                };
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
