import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// Your MongoDB connection URL from the .env file
const dbURL = process.env.DB_URL;

// Connect to MongoDB
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Check if the connection is successful
db.on('connected', () => {
    console.log(`Connected to MongoDB at ${dbURL}`);
});

// Check if there is an error during the connection
db.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
});

// Check if the connection is disconnected
db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// Check if the application is terminated, close the connection
process.on('SIGINT', () => {
    db.close(() => {
        console.log('MongoDB connection disconnected through app termination');
        process.exit(0);
    });
});
// console.log(`DB_URL: ${process.env.DB_URL}`);