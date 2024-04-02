import { Users, Common } from '../utils/db.js';
import { internalError } from '../utils/errors.js';

const register = async (req, res) => {
    try {
        const newUser = await Users.registerUser(req.body);

        res.status(201).json({
            message: newUser.message,
            token: newUser.token,
            userId: newUser.userId,
        });

    } catch (error) {
        console.error('Error during registration:', error);

        if (error.message === 'Person with these details does not exist. Please contact the HCW.') {
            // Handle the case where the person is not found
            res.status(400).json({
                message: 'Invalid person details. Please contact the healthcare worker.',
            });
        } else {
            // Handle other registration errors
            internalError('An error occurred during registration', res);
        }
    }
}


const login = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        // console.log(identifier)
        const authResult = await Common.login(identifier, password);

        res.status(200).json({
            message: 'Login successful',
            token: authResult.token,
            userId: authResult.userId,
            role: authResult.role,
        });
    } catch (error) {
        // Log the error for debugging purposes (don't expose sensitive details)
        console.error('Error during login:', error);

        // Provide a generic error message to the user
        internalError('An error occurred during login', res);
    }
}

export {
    register,
    login,
};