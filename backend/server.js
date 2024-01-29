import express from "express";
import dotenv from 'dotenv';;
import { rocRoutes } from './routes/rocRoutes.js';
import { hcwRoutes } from './routes/hcwRoutes.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

//connect to db
mongoose.connect(process.env.DB_URL);

// Middleware Connections
// app.use(cors())
app.use(express.json());
// app.use(Jwt)


// Routes
app.get('/', (req, res) => {
    res.status(200).json({
        message: "server homepage"
    });
});

app.use('/roc', rocRoutes);
app.use('/hcw', hcwRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`App running on port: ${PORT}`);
});