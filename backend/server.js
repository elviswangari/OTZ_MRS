const express = require('express')
const app = express();
const config = require('./config');
const Jwt = require('./middleware/Authorization')
const rocRoutes = require('./routes/rocRoutes');
const hcwRoutes = require('./routes/hcwRoutes');
const AuthController = require('./controllers/AuthController');

// Middleware Connections
// app.use(cors())
app.use(express.json());
// app.use(Jwt)


// Routes
app.get('/', (req, res) => {
    res.status(200).json({
        message: "server homepage"
    })
})
    .post('/register', AuthController.register)
    .post('/login', AuthController.login);

// app.use(Jwt)
app.use('/roc', rocRoutes);
app.use('/hcw', hcwRoutes);

// Connection
const PORT = config.PORT;
app.listen(PORT, () => {
    console.log(`App running on port: ${PORT}`);
});