import express from "express";
import dotenv from 'dotenv';

dotenv.config()

const app = express()

// Routes
app.get('/', (req, res) => {
    res.status(200).json({
        message: "server homepage"
    });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`App running on port: ${PORT}`);
});