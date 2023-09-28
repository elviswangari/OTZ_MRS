/* eslint-disable jest/require-hook */
const router = require('express').Router();
const AppController = require('../controllers/AppController');
const RocController = require('../controllers/RocController');
const AuthController = require('../controllers/AuthController');

router.post('/register', AuthController.register)
  .post('/login', AuthController.login);

router.get('/', RocController.home)
  .get('/status', AppController.getStatus)
  .get('/stats', AppController.getStats)
  .get('/users', RocController.getNoOfUser);

module.exports = router;
