const { User } = require('../model/DbModel');
const { Users } = require('../utils/db');
const { internalError } = require('../utils/errors');

const register = async (req, res) => {
    try {
        const newUser = await Users.registerUser(req.body);

        res.status(201).json({
            message: newUser.message,
            token: newUser.token,
            userId: newUser.userId,
        });

        // Redirect to the "/roc" route upon successful registration
        res.redirect('/roc');
    } catch (error) {
        // Log the error for debugging purposes (don't expose sensitive details)
        console.error('Error during registration:', error);

        // Provide a generic error message to the user
        internalError('An error occurred during registration', res);
    }
};


const login = async (req, res) => {
    try {
        const { identifier, password } = req.body;
        const authResult = await Users.login(identifier, password);

        res.status(200).json({
            message: 'Login successful',
            token: authResult.token,
            userId: authResult.userId,
        });
    } catch (error) {
        // Log the error for debugging purposes (don't expose sensitive details)
        console.error('Error during login:', error);

        // Provide a generic error message to the user
        internalError('An error occurred during login', res);
    }
};

module.exports = {
    register,
    login
};