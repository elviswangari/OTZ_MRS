const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../model/DbModel');
const redisClient = require('../utils/redis');
const config = require('../config');

const register = async (req, res) => {
    try {
        const { firstName, cccNumber, email, phoneNumber, password } = req.body;

        // Check if a user with the given CCC number exists
        const existingUser = await User.findOne({ cccNumber });

        if (!existingUser) {
            return res.status(400).json({ message: 'User with this CCC number does not exist. Please contact the HCW.' });
        }

        // Check if the provided first name matches the existing user's first name
        if (firstName !== existingUser.firstName) {
            return res.status(400).json({ message: 'First name does not match the existing user details. Please contact the HCW.' });
        }

        // Check if the provided CCC number and name match the database
        const isMatch = await bcrypt.compare(cccNumber, existingUser.cccNumber);

        if (!isMatch) {
            return res.status(400).json({ message: 'Please enter valid details. If you believe there is an issue, contact the HCW.' });
        }

        // Proceed with registration
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ firstName, cccNumber, email, phoneNumber, password: hashedPassword });
        await newUser.save();

        // After successful registration, generate an authentication token
        const token = jwt.sign({ userId: newUser._id }, config.SECRET_KEY, { expiresIn: '1h' });

        // Store the authentication token in the cache
        redisClient.setAuthToken(token, newUser._id);

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const login = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        // Check if a user with the given identifier exists
        const user = await User.findOne({
            $or: [{ email: identifier }, { phoneNumber: identifier }, { username: identifier }],
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid identifier or password' });
        }

        // After successful login, generate an authentication token
        const token = jwt.sign({ userId: user._id }, config.SECRET_KEY, { expiresIn: '1h' });

        // Store the authentication token in the cache
        redisClient.setAuthToken(token, user._id);

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    register,
    login
};